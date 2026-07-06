import { useRef } from "react"
import { Box, ThemeProvider } from "@mui/material"
import { P, match } from "ts-pattern"
import {
  buildStrainListFilter,
  graphqlListVariables,
} from "@dictybase/hook-dsc"
import { useIntersectionObserver } from "@dictybase/hook"
import { useStrainListQuery } from "dicty-graphql-schema"
import { CatalogTable, ScrollToTop } from "@dictybase/ui-dsc"
import { ErrorDisplay } from "@dictybase/ui-dsc"
import { useSearchParams } from "react-router-dom"
import {
  CatalogSidebar,
  CatalogSearchBar,
  CartButton,
  AddToCartButton,
} from "../../../features/StrainCatalog/components"
import { useScrollPersistence } from "../../../features/StrainCatalog/hooks"
import { theme } from "../../../features/StrainCatalog/theme"
import type { CatalogStrain } from "../../../features/StrainCatalog/types"

/**
 * StrainCatalogRedesign is the redesigned main component for displaying the strain catalog.
 * Features:
 * - Two-column layout with sidebar filters
 * - Enhanced search with active filter display
 * - Scrollable table with sticky header
 * - Cart integration
 * - Scroll to top button
 * - Scroll position persistence
 */
const StrainCatalogRedesign = () => {
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

  // Infinite scroll intersection observer
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

  // Extract strains from data
  const strains = (data?.listStrains?.strains || []) as Array<CatalogStrain>

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "24px",
          backgroundColor: "#f5f7fa",
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
          <CartButton />
        </Box>

        {/* Main layout: sidebar + content */}
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            alignItems: "flex-start",
          }}>
          {/* Sidebar with filters */}
          <CatalogSidebar />

          {/* Content area */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Search bar */}
            <CatalogSearchBar />

            {/* Pattern matching for different query states */}
            {match({ data, loading, error })
              .with(
                { data: P.select({ listStrains: P.not(P.nullish) }) },
                () => (
                  <Box ref={rootReference}>
                    <CatalogTable
                      strains={strains}
                      isLoading={loading}
                      loadMoreRef={targetReference}
                      renderActions={(strain) => (
                        <AddToCartButton strain={strain} />
                      )}
                    />
                  </Box>
                ),
              )
              .with({ loading: true }, () => (
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "40px",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}>
                  Loading strains...
                </Box>
              ))
              .with({ error: P.select(P.not(P.nullish)) }, (error_) => (
                <ErrorDisplay error={error_} refetch={refetch} />
              ))
              .otherwise(() => (
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "40px",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}>
                  No strains found
                </Box>
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
export default StrainCatalogRedesign
