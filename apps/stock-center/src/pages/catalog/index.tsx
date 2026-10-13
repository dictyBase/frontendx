import { useState, useEffect, useCallback } from "react"
import {
  Box,
  ThemeProvider,
  TextField,
  InputAdornment,
  Typography,
  Paper,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { P, match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { StockEntityType, useSearchStocksLazyQuery } from "dicty-graphql-schema"
import {
  EmptyCatalog,
  ErrorDisplay,
  ScrollToTop,
  CatalogListLoader,
  SearchResultsTable,
} from "@dictybase/ui-dsc"
import { useSearchParams } from "react-router-dom"
import { CatalogSidebar } from "../../components/CatalogSidebar"
import { AddToCartButtonHandler } from "../../components/AddToCartButtonHandler"
import { catalogTheme } from "../../themes"

/** URL search parameter key for the full-text query string. */
const QUERY_PARAM = "q"

/** URL search parameter key for the entity type filter. */
const ENTITY_PARAM = "entity"

/** Default entity filter value — returns results for all stock types. */
const DEFAULT_ENTITY = "all"

/** Debounce delay in milliseconds before the URL param (and query) updates. */
const DEBOUNCE_DELAY_MS = 400

/** Minimum number of characters required before a search query fires. */
const MIN_CHARS = 3

/** Maximum number of results to request from the API per search. */
const SEARCH_LIMIT = 50

/** Sidebar filter options mapping display labels to entity URL param values. */
const catalogEntityFilterOptions = [
  { value: DEFAULT_ENTITY, label: "All Results" },
  { value: "strain", label: "Strains" },
  { value: "plasmid", label: "Plasmids" },
]

/**
 * Maps the `entity` URL parameter value to its corresponding
 * `StockEntityType` for use in the GraphQL query variables.
 * Returns `undefined` when the "all" option is selected so the API
 * returns results for every entity type.
 *
 * @parameters parameters - The raw string value of the `entity` URL parameter.
 * @returns A `StockEntityType` enum value, or `undefined` for "all".
 */
const toStockEntityType = (parameters: string): StockEntityType | undefined =>
  match(parameters)
    .with("strain", () => StockEntityType.Strain)
    .with("plasmid", () => StockEntityType.Plasmid)
    .otherwise(() => undefined)

/**
 * Full-catalog search page.
 *
 * Renders a text input that debounces user input into a local `searchTerm`
 * state (and keeps the `q` URL param in sync for shareability), a sidebar
 * that writes an `entity` URL parameter for entity-type filtering, and a
 * results table driven by `useSearchStocksLazyQuery`. The query fires only
 * once the search term reaches `MIN_CHARS` characters.
 */
const CatalogSearch = () => {
  const [searchParameters, setSearchParameters] = useSearchParams()

  const entityParameter = searchParameters.get(ENTITY_PARAM) ?? DEFAULT_ENTITY

  const [inputValue, setInputValue] = useState(
    searchParameters.get(QUERY_PARAM) ?? "",
  )
  const [searchTerm, setSearchTerm] = useState(
    searchParameters.get(QUERY_PARAM) ?? "",
  )

  const [searchStocks, { data, loading, error }] = useSearchStocksLazyQuery()

  // Debounce: update local searchTerm after a short delay.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue.trim())
    }, DEBOUNCE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [inputValue])

  // Keep the `q` URL param in sync with the debounced search term.
  useEffect(() => {
    setSearchParameters(
      (previous) => {
        const next = new URLSearchParams([...previous.entries()])
        if (searchTerm.length >= MIN_CHARS) {
          next.set(QUERY_PARAM, searchTerm)
        } else {
          next.delete(QUERY_PARAM)
        }
        return [...next.entries()]
      },
      { replace: true },
    )
  }, [searchTerm, setSearchParameters])

  // Fire the lazy query whenever the search term or entity filter changes.
  useEffect(() => {
    if (searchTerm.length >= MIN_CHARS) {
      searchStocks({
        variables: {
          query: searchTerm,
          limit: SEARCH_LIMIT,
          entity: toStockEntityType(entityParameter),
        },
      })
    }
  }, [searchTerm, entityParameter, searchStocks])

  /**
   * Re-fires the last search query; passed to `ErrorDisplay` as the retry
   * callback.
   */
  const refetch = useCallback(() => {
    if (searchTerm.length >= MIN_CHARS) {
      searchStocks({
        variables: {
          query: searchTerm,
          limit: SEARCH_LIMIT,
          entity: toStockEntityType(entityParameter),
        },
      })
    }
  }, [searchTerm, entityParameter, searchStocks])

  const hasQuery = searchTerm.length >= MIN_CHARS

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
        {/* Page header */}
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
            Catalog Search
          </Box>
        </Box>

        {/* Main layout: sidebar + content */}
        <Box sx={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
          {/* Entity type filter sidebar */}
          <CatalogSidebar
            title="Stock Type"
            value={DEFAULT_ENTITY}
            param={ENTITY_PARAM}
            options={catalogEntityFilterOptions}
          />

          {/* Content area */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Search input */}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "20px 24px",
                marginBottom: "20px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}>
              <TextField
                fullWidth
                placeholder="Search strains and plasmids…"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                inputProps={{ "aria-label": "search the catalog" }}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#a0aec0" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
              />
            </Box>

            {/* Results area — pattern matched against query/loading/data/error */}
            {match({ data, loading, error, hasQuery })
              .with({ hasQuery: false }, () => (
                <Paper
                  elevation={0}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.5,
                    py: 10,
                    borderRadius: "12px",
                    border: "2px dashed #e2e8f0",
                    backgroundColor: "#f8fafc",
                  }}>
                  <SearchIcon sx={{ fontSize: 48, color: "#cbd5e0" }} />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: "#4a5568",
                      fontSize: "1rem",
                    }}>
                    Search the Catalog
                  </Typography>
                  <Typography sx={{ color: "#a0aec0", fontSize: "0.875rem" }}>
                    Enter at least 3 characters to get started
                  </Typography>
                </Paper>
              ))
              .with({ loading: true }, () => <CatalogListLoader />)
              .with(
                { data: { searchStocks: { results: P.select() } } },
                (results) =>
                  pipe(
                    results.length > 0,
                    Bmatch(
                      () => (
                        <EmptyCatalog message="No results found. Try searching with different terms." />
                      ),
                      () => (
                        <SearchResultsTable
                          results={results}
                          actionComponent={AddToCartButtonHandler}
                        />
                      ),
                    ),
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
export default CatalogSearch
