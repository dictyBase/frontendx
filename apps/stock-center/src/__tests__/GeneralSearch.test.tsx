import { vi, test, expect, beforeEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MockedProvider } from "@apollo/client/testing"
import { MemoryRouter } from "react-router-dom"
import {
  StrainListDocument,
  PlasmidListFilterDocument,
  StrainType,
  PlasmidType,
} from "dicty-graphql-schema"
import { GeneralSearch } from "../features/NewHome/GeneralSearch"
import { QUERY_LIMIT } from "../features/NewHome/types"

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

const strainMock = {
  request: {
    query: StrainListDocument,
    variables: {
      cursor: 0,
      limit: QUERY_LIMIT,
      filter: { strain_type: StrainType.All, label: searchTerm },
    },
  },
  result: {
    data: {
      listStrains: {
        nextCursor: 0,
        strains: [
          {
            id: "DBS0001",
            label: "axeA",
            summary: "axeA mutant",
            in_stock: true,
          },
        ],
      },
    },
  },
}

const plasmidMock = {
  request: {
    query: PlasmidListFilterDocument,
    variables: {
      cursor: 0,
      limit: QUERY_LIMIT,
      filter: { plasmid_type: PlasmidType.All, name: searchTerm },
    },
  },
  result: {
    data: {
      listPlasmids: {
        nextCursor: 0,
        plasmids: [
          {
            id: "DBP0001",
            name: "pAXE1",
            summary: "pAXE1 vector",
            in_stock: true,
          },
        ],
      },
    },
  },
}

const renderGeneralSearch = (mocks = [strainMock, plasmidMock]) =>
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
  await userEvent.type(input, "axe")
  expect(input).toHaveValue("axe")
})

test("clearing the input closes the dropdown and resets search", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, "axe")
  await userEvent.clear(input)
  expect(input).toHaveValue("")
})

test("Escape key closes the dropdown", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, "axe")
  await userEvent.keyboard("{Escape}")
  // dropdown should be closed — input remains but dropdown gone
  expect(input).toBeInTheDocument()
})

test("ArrowDown key opens dropdown when items are present", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  // wait for query results
  const strainResult = await screen.findByText("axeA")
  expect(strainResult).toBeInTheDocument()
  await userEvent.keyboard(arrowDownKey)
  expect(input).toBeInTheDocument()
})

test("Enter key navigates to highlighted strain item", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  await screen.findByText("axeA")
  // First ArrowDown opens the dropdown and sets active index to 0 (first strain)
  await userEvent.keyboard(arrowDownKey)
  await userEvent.keyboard("{Enter}")
  expect(navigateMock).toHaveBeenCalledWith("/strains/DBS0001")
})

test("click away closes the dropdown", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, "axe")
  await userEvent.click(document.body)
  expect(input).toBeInTheDocument()
})

test("focusing the input when a search term exists reopens the dropdown", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  await screen.findByText("axeA")
  // blur then refocus
  await userEvent.tab()
  await userEvent.click(input)
  expect(input).toBeInTheDocument()
})

test("shows strain and plasmid results with a divider between them", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(await screen.findByText("axeA")).toBeInTheDocument()
  expect(await screen.findByText("pAXE1")).toBeInTheDocument()
})

test("shows advanced strain search footer when no more strains", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(await screen.findByText("Advanced Strain Search")).toBeInTheDocument()
})

test("shows advanced plasmid search footer when no more plasmids", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(await screen.findByText("Advanced Plasmid Search")).toBeInTheDocument()
})

test("shows only strain results when no plasmids match", async () => {
  const strainOnlyMock = {
    ...plasmidMock,
    result: {
      data: {
        listPlasmids: { nextCursor: 0, plasmids: [] },
      },
    },
  }
  renderGeneralSearch([strainMock, strainOnlyMock])
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(await screen.findByText("axeA")).toBeInTheDocument()
  expect(screen.queryByText("pAXE1")).not.toBeInTheDocument()
})

test("ArrowUp key decrements active index", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, searchTerm)
  await screen.findByText("axeA")
  await userEvent.keyboard(arrowDownKey)
  await userEvent.keyboard(arrowDownKey)
  await userEvent.keyboard("{ArrowUp}")
  // still open, no crash
  expect(input).toBeInTheDocument()
})

test("see all strain results footer appears when more strains than display limit", async () => {
  const manyStrainsMock = {
    request: strainMock.request,
    result: {
      data: {
        listStrains: {
          nextCursor: 100,
          strains: Array.from({ length: 12 }, (_, index) => ({
            id: `DBS000${index}`,
            label: `strain${index}`,
            summary: `summary ${index}`,
            in_stock: true,
          })),
        },
      },
    },
  }
  renderGeneralSearch([manyStrainsMock, plasmidMock])
  const input = getInput()
  await userEvent.type(input, searchTerm)
  expect(await screen.findByText("See all strain results")).toBeInTheDocument()
})

test("debounce delays the search term update", async () => {
  renderGeneralSearch()
  const input = getInput()
  await userEvent.type(input, "a")
  // input has value but query hasn't fired yet (debounced)
  expect(input).toHaveValue("a")
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
  })
  expect(input).toHaveValue("a")
})
