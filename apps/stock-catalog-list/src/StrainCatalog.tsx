import {
  useConfigureStrainCatalogSearchGraphql,
  defaultFilter,
  fieldsToVar,
} from "@dictybase/hook-dsc"
import {
  LoadingDisplay,
  CatalogTableDisplay,
  ErrorDisplay,
  CatalogListWrapper,
  FilterDropdown,
  SearchBox,
} from "@dictybase/ui-dsc"
import { useIntersectionObserver } from "@dictybase/hook"
import { useQuery } from "@apollo/client"
import { useRef } from "react"
import { Box } from "@material-ui/core"
import { StrainListDocument } from "dicty-graphql-schema"
import { useSearchParams } from "react-router-dom"

export default function StrainCatalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const value = searchParams.get(defaultFilter.param) ?? defaultFilter.value
  const { dataField, variables } = useConfigureStrainCatalogSearchGraphql({
    value,
    searchParams,
  })
  const { loading, error, data, fetchMore } = useQuery(StrainListDocument, {
    variables,
  })
  const rootRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLTableRowElement>(null)
  const onIntersection = ([entry]: IntersectionObserverEntry[]) => {
    if (!entry.isIntersecting) return
    const { nextCursor } = data?.[dataField]
    if (!nextCursor) return
    fetchMore({ variables: { cursor: nextCursor } })
  }
  useIntersectionObserver({
    target: targetRef,
    onIntersection: onIntersection,
    option: { root: rootRef.current, threshold: 0.1 },
  })

  return (
    <>
      <Box m={2} display="flex">
        <FilterDropdown
          searchParamFn={setSearchParams}
          param={defaultFilter.param}
          value={defaultFilter.value}
        />
        <SearchBox fields={Object.keys(fieldsToVar)} key={value} />
      </Box>
      <Box>
        <CatalogListWrapper root={rootRef}>
          {loading ? <LoadingDisplay rows={10} /> : <></>}
          {error ? <ErrorDisplay error={error} /> : <></>}
          {data?.[dataField] ? (
            <CatalogTableDisplay
              data={data}
              dataField={dataField}
              target={targetRef}
            />
          ) : (
            <></>
          )}
        </CatalogListWrapper>
      </Box>
    </>
  )
}
