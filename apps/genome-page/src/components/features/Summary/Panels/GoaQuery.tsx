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
  return match(result)
    .with({ loading: true }, () => (
      <PanelWrapper route="goannotations" title="Gene Ontology Annotations">
        <Loader rows={3} />
      </PanelWrapper>
    ))
    .with(
      {
        data: { geneOntologyAnnotation: P.union([], P.nullish) },
      },
      () => (
        <PanelWrapper title="Gene Ontology Annotations">
          <NoDataPanel query="GO Annotations" geneId={gene} />
        </PanelWrapper>
      ),
    )
    .with(
      {
        data: { geneOntologyAnnotation: P.select(P.not(P.nullish)) },
      },
      (goas) => (
        <PanelWrapper route="goannotations" title="Gene Ontology Annotations">
          <GoaPanel goas={goas} />
        </PanelWrapper>
      ),
    )
    .with({ error: P.select(P.not(P.nullish)) }, (error) => (
      <PanelWrapper route="goannotations" title="Gene Ontology Annotations">
        <ErrorPanel
          retry={result.refetch}
          details={getErrorMessage(error).message}
        />
      </PanelWrapper>
    ))
    .otherwise(() => <> This message should not appear. </>)
}

export { GoaQuery }
