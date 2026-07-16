import { useRef } from "react"
import { Box, ThemeProvider } from "@mui/material"
import { P, match } from "ts-pattern"
import {
  buildPlasmidListFilter,
  graphqlListVariables,
  plasmidGroupFilterOptions,
} from "@dictybase/hook-dsc"
import { useIntersectionObserver } from "@dictybase/hook"
import { usePlasmidListFilterQuery } from "dicty-graphql-schema"
import {
  EmptyCatalog,
  ErrorDisplay,
  CatalogTable,
  ScrollToTop,
  hasNotFoundError,
  CatalogListLoader,
} from "@dictybase/ui-dsc"
import { useSearchParams } from "react-router-dom"
import { CatalogSidebar } from "../../components/CatalogSidebar"
import { CatalogSearchBar } from "../../components/CatalogSearchBar"
import { useScrollPersistence } from "../../hooks/useScrollPersistence"
import { catalogTheme } from "../../themes"
import { AddToCartButtonHandler } from "../../components/AddToCartButtonHandler"

const PlasmidCatalog = () => {
  useScrollPersistence({ storageKey: "plasmidCatalogScrollPos" })

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
    <ThemeProvider theme={catalogTheme}>
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "24px",
          pt: 0,
          minHeight: "100vh",
        }}>
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
            Plasmid Catalog
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "24px",
            alignItems: "flex-start",
          }}>
          <CatalogSidebar
            title="Plasmid Type"
            value="regular"
            param="group"
            options={plasmidGroupFilterOptions}
          />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <CatalogSearchBar />

            {match({ data, loading, error })
              .with(
                { data: { listPlasmids: P.select(P.not(P.nullish)) } },
                ({ plasmids, nextCursor }) => (
                  <Box ref={rootReference}>
                    <CatalogTable
                      items={plasmids}
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
                  <EmptyCatalog message="Sorry, we couldn't find any plasmids. Try searching again with different terms" />
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

        <ScrollToTop />
      </Box>
    </ThemeProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default PlasmidCatalog
