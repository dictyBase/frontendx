import { vi, test, expect, beforeEach } from "vitest"
import { render, screen, act, within } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MockedProvider } from "@apollo/client/testing"
import { MemoryRouter, useLocation } from "react-router-dom"
import { Provider, createStore } from "jotai"
import {
  SearchStocksDocument,
  StockEntityType,
  StockSearchFieldEnum,
  StrainType,
  PlasmidType,
  StrainListDocument,
  PlasmidListFilterDocument,
} from "dicty-graphql-schema"
import { cartAtom } from "../cartState"
import CatalogSearch from "../pages/catalog/index"

const navigateMock = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>("react-router-dom")
  return { ...actual, useNavigate: () => navigateMock }
})

const SEARCH_LIMIT = 50
const searchQuery = "axe"
const ALL_RESULTS_LABEL = "All Results"
const STRAINS_LABEL = "Strains"
const PLASMIDS_LABEL = "Plasmids"
const ALL_STRAINS_LABEL = "All Strains"
const REGULAR_STRAINS_LABEL = "Regular Strains"
const GWDI_STRAINS_LABEL = "GWDI Strains"
const BACTERIAL_STRAINS_LABEL = "Bacterial Strains"

const getFilterPillLabel = (text: string): HTMLElement =>
  screen.getByText(text).closest("label") as HTMLElement

/** Test id of the location search probe rendered alongside the page. */
const LOCATION_SEARCH_TEST_ID = "location-search"

/** Catalog entity resources and their routes. */
const ENTITY_ROUTE = {
  all: "/catalog",
  strain: "/strains",
  plasmid: "/plasmids",
} as const

type Entity = keyof typeof ENTITY_ROUTE

/** Creates a fresh Jotai store with an empty cart for each test. */
const makeStore = () => {
  const store = createStore()
  store.set(cartAtom, { strainItems: [], plasmidItems: [], maxItems: 12 })
  return store
}

/**
 * Base mocks for the initial-data queries fired by
 * {@link useInitialSearchResults} on mount when no search term is active.
 *
 * The catalog page always calls the hook with `skip: hasQuery`; on initial
 * render `hasQuery` is `false`, so these queries fire immediately. Every
 * test that renders the page must provide responses for them.
 */
const baseMocks = [
  {
    request: {
      query: StrainListDocument,
      variables: {
        cursor: 0,
        limit: 12,
        filter: { strain_type: StrainType.All },
      },
    },
    result: {
      data: {
        listStrains: { strains: [], nextCursor: 0 },
      },
    },
  },
  {
    request: {
      query: PlasmidListFilterDocument,
      variables: {
        cursor: 0,
        limit: 12,
        filter: { plasmid_type: PlasmidType.All },
      },
    },
    result: {
      data: {
        listPlasmids: { plasmids: [], nextCursor: 0 },
      },
    },
  },
]

const suggestionsMock = {
  request: {
    query: SearchStocksDocument,
    variables: { query: searchQuery, limit: SEARCH_LIMIT, entity: undefined },
  },
  result: {
    data: {
      searchStocks: {
        totalCount: 2,
        limit: SEARCH_LIMIT,
        results: [
          {
            __typename: "StockSearchResult",
            id: "DBS0001",
            entity: StockEntityType.Strain,
            field: StockSearchFieldEnum.Label,
            display_text: "axeA",
            stock_label: "axeA",
            summary: "Axenic growth mutant A",
            score: 1,
            in_stock: true,
          },
          {
            __typename: "StockSearchResult",
            id: "DBP0001",
            entity: StockEntityType.Plasmid,
            field: StockSearchFieldEnum.Name,
            display_text: "pAXE1",
            stock_label: "pAXE1",
            summary: "Expression vector for AXE1",
            score: 0.9,
            in_stock: true,
          },
        ],
      },
    },
  },
}

