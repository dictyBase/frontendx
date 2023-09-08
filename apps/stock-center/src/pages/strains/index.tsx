import {
  useConfigureStrainCatalogSearchGraphql,
  defaultFilter,
} from "@dictybase/hook-dsc"
import { P, match } from "ts-pattern"
import {
  LoadingDisplay,
  CatalogTableDisplay,
  ErrorDisplay,
  SearchBar,
  CatalogListWrapper,
  CatalogHeader,
} from "@dictybase/ui-dsc"
import { useIntersectionObserver } from "@dictybase/hook"
import { useRef } from "react"
import { useStrainListQuery } from "dicty-graphql-schema"
import { useSearchParams } from "react-router-dom"

const StrainCatalog = () => {
  const [searchParameters, setSearchParameters] = useSearchParams()
  const value = searchParameters.get(defaultFilter.param) ?? defaultFilter.value
  const { dataField, variables } = useConfigureStrainCatalogSearchGraphql({
    value,
    searchParams: searchParameters,
  })
  const { loading, error, data, fetchMore } = useStrainListQuery({ variables })
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
      <SearchBar setSearchParameters={setSearchParameters} />
      <CatalogListWrapper root={rootReference}>
        {match({ data, loading, error })
          .with(
            { data: P.select({ listStrains: P.not(undefined) }) },
            (data_) => (
              <CatalogTableDisplay
                data={data_}
                dataField={dataField}
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
export default StrainCatalog
