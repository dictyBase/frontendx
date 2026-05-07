import { useRef } from "react"
import { useSearchParams } from "react-router-dom"
import { P, match } from "ts-pattern"
import { usePlasmidListFilterQuery } from "dicty-graphql-schema"
import {
  graphqlListVariables,
  buildPlasmidListFilter,
} from "@dictybase/hook-dsc"
import { useIntersectionObserver } from "@dictybase/hook"
import {
  WindowHeightWrapper,
  PlasmidCatalogTableDisplay,
  SearchBarPlasmid,
  ErrorDisplay,
  CatalogListWrapper,
  CatalogListLoader,
  CatalogHeader,
  EmptyCatalog,
} from "@dictybase/ui-dsc"

const PlasmidCatalog = () => {
  const [searchParameters] = useSearchParams()

  const { loading, error, data, fetchMore, refetch } =
    usePlasmidListFilterQuery({
      variables: {
        ...graphqlListVariables,
        filter: buildPlasmidListFilter(searchParameters),
      },
    })

  const rootReference = useRef<HTMLDivElement>(null)
  const targetReference = useRef<HTMLTableRowElement>(null)
  const onIntersection = ([entry]: IntersectionObserverEntry[]) => {
    const nextCursor = data?.listPlasmids?.nextCursor
    switch (true) {
      case !nextCursor:
        return
      case loading:
        return
      case !entry.isIntersecting:
        return
      default:
        fetchMore({ variables: { cursor: nextCursor } })
    }
  }

  useIntersectionObserver({
    target: targetReference,
    onIntersection,
    option: { root: rootReference.current, threshold: 0.1 },
  })

  return (
    <>
      <CatalogHeader title="Plasmid Catalog" />
      <SearchBarPlasmid />
      <WindowHeightWrapper>
        {match({ data, loading, error })
          .with({ data: { listPlasmids: { plasmids: [] } } }, () => (
            <EmptyCatalog message="Sorry, we couldn't find any matching plasmids. Try searching again with different terms." />
          ))
          .with(
            { data: P.select({ listPlasmids: P.not(undefined) }) },
            (data_) => (
              <CatalogListWrapper root={rootReference}>
                <PlasmidCatalogTableDisplay
                  data={data_}
                  dataField="listPlasmids"
                  target={targetReference}
                />
              </CatalogListWrapper>
            ),
          )
          .with({ loading: true }, () => <CatalogListLoader />)
          .with({ error: P.select({ message: P.string }) }, (error_) => (
            <ErrorDisplay error={error_} refetch={refetch} />
          ))
          .otherwise(() => (
            <></>
          ))}
      </WindowHeightWrapper>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default PlasmidCatalog