const emptyResultsMock = {
  request: suggestionsMock.request,
  result: {
    data: {
      searchStocks: { totalCount: 0, limit: SEARCH_LIMIT, results: [] },
    },
  },
}

const strainOnlyMock = {
  request: {
    query: SearchStocksDocument,
    variables: {
      query: searchQuery,
      limit: SEARCH_LIMIT,
      entity: StockEntityType.Strain,
    },
  },
  result: {
    data: {
      searchStocks: {
        totalCount: 1,
        limit: SEARCH_LIMIT,
        results: [
          {
            __typename: "StockSearchResult",
            id: "DBS0001",
            entity: StockEntityType.Strain,
            field: StockSearchFieldEnum.Label,
            display_text: "axeA",
            stock_label: "axeA",
            summary: "Axenic growth mutant A",
            score: 1,
            in_stock: true,
          },
        ],
      },
    },
  },
}

const outOfStockMock = {
  request: suggestionsMock.request,
  result: {
    data: {
      searchStocks: {
        totalCount: 1,
        limit: SEARCH_LIMIT,
        results: [
          {
            __typename: "StockSearchResult",
            id: "DBS0099",
            entity: StockEntityType.Strain,
            field: StockSearchFieldEnum.Label,
            display_text: "unavailableStrain",
            stock_label: "unavailableStrain",
            summary: "Currently out of stock",
            score: 1,
            in_stock: false,
          },
        ],
      },
    },
  },
}

/** Initial-data mock for a strain resource opened with the gwdi group. */
const gwdiInitialMock = {
  request: {
    query: StrainListDocument,
    variables: {
      cursor: 0,
      limit: 12,
      filter: { strain_type: StrainType.Gwdi },
    },
  },
  result: {
    data: {
      listStrains: { strains: [], nextCursor: 0 },
    },
  },
}

/**
 * Renders the current location search string next to the page so tests can
 * assert on url updates without relying on a specific router implementation.
 */
const LocationProbe = () => {
  const { search } = useLocation()
  return <div data-testid={LOCATION_SEARCH_TEST_ID}>{search}</div>
}

type RenderPageOptions = {
  /** The catalog entity resource the page represents. */
  entity?: Entity
  /** Initial history entries for the memory router. */
  initialEntries?: Array<string>
}

/**
 * Renders the catalog page for a given entity resource with the supplied
 * mocks and initial url.
 *
 * @param mocks - Apollo mocks for the search and initial-data queries.
 * @param options - Entity resource and initial url configuration.
 * @returns The Testing Library render result.
 */
const renderPage = (
  mocks: any[] = [suggestionsMock],
  {
    entity = "all",
    initialEntries = [ENTITY_ROUTE[entity]],
  }: RenderPageOptions = {},
) =>
  render(
    <Provider store={makeStore()}>
      <MockedProvider mocks={[...baseMocks, ...mocks]} addTypename={false}>
        <MemoryRouter initialEntries={initialEntries}>
          <LocationProbe />
          <CatalogSearch entity={entity} />
        </MemoryRouter>
      </MockedProvider>
    </Provider>,
  )

const getInput = () =>
  screen.getByRole("textbox", { name: /search the catalog/i })

beforeEach(() => {
  navigateMock.mockClear()
})

test("renders the page heading", () => {
  renderPage()
  expect(
    screen.getByRole("heading", { name: /catalog search/i }),
  ).toBeInTheDocument()
})

test("renders a resource-specific heading for the strain catalog", () => {
  renderPage([], { entity: "strain" })
  expect(
    screen.getByRole("heading", { name: /strain catalog/i }),
  ).toBeInTheDocument()
})

test("renders a resource-specific heading for the plasmid catalog", () => {
  renderPage([], { entity: "plasmid" })
  expect(
    screen.getByRole("heading", { name: /plasmid catalog/i }),
  ).toBeInTheDocument()
})

test("renders the search input", () => {
  renderPage()
  expect(getInput()).toBeInTheDocument()
})

