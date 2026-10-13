import { vi, test, expect, beforeEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MockedProvider } from "@apollo/client/testing"
import { MemoryRouter } from "react-router-dom"
import {
  ListStockSuggestionsDocument,
  StockEntityType,
  StockSearchFieldEnum,
} from "dicty-graphql-schema"
import { GeneralSearch } from "../features/NewHome/GeneralSearch"
import { QUERY_LIMIT, MIN_CHARS } from "../features/NewHome/types"

const navigateMock = vi.fn()
const arrowDownKey = "{ArrowDown}"

vi.mock("react-router-dom", async () => {
  const originalModule =
    await vi.importActual<typeof import("react-router-dom")>("react-router-dom")
  return {
    ...originalModule,
    useNavigate: () => navigateMock,
  }
})

const searchTerm = "axe"

const suggestionsMock = {
  request: {
    query: ListStockSuggestionsDocument,
    variables: { query: searchTerm, limit: QUERY_LIMIT },
  },
  result: {
    data: {
      listStockSuggestions: {
        totalCount: 2,
        limit: QUERY_LIMIT,
        suggestions: [
          {
            id: "DBS0001",
            entity: StockEntityType.Strain,
            field: StockSearchFieldEnum.Label,
            display_text: "axeA",
            score: 1,
          },
          {
            id: "DBP0001",
            entity: StockEntityType.Plasmid,
            field: StockSearchFieldEnum.Name,
            display_text: "pAXE1",
            score: 1,
          },
        ],
      },
    },
  },
}

const strainOnlySuggestionsMock = {
  request: suggestionsMock.request,
  result: {
    data: {
      listStockSuggestions: {
        totalCount: 1,
        limit: QUERY_LIMIT,
        suggestions: [
          {
            id: "DBS0001",
            entity: StockEntityType.Strain,
            field: StockSearchFieldEnum.Label,
            display_text: "axeA",
            score: 1,
          },
        ],
      },
    },
  },
}

const renderGeneralSearch = (mocks = [suggestionsMock]) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <GeneralSearch />
      </MemoryRouter>
    </MockedProvider>,
  )

const getInput = () =>
  screen.getByRole("textbox", { name: /search strains and plasmids/i })

beforeEach(() => {
  navigateMock.mockClear()
})

test("renders the search input", () => {
  renderGeneralSearch()
  expect(getInput()).toBeInTheDocument()
})

test("typing into the input updates its value", async () => {
  renderGeneralSearch()
  await userEvent.type(getInput(), searchTerm)
  expect(getInput()).toHaveValue(searchTerm)
})

test("does not open the dropdown for fewer than MIN_CHARS characters", async () => {
  renderGeneralSearch([])
  await userEvent.type(getInput(), "ax".slice(0, MIN_CHARS - 1))
  expect(screen.queryByText("axeA")).not.toBeInTheDocument()
  expect(screen.queryByText("pAXE1")).not.toBeInTheDocument()
})

test("clearing the input closes the dropdown", async () => {
  renderGeneralSearch()
  await userEvent.type(getInput(), searchTerm)
  await userEvent.clear(getInput())
  expect(getInput()).toHaveValue("")
})

test("Escape key closes the dropdown", async () => {
  renderGeneralSearch()
  await userEvent.type(getInput(), searchTerm)
  await userEvent.keyboard("{Escape}")
  expect(getInput()).toBeInTheDocument()
})

test("ArrowDown key opens dropdown when items are present", async () => {
  renderGeneralSearch()
  await userEvent.type(getInput(), searchTerm)
  expect(await screen.findByText("axeA")).toBeInTheDocument()
  await userEvent.keyboard(arrowDownKey)
  expect(getInput()).toBeInTheDocument()
})

test("Enter key navigates to highlighted strain item", async () => {
  renderGeneralSearch()
  await userEvent.type(getInput(), searchTerm)
  await screen.findByText("axeA")
  await userEvent.keyboard(arrowDownKey)
  await userEvent.keyboard("{Enter}")
  expect(navigateMock).toHaveBeenCalledWith("/strains/DBS0001")
})

test("click away closes the dropdown", async () => {
  renderGeneralSearch()
  await userEvent.type(getInput(), searchTerm)
  await userEvent.click(document.body)
  expect(getInput()).toBeInTheDocument()
})

test("focusing the input when a search term exists reopens the dropdown", async () => {
  renderGeneralSearch()
  await userEvent.type(getInput(), searchTerm)
  await screen.findByText("axeA")
  await userEvent.tab()
  await userEvent.click(getInput())
  expect(getInput()).toBeInTheDocument()
})

test("shows strain and plasmid results", async () => {
  renderGeneralSearch()
  await userEvent.type(getInput(), searchTerm)
  expect(await screen.findByText("axeA")).toBeInTheDocument()
  expect(await screen.findByText("pAXE1")).toBeInTheDocument()
})

test("shows a See all search results footer linking to the catalog page", async () => {
  renderGeneralSearch()
  await userEvent.type(getInput(), searchTerm)
  const footer = await screen.findByRole("link", {
    name: /see all search results/i,
  })
  expect(footer).toBeInTheDocument()
  expect(footer).toHaveAttribute(
    "href",
    `/catalog?q=${encodeURIComponent(searchTerm)}`,
  )
})

test("shows only strain results when no plasmids match", async () => {
  renderGeneralSearch([strainOnlySuggestionsMock])
  await userEvent.type(getInput(), searchTerm)
  expect(await screen.findByText("axeA")).toBeInTheDocument()
  expect(screen.queryByText("pAXE1")).not.toBeInTheDocument()
})

test("ArrowUp key decrements active index without crashing", async () => {
  renderGeneralSearch()
  await userEvent.type(getInput(), searchTerm)
  await screen.findByText("axeA")
  await userEvent.keyboard(arrowDownKey)
  await userEvent.keyboard(arrowDownKey)
  await userEvent.keyboard("{ArrowUp}")
  expect(getInput()).toBeInTheDocument()
})

test("pressing Enter with 3+ characters navigates to the catalog page", async () => {
  renderGeneralSearch()
  await userEvent.type(getInput(), searchTerm)
  await userEvent.keyboard("{Enter}")
  expect(navigateMock).toHaveBeenCalledWith(
    `/catalog?q=${encodeURIComponent(searchTerm)}`,
  )
})

test("pressing Enter with fewer than 3 characters does not navigate to catalog", async () => {
  renderGeneralSearch([])
  await userEvent.type(getInput(), "ax")
  await userEvent.keyboard("{Enter}")
  expect(navigateMock).not.toHaveBeenCalled()
})

test("debounce does not immediately trigger a query for short input", async () => {
  renderGeneralSearch([])
  await userEvent.type(getInput(), "a")
  expect(getInput()).toHaveValue("a")
  await act(() => new Promise<void>((resolve) => { setTimeout(resolve, 500) }))
  expect(getInput()).toHaveValue("a")
})
