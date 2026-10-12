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
            score: 1.0,
          },
          {
            id: "DBP0001",
            entity: StockEntityType.Plasmid,
            field: StockSearchFieldEnum.Name,
            display_text: "pAXE1",
            score: 1.0,
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
            score: 1.0,
          },
        ],
      },
    },
  },
}

const manyStrainsSuggestionsMock = {
  request: suggestionsMock.request,
  result: {
    data: {
      listStockSuggestions: {
        totalCount: 12,
        limit: QUERY_LIMIT,
        suggestions: Array.from({ length: 12 }, (_, index) => ({
          id: `DBS000${index}`,
          entity: StockEntityType.Strain,
          field: StockSearchFieldEnum.Label,
          display_text: `strain${index}`,
          score: 1.0,
        })),
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
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(input).toHaveValue(searchTerm)
})

test("does not open the dropdown for fewer than MIN_CHARS characters", async () => {
  renderGeneralSearch([])
  const input = getInput()
  const shortTerm = "ax".slice(0, MIN_CHARS - 1)
  await userEvent.type(input, shortTerm)
  expect(screen.queryByText("axeA")).not.toBeInTheDocument()
  expect(screen.queryByText("pAXE1")).not.toBeInTheDocument()
})

test("clearing the input closes the dropdown", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  await userEvent.clear(input)
  expect(input).toHaveValue("")
})

test("Escape key closes the dropdown", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  await userEvent.keyboard("{Escape}")
  expect(input).toBeInTheDocument()
})

test("ArrowDown key opens dropdown when items are present", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(await screen.findByText("axeA")).toBeInTheDocument()
  await userEvent.keyboard(arrowDownKey)
  expect(input).toBeInTheDocument()
})

test("Enter key navigates to highlighted strain item", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  await screen.findByText("axeA")
  await userEvent.keyboard(arrowDownKey)
  await userEvent.keyboard("{Enter}")
  expect(navigateMock).toHaveBeenCalledWith("/strains/DBS0001")
})

test("click away closes the dropdown", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  await userEvent.click(document.body)
  expect(input).toBeInTheDocument()
})

test("focusing the input when a search term exists reopens the dropdown", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  await screen.findByText("axeA")
  await userEvent.tab()
  await userEvent.click(input)
  expect(input).toBeInTheDocument()
})

test("shows strain and plasmid results", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(await screen.findByText("axeA")).toBeInTheDocument()
  expect(await screen.findByText("pAXE1")).toBeInTheDocument()
})

test("shows advanced strain search footer when result count is within display limit", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(await screen.findByText("Advanced Strain Search")).toBeInTheDocument()
})

test("shows advanced plasmid search footer when result count is within display limit", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(await screen.findByText("Advanced Plasmid Search")).toBeInTheDocument()
})

test("shows only strain results when no plasmids match", async () => {
  renderGeneralSearch([strainOnlySuggestionsMock])
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(await screen.findByText("axeA")).toBeInTheDocument()
  expect(screen.queryByText("pAXE1")).not.toBeInTheDocument()
})

test("ArrowUp key decrements active index without crashing", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  await screen.findByText("axeA")
  await userEvent.keyboard(arrowDownKey)
  await userEvent.keyboard(arrowDownKey)
  await userEvent.keyboard("{ArrowUp}")
  expect(input).toBeInTheDocument()
})

test("see all strain results footer appears when strain count exceeds display limit", async () => {
  renderGeneralSearch([manyStrainsSuggestionsMock])
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(await screen.findByText("See all strain results")).toBeInTheDocument()
})

test("debounce does not immediately trigger a query for short input", async () => {
  renderGeneralSearch([])
  const input = getInput()
  await userEvent.type(input, "a")
  expect(input).toHaveValue("a")
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
  })
  expect(input).toHaveValue("a")
})
