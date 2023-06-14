import {
  useConfigureStrainCatalogSearchGraphql,
  defaultFilter,
  fieldsToVariables,
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

const StrainCatalog = () => {
  const [searchParameters, setSearchParameters] = useSearchParams()
  const value = searchParameters.get(defaultFilter.param) ?? defaultFilter.value
  const { dataField, variables } = useConfigureStrainCatalogSearchGraphql({
    value,
    searchParams: searchParameters,
  })
  const { loading, error, data, fetchMore } = useQuery(StrainListDocument, {
    variables,
  })
  const rootReference = useRef<HTMLDivElement>(null)
  const targetReference = useRef<HTMLTableRowElement>(null)
  const onIntersection = ([entry]: IntersectionObserverEntry[]) => {
    if (!entry.isIntersecting) return
    const { nextCursor } = data ? data[dataField] : undefined
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
      <Box m={2} display="flex">
        <FilterDropdown
          searchParamFn={setSearchParameters}
          param={defaultFilter.param}
          value={defaultFilter.value}
        />
        <SearchBox fields={Object.keys(fieldsToVariables)} key={value} />
      </Box>
      <Box>
        <CatalogListWrapper root={rootReference}>
          {loading ? <LoadingDisplay rows={10} /> : <></>}
          {error ? <ErrorDisplay error={error} /> : <></>}
          {data?.[dataField] ? (
            <CatalogTableDisplay
              data={data}
              dataField={dataField}
              target={targetReference}
            />
          ) : (
            <></>
          )}
        </CatalogListWrapper>
      </Box>
    </>
  )
}

export default StrainCatalog