test("shows the search prompt before any input is entered", async () => {
  renderPage()
  expect(await screen.findByText(/search the catalog/i)).toBeInTheDocument()
  expect(screen.getByText(/enter at least 3 characters/i)).toBeInTheDocument()
})

test("does not fire a query for fewer than 3 characters", async () => {
  renderPage([])
  await userEvent.type(getInput(), "ax")
  expect(screen.queryByRole("link")).not.toBeInTheDocument()
  expect(screen.getByText(/enter at least 3 characters/i)).toBeInTheDocument()
})

test("typing updates the input value", async () => {
  renderPage()
  await userEvent.type(getInput(), searchQuery)
  expect(getInput()).toHaveValue(searchQuery)
})

const QUERY_TIMEOUT = { timeout: 3000 }

test("shows strain and plasmid results after typing 3+ characters", async () => {
  renderPage()
  await userEvent.type(getInput(), searchQuery)
  expect(await screen.findByText("axeA", {}, QUERY_TIMEOUT)).toBeInTheDocument()
  expect(
    await screen.findByText("pAXE1", {}, QUERY_TIMEOUT),
  ).toBeInTheDocument()
})

test("navigates to strain detail page when clicking strain result in list view", async () => {
  renderPage()
  await userEvent.type(getInput(), searchQuery)
  const item = await screen.findByText("axeA", {}, QUERY_TIMEOUT)
  await userEvent.click(item)
  expect(navigateMock).toHaveBeenCalledWith("/strains/DBS0001")
})

test("navigates to plasmid detail page when clicking plasmid result in list view", async () => {
  renderPage()
  await userEvent.type(getInput(), searchQuery)
  const item = await screen.findByText("pAXE1", {}, QUERY_TIMEOUT)
  await userEvent.click(item)
  expect(navigateMock).toHaveBeenCalledWith("/plasmids/DBP0001")
})

test("renders an add to cart button for in-stock results", async () => {
  renderPage()
  await userEvent.type(getInput(), searchQuery)
  await screen.findByText("axeA", {}, QUERY_TIMEOUT)
  expect(
    screen.getAllByRole("button", { name: /add to shopping cart/i }),
  ).not.toHaveLength(0)
})

test("renders an unavailable button for out-of-stock results", async () => {
  renderPage([outOfStockMock])
  await userEvent.type(getInput(), searchQuery)
  await screen.findByText("unavailableStrain", {}, QUERY_TIMEOUT)
  expect(
    screen.getByRole("button", { name: /unavailable/i }),
  ).toBeInTheDocument()
})

test("shows the empty catalog message when the query returns no results", async () => {
  renderPage([emptyResultsMock])
  await userEvent.type(getInput(), searchQuery)
  expect(
    await screen.findByText(/no results found/i, {}, QUERY_TIMEOUT),
  ).toBeInTheDocument()
})

test("does not display counts on filter ribbons when there is no query", () => {
  renderPage([], { entity: "strain" })

  expect(getFilterPillLabel(ALL_RESULTS_LABEL)).toHaveTextContent(
    /^All Results$/,
  )
  expect(getFilterPillLabel(STRAINS_LABEL)).toHaveTextContent(/^Strains$/)
  expect(getFilterPillLabel(PLASMIDS_LABEL)).toHaveTextContent(/^Plasmids$/)
  expect(getFilterPillLabel(ALL_STRAINS_LABEL)).toHaveTextContent(
    /^All Strains$/,
  )
})

