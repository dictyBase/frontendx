import {
  graphqlQueryVariables,
} from "@dictybase/hook-dsc"
import { P, match } from "ts-pattern"
import {
  LoadingDisplay,
  PlasmidCatalogTableDisplay,
  ErrorDisplay,
  CatalogListWrapper,
  CatalogHeader,
} from "@dictybase/ui-dsc"
import { useIntersectionObserver } from "@dictybase/hook"
import { useRef } from "react"
import { usePlasmidListFilterQuery } from "dicty-graphql-schema"

const PlasmidCatalog = () => {
  const { loading, error, data, fetchMore } = usePlasmidListFilterQuery({
    variables: { ...graphqlQueryVariables, filter: "" },
  })

  const rootReference = useRef<HTMLDivElement>(null)
  const targetReference = useRef<HTMLTableRowElement>(null)
  // console.log(loading, error, data)
  const onIntersection = ([entry]: IntersectionObserverEntry[]) => {
    // console.log("intersecting?")
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
      {/* <SearchBar /> */}
      <CatalogListWrapper root={rootReference}>
        {match({ data, loading, error })
          .with(
            { data: P.select({ listPlasmids: P.not(undefined) }) },
            (data_) => (
              <PlasmidCatalogTableDisplay
                data={data_}
                dataField="listPlasmids"
                target={targetReference}
              />
            ),
          )
          .with({ loading: true }, () => <LoadingDisplay rows={10} />)
          .with({ error: P.select({ message: P.string }) }, (error_) => (
            <ErrorDisplay error={error_} />
          ))
          .otherwise(() => (
            <></>
          ))}
      </CatalogListWrapper>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default PlasmidCatalog
