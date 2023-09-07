import {
  useConfigureStrainCatalogSearchGraphql,
  defaultFilter,
} from "@dictybase/hook-dsc"
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
    if (!entry.isIntersecting || loading) return
    const nextCursor = data?.listStrains?.nextCursor || undefined
    if (!nextCursor) return
    fetchMore({ variables: { cursor: nextCursor } })
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
        {loading && !data ? <LoadingDisplay rows={10} /> : <></>}
        {error ? <ErrorDisplay error={error} /> : <></>}
        {data?.listStrains ? (
          <CatalogTableDisplay
            data={data}
            dataField={dataField}
            target={targetReference}
          />
        ) : (
          <></>
        )}
      </CatalogListWrapper>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default StrainCatalog
