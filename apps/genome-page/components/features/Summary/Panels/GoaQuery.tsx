import { useRouter } from "next/router"
import { useGeneOntologyAnnotationSummaryQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Loader } from "components/Loader"
import { GraphQLErrorPage } from "components/errors/GraphQLErrorPage"
import { PanelWrapper } from "components/panels/PanelWrapper"
import { NoDataPanel } from "./NoDataPanel"
import { GoaPanel } from "./GoaPanel"

const GoaQuery = () => {
  const { query } = useRouter()
  const gene = query.id as string
  const result = useGeneOntologyAnnotationSummaryQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
    errorPolicy: "all",
  })
  return (
    <PanelWrapper
      route={`${gene}/goannotations`}
      title="Gene Ontology Annotations">
      {match(result)
        .with({ loading: true }, () => <Loader rows={3} />)
        .with(
          {
            data: { geneOntologyAnnotation: P.select(P.not(P.nullish)) },
          },
          (goas) => <GoaPanel goas={goas} />,
        )
        .with({ error: P.select(P.not(P.nullish)) }, (error) => (
          <GraphQLErrorPage error={error} />
        ))
        .with(
          {
            data: P.nullish,
          },
          () => <NoDataPanel query="GO Annotations" geneId={gene} />,
        )
        .otherwise(() => (
          <> This message should not appear. </>
        ))}
    </PanelWrapper>
  )
}

export { GoaQuery }
