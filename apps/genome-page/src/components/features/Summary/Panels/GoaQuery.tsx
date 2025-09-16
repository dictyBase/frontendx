import { getErrorMessage } from "@dictybase/ui-common"
import { useParams } from "react-router-dom"
import { useGeneOntologyAnnotationSummaryQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Loader } from "components/Loader"
import { ErrorPanel } from "components/panels/ErrorPanel"
import { PanelWrapper } from "components/panels/PanelWrapper"
import { NoDataPanel } from "./NoDataPanel"
import { GoaPanel } from "./GoaPanel"

const GoaQuery = () => {
  const { id } = useParams<{ id: string }>()
  const gene = id as string
  const result = useGeneOntologyAnnotationSummaryQuery({
    variables: {
      gene,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  })
  return (
    <PanelWrapper
      route={`${gene}/goannotations`}
      title="Gene Ontology Annotations">
      {match(result)
        .with({ loading: true }, () => <Loader rows={3} />)
        .with(
          {
            data: { geneOntologyAnnotation: P.union([], P.nullish) },
          },
          () => <NoDataPanel query="GO Annotations" geneId={gene} />,
        )
        .with(
          {
            data: { geneOntologyAnnotation: P.select(P.not(P.nullish)) },
          },
          (goas) => <GoaPanel goas={goas} />,
        )
        .with({ error: P.select(P.not(P.nullish)) }, (error) => (
          <ErrorPanel
            retry={result.refetch}
            details={getErrorMessage(error).message}
          />
        ))
        .otherwise(() => (
          <> This message should not appear. </>
        ))}
    </PanelWrapper>
  )
}

export { GoaQuery }
