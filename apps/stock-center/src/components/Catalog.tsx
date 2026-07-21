import { useRef } from "react"
import { Box, Button, ThemeProvider } from "@mui/material"
import { P, match } from "ts-pattern"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useIntersectionObserver } from "@dictybase/hook"
import {
  useStrainListQuery,
  usePlasmidListFilterQuery,
} from "dicty-graphql-schema"
import {
  buildStrainListFilter,
  buildPlasmidListFilter,
  graphqlListVariables,
  strainGroupFilterOptions,
  plasmidGroupFilterOptions,
  defaultFilter,
} from "@dictybase/hook-dsc"
import {
  EmptyCatalog,
  ErrorDisplay,
  CatalogTable,
  ScrollToTop,
  hasNotFoundError,
  CatalogListLoader,
} from "@dictybase/ui-dsc"
import { CatalogSidebar } from "./CatalogSidebar"
import { CatalogSearchBar } from "./CatalogSearchBar"
import { AddToCartButtonHandler } from "./AddToCartButtonHandler"
import { useScrollPersistence } from "../hooks/useScrollPersistence"
import { catalogTheme } from "../themes"

const SX_SEGMENTED = {
  display: "inline-flex",
  backgroundColor: "#edf2f7",
  borderRadius: "8px",
  padding: "4px",
}

const SX_SEGMENTED_TAB = {
  padding: "8px 24px",
  borderRadius: "6px",
  fontFamily: "'Poppins', sans-serif",
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "#4a5568",
  textTransform: "none",
  minWidth: "unset",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}

const SX_SEGMENTED_ACTIVE = {
  backgroundColor: "white",
  color: "#1a202c",
  fontWeight: 600,
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)",
  "&:hover": {
    backgroundColor: "white",
  },
}

const StrainCatalogContent = () => {
  useScrollPersistence({ storageKey: "strainCatalogScrollPos" })
  const [searchParameters] = useSearchParams()

  const { loading, error, data, fetchMore, refetch } = useStrainListQuery({
    variables: {
      ...graphqlListVariables,
      filter: buildStrainListFilter(searchParameters),
    },
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
    <Box sx={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
      <CatalogSidebar
        title="Strain Type"
        value={defaultFilter.value}
        param={defaultFilter.param}
        options={strainGroupFilterOptions}
      />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <CatalogSearchBar />
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
  )
}

const PlasmidCatalogContent = () => {
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
    <Box sx={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
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
  )
}

const Catalog = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isPlasmidCatalog = pathname.includes("plasmids")

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
            Catalog
          </Box>
          <Box sx={SX_SEGMENTED}>
            <Button
              sx={{
                ...SX_SEGMENTED_TAB,
                ...(isPlasmidCatalog ? {} : SX_SEGMENTED_ACTIVE),
              }}
              disableRipple
              onClick={() => navigate("/strains", { replace: true })}>
              Strains
            </Button>
            <Button
              sx={{
                ...SX_SEGMENTED_TAB,
                ...(isPlasmidCatalog ? SX_SEGMENTED_ACTIVE : {}),
              }}
              disableRipple
              onClick={() => navigate("/plasmids", { replace: true })}>
              Plasmids
            </Button>
          </Box>
        </Box>

        {isPlasmidCatalog ? (
          <PlasmidCatalogContent />
        ) : (
          <StrainCatalogContent />
        )}

        <ScrollToTop />
      </Box>
    </ThemeProvider>
  )
}

export { Catalog }
