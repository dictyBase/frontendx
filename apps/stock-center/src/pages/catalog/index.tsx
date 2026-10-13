import { useState, useEffect, useCallback } from "react"
import { Box, ThemeProvider, TextField, InputAdornment } from "@mui/material"
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
 * Renders a text input that debounces user input into the `q` URL parameter,
 * a sidebar that writes an `entity` URL parameter for entity-type filtering,
 * and a results table driven by `useSearchStocksLazyQuery`. The query is only
 * fired once the search term reaches `MIN_CHARS` characters.
 */
const CatalogSearch = () => {
  const [searchParameters, setSearchParameters] = useSearchParams()

  const query = searchParameters.get(QUERY_PARAM) ?? ""
  const entityParameters = searchParameters.get(ENTITY_PARAM) ?? DEFAULT_ENTITY

  // Local input state allows immediate UI feedback while the URL update debounces.
  const [inputValue, setInputValue] = useState(query)

  const [searchStocks, { data, loading, error }] = useSearchStocksLazyQuery()

  // Debounce: write the trimmed input to the `q` URL param after a short delay.
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = inputValue.trim()
      setSearchParameters(
        (previous) => {
          const next = new URLSearchParams([...previous.entries()])
          if (trimmed.length >= MIN_CHARS) {
            next.set(QUERY_PARAM, trimmed)
          } else {
            next.delete(QUERY_PARAM)
          }
          return [...next.entries()]
        },
        { replace: true },
      )
    }, DEBOUNCE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [inputValue, setSearchParameters])

  // Fire the lazy query whenever the search term or entity filter changes.
  useEffect(() => {
    if (query.length >= MIN_CHARS) {
      searchStocks({
        variables: {
          query,
          limit: SEARCH_LIMIT,
          entity: toStockEntityType(entityParameters),
        },
      })
    }
  }, [query, entityParameters, searchStocks])

  /**
   * Re-fires the last search query; passed to `ErrorDisplay` as the retry
   * callback.
   */
  const refetch = useCallback(() => {
    if (query.length >= MIN_CHARS) {
      searchStocks({
        variables: {
          query,
          limit: SEARCH_LIMIT,
          entity: toStockEntityType(entityParameters),
        },
      })
    }
  }, [query, entityParameters, searchStocks])

  const hasQuery = query.length >= MIN_CHARS

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
                InputProps={{
                  "aria-label": "search the catalog",
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
                <EmptyCatalog message="Enter at least 3 characters to search the catalog" />
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
