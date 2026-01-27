import { getErrorMessage } from "@dictybase/ui-common"
import { useParams } from "react-router-dom"
import { useListPublicationsWithGeneSummaryQuery } from "dicty-graphql-schema"
import { match, P } from "ts-pattern"
import { Loader } from "components/Loader"
import { ErrorPanel } from "components/panels/ErrorPanel"
import { PanelWrapper } from "components/panels/PanelWrapper"
import { NoDataPanel } from "./NoDataPanel"
import { ReferencesPanel } from "./ReferencesPanel"

const ReferencesQuery = () => {
  const { id } = useParams<{ id: string }>()
  const gene = id as string
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
      <PanelWrapper route="references" title="Publications">
        <Loader rows={4} />
      </PanelWrapper>
    ))
    .with(
      {
        data: P.union(P.nullish, { listPublicationsWithGene: [] }),
      },
      () => (
        <PanelWrapper title="Publications">
          <NoDataPanel query="References" geneId={gene} />
        </PanelWrapper>
      ),
    )
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
            route="references"
            title={`Publications (${partialPublicationsList.length} of ${publications.length}) `}>
            <ReferencesPanel publications={partialPublicationsList} />
          </PanelWrapper>
        )
      },
    )
    .with({ error: P.select(P.not(P.nullish)) }, (error) => (
      <PanelWrapper route="references" title="Publications">
        <ErrorPanel
          retry={result.refetch}
          details={getErrorMessage(error).message}
        />
      </PanelWrapper>
    ))
    .otherwise(() => <> This message should not appear. </>)
}

export { ReferencesQuery }
