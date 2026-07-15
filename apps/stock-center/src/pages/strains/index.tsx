import { useRef } from "react"
import { Box, ThemeProvider } from "@mui/material"
import { P, match } from "ts-pattern"
import {
  buildStrainListFilter,
  graphqlListVariables,
  strainGroupFilterOptions,
  defaultFilter,
} from "@dictybase/hook-dsc"
import { useIntersectionObserver } from "@dictybase/hook"
import { useStrainListQuery } from "dicty-graphql-schema"
import {
  EmptyCatalog,
  ErrorDisplay,
  CatalogTable,
  ScrollToTop,
  hasNotFoundError,
  CatalogListLoader,
} from "@dictybase/ui-dsc"
import { useSearchParams } from "react-router-dom"
import {
  CatalogSidebar,
  CatalogSearchBar,
} from "../../features/StrainCatalog/components"
import { useScrollPersistence } from "../../features/StrainCatalog/hooks"
import { theme } from "../../features/StrainCatalog/theme"
import { AddToCartButtonHandler } from "../../components/AddToCartButtonHandler"

const StrainCatalog = () => {
  // Enable scroll position persistence
  useScrollPersistence({ storageKey: "strainCatalogScrollPos" })

  // Get search parameters from URL
  const [searchParameters] = useSearchParams()

  // GraphQL query for strain list with infinite scroll
  const { loading, error, data, fetchMore, refetch } = useStrainListQuery({
    variables: {
      ...graphqlListVariables,
      filter: buildStrainListFilter(searchParameters),
    },
  })

  // Refs for infinite scroll
  const rootReference = useRef<HTMLDivElement>(null)
  const targetReference = useRef<HTMLTableRowElement>(null)

  // Infinite scroll intersection observer using functional pattern
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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "24px",
          pt: 0,
          minHeight: "100vh",
        }}>
        {/* Header with cart button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}>
          <Box
            component="h1"
            sx={{
              fontSize: "32px",
              color: "#1a202c",
              fontWeight: 700,
              margin: 0,
            }}>
            Strain Catalog
          </Box>
        </Box>

        {/* Main layout: sidebar + content */}
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            alignItems: "flex-start",
          }}>
          {/* Sidebar with filters */}
          <CatalogSidebar
            title="Strain Type"
            value={defaultFilter.value}
            param={defaultFilter.param}
            options={strainGroupFilterOptions}
          />

          {/* Content area */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Search bar */}
            <CatalogSearchBar />

            {/* Pattern matching for different query states */}
            {match({ data, loading, error })
              .with(
                { data: { listStrains: P.select(P.not(P.nullish)) } },
                ({ strains, nextCursor }) => (
                  <Box ref={rootReference}>
                    <CatalogTable
                      items={strains}
                      loadMoreRef={targetReference}
                      nextCursor={nextCursor}
                      actionComponent={AddToCartButtonHandler}
                    />
                  </Box>
                ),
              )
              .with({ loading: true }, () => <CatalogListLoader />)
              .when(
                ({ error: error_ }) => hasNotFoundError(error_),
                () => (
                  <EmptyCatalog message="Sorry, we couldn't find any strains. Try searching again with different terms" />
                ),
              )
              .with({ error: P.select(P.not(P.nullish)) }, (error_) => (
                <ErrorDisplay error={error_} refetch={refetch} />
              ))
              .otherwise(() => (
                <></>
              ))}
          </Box>
        </Box>

        {/* Scroll to top button */}
        <ScrollToTop />
      </Box>
    </ThemeProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default StrainCatalog
