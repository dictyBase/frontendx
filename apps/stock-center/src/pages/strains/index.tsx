import { useMemo, useRef } from "react"
import { getStrainListConfiguration, defaultFilter } from "@dictybase/hook-dsc"
import { P, match } from "ts-pattern"
import {
  WindowHeightWrapper,
  StrainCatalogTableDisplay,
  SearchBar,
  CatalogListWrapper,
  CatalogListLoader,
  CatalogHeader,
  ErrorDisplay,
} from "@dictybase/ui-dsc"
import { useIntersectionObserver } from "@dictybase/hook"
import { useStrainListQuery } from "dicty-graphql-schema"
import { useSearchParams } from "react-router-dom"

const StrainCatalog = () => {
  const [searchParameters] = useSearchParams()
  const value = searchParameters.get(defaultFilter.param) ?? defaultFilter.value
  const { dataField, variables } = useMemo(
    () =>
      getStrainListConfiguration({
        value,
        searchParams: searchParameters,
      }),
    [value, searchParameters],
  )
  const { loading, error, data, fetchMore, refetch } = useStrainListQuery({
    variables,
  })
  const rootReference = useRef<HTMLDivElement>(null)
  const targetReference = useRef<HTMLTableRowElement>(null)

  const onIntersection = ([entry]: IntersectionObserverEntry[]) => {
    const nextCursor = data?.listStrains?.nextCursor
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
      <CatalogHeader title="Strain Catalog" />
      <SearchBar />
      <WindowHeightWrapper>
        {match({ data, loading, error })
          .with(
            { data: P.select({ listStrains: P.not(undefined) }) },
            (data_) => (
              <CatalogListWrapper root={rootReference}>
                <StrainCatalogTableDisplay
                  data={data_}
                  dataField={dataField}
                  target={targetReference}
                />
              </CatalogListWrapper>
            ),
          )
          .with({ loading: true }, () => <CatalogListLoader />)
          .with({ error: P.select({ message: P.string }) }, (error_) => (
            <ErrorDisplay refetch={refetch} error={error_} />
          ))
          .otherwise(() => (
            <></>
          ))}
      </WindowHeightWrapper>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default StrainCatalog
