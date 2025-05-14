import { useRouter } from "next/router"
import { useListPublicationsWithGeneSummaryQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Loader } from "components/Loader"
import { GraphQLErrorPage } from "components/errors/GraphQLErrorPage"
import { PanelWrapper } from "components/panels/PanelWrapper"
import { NoDataPanel } from "./NoDataPanel"
import { ReferencesPanel } from "./ReferencesPanel"

const ReferencesQuery = () => {
  const { query } = useRouter()
  const gene = query.id as string
  const result = useListPublicationsWithGeneSummaryQuery({
    variables: {
      gene,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
    errorPolicy: "all",
  })
  return match(result)
    .with({ loading: true }, () => (
      <PanelWrapper route={`${gene}/references`} title="Publications">
        <Loader rows={4} />
      </PanelWrapper>
    ))
    .with(
      {
        data: {
          listPublicationsWithGene: P.select(
            P.array({
              id: P.string,
              title: P.string,
              journal: P.string,
              authors: P.array({ last_name: P.string }),
            }),
          ),
        },
      },
      (publications) => {
        const publicationLimit = 5
        const partialPublicationsList = publications.slice(0, publicationLimit)
        return (
          <PanelWrapper
            route={`${gene}/references`}
            title={`Publications (${partialPublicationsList.length} of ${publications.length}) `}>
            <ReferencesPanel publications={partialPublicationsList} />
          </PanelWrapper>
        )
      },
    )
    .with({ error: P.select(P.not(P.nullish)) }, (error) => (
      <PanelWrapper route={`${gene}/references`} title="Publications">
        <GraphQLErrorPage error={error} />
      </PanelWrapper>
    ))
    .with(
      {
        data: P.union(P.nullish, { listPublicationsWithGene: [] }),
      },
      () => (
        <PanelWrapper route={`${gene}/references`} title="Publications">
          <NoDataPanel query="References" geneId={gene} />
        </PanelWrapper>
      ),
    )
    .otherwise(() => <> This message should not appear. </>)
}

export { ReferencesQuery }
