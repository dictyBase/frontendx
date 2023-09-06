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
  CatalogHeader,
  AppBarHelp,
} from "@dictybase/ui-dsc"
import { useIntersectionObserver } from "@dictybase/hook"
import { useRef } from "react"
import { Box, Grid } from "@material-ui/core"
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
      <Grid container alignItems="flex-end">
        <Grid item>
          <FilterDropdown
            searchParamFn={setSearchParameters}
            param={defaultFilter.param}
            value={defaultFilter.value}
          />
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <SearchBox fields={Object.keys(fieldsToVariables)} key={value} />
        </Grid>
        <Grid item>
          <AppBarHelp />
        </Grid>
      </Grid>
      <Box>
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
      </Box>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default StrainCatalog
