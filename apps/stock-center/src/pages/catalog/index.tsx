import {
  useState,
  useEffect,
  useCallback,
  useRef,
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
  Option,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
  flatMap as OflatMap,
  match as Omatch,
} from "fp-ts/Option"
import {
  match as Amatch,
  findFirst as AfindFirst,
  filter as Afilter,
} from "fp-ts/Array"
import { NonEmptyArray } from "fp-ts/NonEmptyArray"
import {
  ReadonlyNonEmptyArray,
  head as RNEAhead,
} from "fp-ts/ReadonlyNonEmptyArray"
import {
  StockSearchResult,
  StockEntityType,
  useSearchStocksLazyQuery,
} from "dicty-graphql-schema"
import {
  EmptyCatalog,
  ErrorDisplay,
  ScrollToTop,
  CatalogListLoader,
  SearchResultsTable,
  CatalogResultsTable,
} from "@dictybase/ui-dsc"
import { useSearchParams } from "react-router-dom"
import { CatalogSidebar } from "../../components/CatalogSidebar"
import { useInitialSearchResults } from "../../hooks/useInitialSearchResults"
import { AddToCartButtonHandler } from "../../components/AddToCartButtonHandler"
import { catalogTheme } from "../../themes"

/** URL search parameter key for the full-text query string. */
const QUERY_PARAM = "q"

/** URL search parameter key for the entity type filter. */
const ENTITY_PARAM = "entity"

/** URL search parameter key for the group type filter. */
const GROUP_PARAM = "group"

/** Entity type values for filtering stock results. */
const ENTITY_STRAIN = "strain"
const ENTITY_PLASMID = "plasmid"
const ENTITY_ALL = "all"

/** Default entity filter value — returns results for all stock types. */
const DEFAULT_ENTITY = ENTITY_ALL

/** Debounce delay in milliseconds before the URL param (and query) updates. */
const DEBOUNCE_DELAY_MS = 400

/** Minimum number of characters required before a search query fires. */
const MIN_CHARS = 3

/** Maximum number of results to request from the API per search. */
const SEARCH_LIMIT = 50

type SidebarOption = {
  value: string
  label: string
  groups?: ReadonlyNonEmptyArray<{ value: string; label: string }>
}

/** Sidebar filter options mapping display labels to entity URL param values. */
const catalogEntityFilterOptions: NonEmptyArray<SidebarOption> = [
  { value: DEFAULT_ENTITY, label: "All Results" },
  {
    value: ENTITY_STRAIN,
    label: "Strains",
    groups: [
      {
        label: "All Strains",
        value: ENTITY_ALL,
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
    value: ENTITY_PLASMID,
    label: "Plasmids",
    groups: [
      {
        label: "All Plasmids",
        value: ENTITY_ALL,
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
    .with(ENTITY_STRAIN, () => StockEntityType.Strain)
    .with(ENTITY_PLASMID, () => StockEntityType.Plasmid)
    .otherwise(() => undefined)

const stockGroupFilter =
  (group: string) =>
  ({ stock_type }: StockSearchResult) =>
    match(group)
      .with("all", () => true)
      .otherwise(() => group === stock_type)

const getFirstEntity = flow(RNEAhead<SidebarOption>, ({ value }) => value)

/**
 * Returns the value of the first group option belonging to an entity.
 *
 * @param entityValue - The `entity` url parameter value to look up.
 * @returns The first group value (i.e. "all"), wrapped in an Option.
 */
const getFirstGroup = (entityValue: string): Option<string> =>
  pipe(
    catalogEntityFilterOptions,
    AfindFirst(({ value }) => value === entityValue),
    OflatMap(({ groups }) => pipe(groups, OfromNullable, Omap(RNEAhead))),
    Omap(({ value }) => value),
  )
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

  // The filters live in the url so navigation is the single source of truth;
  // local state only mirrors the query string for the text box.
  const entity = pipe(
    searchParameters.get(ENTITY_PARAM),
    OfromNullable,
    OgetOrElse(() => pipe(catalogEntityFilterOptions, getFirstEntity)),
  )
  const group = pipe(searchParameters.get(GROUP_PARAM), OfromNullable)
  const searchTerm = pipe(
    searchParameters.get(QUERY_PARAM),
    OfromNullable,
    OgetOrElse(() => ""),
  )

  const [inputValue, setInputValue] = useState(searchTerm)

  // Latest values for the debounced write. `setSearchParameters` is recreated
  // whenever the location search changes, so listing it as a dependency of the
  // write effect would re-run it on unrelated navigations and revert them.
  const latestSearch = useRef({ searchTerm, setSearchParameters })
  latestSearch.current = { searchTerm, setSearchParameters }

  // The last `q` written by this component, used to tell its own updates apart
  // from external url changes such as the navbar catalog links.
  const lastWrittenSearchTerm = useRef(searchTerm)

  const hasQuery = searchTerm.length >= MIN_CHARS

  const [searchStocks, { data, loading, error }] = useSearchStocksLazyQuery()
  const { data: initialData } = useInitialSearchResults({
    entity,
    group,
    skip: hasQuery,
  })

  // Debounce the text box and write the trimmed query into the `q` url param.
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextTerm = inputValue.trim()
      const { searchTerm: currentTerm, setSearchParameters: updateParameters } =
        latestSearch.current
      if (nextTerm === currentTerm) return
      lastWrittenSearchTerm.current = nextTerm
      updateParameters(
        (previous) => {
          const next = new URLSearchParams([...previous.entries()])
          if (nextTerm.length >= MIN_CHARS) {
            next.set(QUERY_PARAM, nextTerm)
          } else {
            next.delete(QUERY_PARAM)
          }
          return [...next.entries()]
        },
        { replace: true },
      )
    }, DEBOUNCE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [inputValue])

  // Mirror the url query back into the text box when it changed outside this
  // component, i.e. through the navbar catalog links or back/forward.
  useEffect(() => {
    if (searchTerm === lastWrittenSearchTerm.current) return
    lastWrittenSearchTerm.current = searchTerm
    setInputValue(searchTerm)
  }, [searchTerm])

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

  const onChangeEntity: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget,
  }) => {
    // Selecting an entity resets the group to that entity's first option.
    setSearchParameters((previous) => {
      const next = new URLSearchParams([...previous.entries()])
      next.set(ENTITY_PARAM, currentTarget.value)
      pipe(
        getFirstGroup(currentTarget.value),
        Omatch(
          () => next.delete(GROUP_PARAM),
          (groupValue) => next.set(GROUP_PARAM, groupValue),
        ),
      )
      return [...next.entries()]
    })
  }

  const onChangeGroup: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget,
  }) => {
    setSearchParameters((previous) => {
      const next = new URLSearchParams([...previous.entries()])
      next.set(GROUP_PARAM, currentTarget.value)
      return [...next.entries()]
    })
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
            selectedEntity={entity}
            selectedGroup={group}
            onChangeEntity={onChangeEntity}
            onChangeGroup={onChangeGroup}
          />

          {/* Content area */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Search input */}
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "20px 24px",
                marginBottom: "16px",
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
            {match({ initialData, data, loading, error, hasQuery })
              .with(
                { hasQuery: false, initialData: P.select(P.not(P.nullish)) },
                (items) => (
                  <CatalogResultsTable
                    items={items}
                    actionComponent={AddToCartButtonHandler}
                  />
                ),
              )
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
                    group,
                    Omatch(
                      () => results,
                      (g) => pipe(results, Afilter(stockGroupFilter(g))),
                    ),
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