test("displays ellipsis on active entity and subtype ribbons while search results are loading", () => {
  const delayedStrainMock = {
    ...strainOnlyMock,
    delay: 5000,
  }
  renderPage([delayedStrainMock], {
    entity: "strain",
    initialEntries: [`/strains?q=${searchQuery}&group=all`],
  })

  expect(getFilterPillLabel(ALL_RESULTS_LABEL)).toHaveTextContent(
    /^All Results$/,
  )
  expect(getFilterPillLabel(PLASMIDS_LABEL)).toHaveTextContent(/^Plasmids$/)
  expect(
    within(getFilterPillLabel(STRAINS_LABEL)).getByText("..."),
  ).toBeInTheDocument()
  expect(
    within(getFilterPillLabel(ALL_STRAINS_LABEL)).getByText("..."),
  ).toBeInTheDocument()
})

test("displays only All Results count when entity is all and there is a query", async () => {
  renderPage([suggestionsMock], { entity: "all" })
  await userEvent.type(getInput(), searchQuery)
  await screen.findByText("axeA", {}, QUERY_TIMEOUT)

  expect(
    within(getFilterPillLabel(ALL_RESULTS_LABEL)).getByText("2"),
  ).toBeInTheDocument()
  expect(getFilterPillLabel(STRAINS_LABEL)).toHaveTextContent(/^Strains$/)
  expect(getFilterPillLabel(PLASMIDS_LABEL)).toHaveTextContent(/^Plasmids$/)
})

test("tallies only strain and strain subtype counts when entity is strain and there is a query", async () => {
  const mixedStrainMock = {
    request: {
      query: SearchStocksDocument,
      variables: {
        query: searchQuery,
        limit: SEARCH_LIMIT,
        entity: StockEntityType.Strain,
      },
    },
    result: {
      data: {
        searchStocks: {
          totalCount: 3,
          limit: SEARCH_LIMIT,
          results: [
            {
              __typename: "StockSearchResult",
              id: "DBS0001",
              entity: StockEntityType.Strain,
              field: StockSearchFieldEnum.Label,
              display_text: "regStrain1",
              stock_label: "regStrain1",
              summary: "Regular strain 1",
              score: 1,
              in_stock: true,
              stock_type: "regular",
            },
            {
              __typename: "StockSearchResult",
              id: "DBS0002",
              entity: StockEntityType.Strain,
              field: StockSearchFieldEnum.Label,
              display_text: "regStrain2",
              stock_label: "regStrain2",
              summary: "Regular strain 2",
              score: 0.9,
              in_stock: true,
              stock_type: "regular",
            },
            {
              __typename: "StockSearchResult",
              id: "DBS0003",
              entity: StockEntityType.Strain,
              field: StockSearchFieldEnum.Label,
              display_text: "gwdiStrain1",
              stock_label: "gwdiStrain1",
              summary: "GWDI strain 1",
              score: 0.8,
              in_stock: true,
              stock_type: "gwdi",
            },
          ],
        },
      },
    },
  }

  renderPage([mixedStrainMock], { entity: "strain" })
  await userEvent.type(getInput(), searchQuery)
  await screen.findByText("regStrain1", {}, QUERY_TIMEOUT)

  expect(getFilterPillLabel(ALL_RESULTS_LABEL)).toHaveTextContent(
    /^All Results$/,
  )
  expect(getFilterPillLabel(PLASMIDS_LABEL)).toHaveTextContent(/^Plasmids$/)
  expect(
    within(getFilterPillLabel(STRAINS_LABEL)).getByText("3"),
  ).toBeInTheDocument()
  expect(
    within(getFilterPillLabel(ALL_STRAINS_LABEL)).getByText("3"),
  ).toBeInTheDocument()
  expect(
    within(getFilterPillLabel(REGULAR_STRAINS_LABEL)).getByText("2"),
  ).toBeInTheDocument()
  expect(
    within(getFilterPillLabel(GWDI_STRAINS_LABEL)).getByText("1"),
  ).toBeInTheDocument()
  expect(
    within(getFilterPillLabel(BACTERIAL_STRAINS_LABEL)).getByText("0"),
  ).toBeInTheDocument()
})

