import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  ChangeEventHandler,
} from "react"
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
import { pipe, flow } from "fp-ts/function"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  Option,
  some,
  none,
} from "fp-ts/Option"
import { match as Amatch } from "fp-ts/Array"
import {
  ReadonlyNonEmptyArray,
  head as RNEAhead,
} from "fp-ts/ReadonlyNonEmptyArray"
import { StockEntityType, useSearchStocksLazyQuery } from "dicty-graphql-schema"
import {
  EmptyCatalog,
  ErrorDisplay,
  ScrollToTop,
  CatalogListLoader,
  SearchResultsTable,
} from "@dictybase/ui-dsc"
import { useSearchParams, NavigateOptions } from "react-router-dom"
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

type SidebarOption = {
  value: string
  label: string
  groups?: Array<{ value: string; label: string }>
}

/** Sidebar filter options mapping display labels to entity URL param values. */
const catalogEntityFilterOptions: ReadonlyNonEmptyArray<SidebarOption> = [
  { value: DEFAULT_ENTITY, label: "All Results" },
  {
    value: "strain",
    label: "Strains",
    groups: [
      {
        label: "All Strains",
        value: "all",
      },
      {
        label: "Regular Strains",
        value: "regular",
      },
      {
        label: "GWDI Strains",
        value: "gwdi",
      },
      {
        label: "Bacterial Strains",
        value: "bacterial",
      },
    ],
  },
  {
    value: "plasmid",
    label: "Plasmids",
    groups: [
      {
        label: "All Plasmids",
        value: "all",
      },
      {
        label: "Regular Plasmids",
        value: "regular",
      },
      {
        label: "Golden Braid Plasmids",
        value: "goldenbraid",
      },
    ],
  },
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

const getFirstEntity = flow(RNEAhead<SidebarOption>, ({ value }) => value)
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
  const initialQueryParameter = pipe(
    searchParameters.get(QUERY_PARAM),
    OfromNullable,
    OgetOrElse(() => ""),
  )
  const [inputValue, setInputValue] = useState(initialQueryParameter)
  const [searchTerm, setSearchTerm] = useState(initialQueryParameter)
  const [entity, setEntity] = useState(
    pipe(
      searchParameters.get("entity"),
      OfromNullable,
      OgetOrElse(() => pipe(catalogEntityFilterOptions, getFirstEntity)),
    ),
  )
  const [group, setGroup] = useState<Option<string>>(none)
  const [searchStocks, { data, loading, error }] = useSearchStocksLazyQuery()

  const setSearchParameter = useCallback(
    (k: string, v: string, navigationOptions?: NavigateOptions) => {
      setSearchParameters((previousParameters) => {
        const newParameters = new URLSearchParams([
          ...previousParameters.entries(),
        ])
        newParameters.set(k, v)
        return [...newParameters.entries()]
      }, navigationOptions)
    },
    [setSearchParameters],
  )

  // Initializes the search parameters with parameters that corresponding to the default selected radio option.
  // useEffect(() => {
  //   setSearchParameter("entity", entity, { replace: true })
  // }, [entity, setSearchParameter])
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
        next.set(ENTITY_PARAM, entity)
        return [...next.entries()]
      },
      { replace: true },
    )
  }, [searchTerm, setSearchParameters, entity])

  // Fire the lazy query whenever the search term or entity filter changes.
  useEffect(() => {
    if (searchTerm.length >= MIN_CHARS) {
      searchStocks({
        variables: {
          query: searchTerm,
          limit: SEARCH_LIMIT,
          entity: toStockEntityType(entity),
        },
      })
    }
  }, [searchTerm, entity, searchStocks])

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
          entity: toStockEntityType(entity),
        },
      })
    }
  }, [searchTerm, entity, searchStocks])

  const hasQuery = searchTerm.length >= MIN_CHARS

  const onChangeEntity: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget,
  }) => {
    setEntity(currentTarget.value)
  }
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
            options={catalogEntityFilterOptions}
            onChangeEntity={onChangeEntity}
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
                    results,
                    Amatch(
                      () => (
                        <EmptyCatalog message="No results found. Try searching with different terms." />
                      ),
                      (r) => (
                        <SearchResultsTable
                          results={r}
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
