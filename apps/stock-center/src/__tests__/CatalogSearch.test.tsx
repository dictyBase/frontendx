import { vi, test, expect, beforeEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MockedProvider } from "@apollo/client/testing"
import { MemoryRouter } from "react-router-dom"
import { Provider, createStore } from "jotai"
import {
  SearchStocksDocument,
  StockEntityType,
  StockSearchFieldEnum,
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

/** Creates a fresh Jotai store with an empty cart for each test. */
const makeStore = () => {
  const store = createStore()
  store.set(cartAtom, { strainItems: [], plasmidItems: [], maxItems: 12 })
  return store
}

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
            strain_label: "axeA",
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
            strain_label: "",
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
            strain_label: "axeA",
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
            strain_label: "unavailableStrain",
            summary: "Currently out of stock",
            score: 1,
            in_stock: false,
          },
        ],
      },
    },
  },
}

const renderPage = (
  mocks: any[] = [suggestionsMock],
  initialEntries = ["/catalog"],
) =>
  render(
    <Provider store={makeStore()}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={initialEntries}>
          <CatalogSearch />
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

test("renders the search input", () => {
  renderPage()
  expect(getInput()).toBeInTheDocument()
})

test("shows the search prompt before any input is entered", () => {
  renderPage()
  expect(screen.getByText(/search the catalog/i)).toBeInTheDocument()
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

test("links strain result to its detail page", async () => {
  renderPage()
  await userEvent.type(getInput(), searchQuery)
  const link = await screen.findByRole("link", { name: "axeA" }, QUERY_TIMEOUT)
  expect(link).toHaveAttribute("href", "/strains/DBS0001")
})

test("links plasmid result to its detail page", async () => {
  renderPage()
  await userEvent.type(getInput(), searchQuery)
  const link = await screen.findByRole("link", { name: "pAXE1" }, QUERY_TIMEOUT)
  expect(link).toHaveAttribute("href", "/plasmids/DBP0001")
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

test("renders the Stock Type sidebar", () => {
  renderPage()
  expect(screen.getByText("Stock Type")).toBeInTheDocument()
})

test("renders All Results, Strains, and Plasmids filter options", () => {
  renderPage()
  expect(screen.getByText("All Results")).toBeInTheDocument()
  expect(screen.getByText("Strains")).toBeInTheDocument()
  expect(screen.getByText("Plasmids")).toBeInTheDocument()
})

test("sends the Strain entity type when the Strains filter is selected", async () => {
  renderPage([strainOnlyMock])
  await userEvent.click(screen.getByText("Strains"))
  await userEvent.type(getInput(), searchQuery)
  expect(await screen.findByText("axeA")).toBeInTheDocument()
  expect(screen.queryByText("pAXE1")).not.toBeInTheDocument()
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