test("renders All Results, Strains, and Plasmids filter options", () => {
  renderPage()
  expect(screen.getByText(ALL_RESULTS_LABEL)).toBeInTheDocument()
  expect(screen.getByText(STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText(PLASMIDS_LABEL)).toBeInTheDocument()
})

test("sends the Strain entity type when on the strain resource", async () => {
  renderPage([strainOnlyMock], { entity: "strain" })
  await userEvent.type(getInput(), searchQuery)
  expect(await screen.findByText("axeA", {}, QUERY_TIMEOUT)).toBeInTheDocument()
  expect(screen.queryByText("pAXE1")).not.toBeInTheDocument()
})

test("syncs the search term to the URL after debounce", async () => {
  renderPage([suggestionsMock])
  await userEvent.type(getInput(), searchQuery)
  // Wait past the 400ms debounce delay so searchTerm and URL param update
  await act(
    () =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, 500)
      }),
  )
  // Results should be visible, confirming the inputValue → searchTerm → URL → query chain
  expect(screen.getByText("axeA")).toBeInTheDocument()
  expect(screen.getByTestId(LOCATION_SEARCH_TEST_ID)).toHaveTextContent(
    `q=${searchQuery}`,
  )
})

test("debounce does not immediately fire the query for short input", async () => {
  renderPage([])
  await userEvent.type(getInput(), "a")
  expect(getInput()).toHaveValue("a")
  await act(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 500)
      }),
  )
  expect(screen.queryByRole("link")).not.toBeInTheDocument()
})

test("displays error message when query fails", async () => {
  const errorMock = {
    request: suggestionsMock.request,
    error: new Error("Network error"),
  }
  renderPage([errorMock])
  await userEvent.type(getInput(), searchQuery)
  await act(
    () =>
      new Promise((resolve) => {
        setTimeout(resolve, 500)
      }),
  )
  expect(
    await screen.findByText(/something went wrong/i, {}, QUERY_TIMEOUT),
  ).toBeInTheDocument()
})

test("shows group filter options on the strain resource", () => {
  renderPage([], { entity: "strain" })
  expect(screen.getByText(ALL_STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText(REGULAR_STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText(GWDI_STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText(BACTERIAL_STRAINS_LABEL)).toBeInTheDocument()
})

test("filters results by group when a specific group is selected", async () => {
  const gwdiMock = {
    request: {
      query: SearchStocksDocument,
      variables: {
        query: searchQuery,
        limit: SEARCH_LIMIT,
        entity: StockEntityType.Strain,
      },
    },
    result: {
      data: {
        searchStocks: {
          totalCount: 1,
          limit: SEARCH_LIMIT,
          results: [
            {
              __typename: "StockSearchResult",
              id: "DBS0010",
              entity: StockEntityType.Strain,
              field: StockSearchFieldEnum.Label,
              display_text: "gwdiStrain",
              stock_label: "gwdiStrain",
              summary: "GWDI strain",
              score: 1,
              in_stock: true,
              stock_type: "gwdi",
            },
          ],
        },
      },
    },
  }
  renderPage([gwdiMock], { entity: "strain" })
  await userEvent.click(screen.getByText(GWDI_STRAINS_LABEL))
  await userEvent.type(getInput(), searchQuery)
  expect(
    await screen.findByText("gwdiStrain", {}, QUERY_TIMEOUT),
  ).toBeInTheDocument()
})

// ── Entity resource switching ────────────────────────────────────────────────

test("navigates to the strain resource when the Strains filter is selected", async () => {
  renderPage([], { entity: "all" })
  await userEvent.click(screen.getByRole("radio", { name: /^strains$/i }))
  expect(navigateMock).toHaveBeenCalledWith("/strains?group=all")
})

test("navigates to the plasmid resource when the Plasmids filter is selected", async () => {
  renderPage([], { entity: "all" })
  await userEvent.click(screen.getByRole("radio", { name: /^plasmids$/i }))
  expect(navigateMock).toHaveBeenCalledWith("/plasmids?group=all")
})

test("navigates to the catalog resource when All Results is selected", async () => {
  renderPage([], { entity: "strain" })
  await userEvent.click(screen.getByRole("radio", { name: /^all results$/i }))
  expect(navigateMock).toHaveBeenCalledWith("/catalog")
})

test("preserves the search term while resetting group when switching entities", async () => {
  renderPage([], {
    entity: "strain",
    initialEntries: [`/strains?q=${searchQuery}&group=gwdi`],
  })
  await userEvent.click(screen.getByRole("radio", { name: /^plasmids$/i }))
  expect(navigateMock).toHaveBeenCalledWith(
    `/plasmids?q=${searchQuery}&group=all`,
  )
})

test("does not navigate when the current entity is selected", async () => {
  renderPage([], { entity: "strain" })
  await userEvent.click(screen.getByRole("radio", { name: /^strains$/i }))
  expect(navigateMock).not.toHaveBeenCalled()
})

// ── Route-derived entity and default group selection ─────────────────────────

test("selects the Strains filter when rendered on the strain resource", () => {
  renderPage([], { entity: "strain" })
  expect(screen.getByRole("radio", { name: /^strains$/i })).toBeChecked()
})

test("selects the Plasmids filter when rendered on the plasmid resource", () => {
  renderPage([], { entity: "plasmid" })
  expect(screen.getByRole("radio", { name: /^plasmids$/i })).toBeChecked()
})

test("selects All Results when rendered on the catalog resource", () => {
  renderPage([], { entity: "all" })
  expect(screen.getByRole("radio", { name: /^all results$/i })).toBeChecked()
})

test("selects the All Strains group by default on the strain resource", () => {
  renderPage([], { entity: "strain" })
  expect(screen.getByRole("radio", { name: /^all strains$/i })).toBeChecked()
})

test("selects the All Plasmids group by default on the plasmid resource", () => {
  renderPage([], { entity: "plasmid" })
  expect(screen.getByRole("radio", { name: /^all plasmids$/i })).toBeChecked()
})

test("does not show any group options for the All Results entity", () => {
  renderPage([], { entity: "all" })
  expect(
    screen.queryByRole("radio", { name: /^all strains$/i }),
  ).not.toBeInTheDocument()
})

test("prefers an explicit group url param over the entity default", () => {
  renderPage([gwdiInitialMock], {
    entity: "strain",
    initialEntries: ["/strains?group=gwdi"],
  })

  expect(screen.getByRole("radio", { name: /^gwdi strains$/i })).toBeChecked()
  expect(
    screen.getByRole("radio", { name: /^all strains$/i }),
  ).not.toBeChecked()
})

// ── View switcher ────────────────────────────────────────────────────────────

test("renders the view switcher with list view active by default", () => {
  renderPage()
  expect(screen.getByRole("button", { name: /list view/i })).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  expect(screen.getByRole("button", { name: /table view/i })).toHaveAttribute(
    "aria-pressed",
    "false",
  )
})

test("toggles between list view and tabular view for search results", async () => {
  renderPage()
  await userEvent.type(getInput(), searchQuery)
  await screen.findByText("axeA", {}, QUERY_TIMEOUT)
  expect(screen.queryByRole("table")).not.toBeInTheDocument()

  await userEvent.click(screen.getByRole("button", { name: /table view/i }))
  expect(screen.getByRole("table")).toBeInTheDocument()
  expect(screen.getByRole("link", { name: "axeA" })).toHaveAttribute(
    "href",
    "/strains/DBS0001",
  )
  expect(screen.getByRole("link", { name: "pAXE1" })).toHaveAttribute(
    "href",
    "/plasmids/DBP0001",
  )

  await userEvent.click(screen.getByRole("button", { name: /list view/i }))
  expect(screen.queryByRole("table")).not.toBeInTheDocument()
  expect(screen.getByText("axeA")).toBeInTheDocument()
})
