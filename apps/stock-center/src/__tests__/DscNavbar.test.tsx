import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { Provider, createStore } from "jotai"
import { MockedProvider } from "@apollo/client/testing"
import { vi, test, expect, beforeEach } from "vitest"
import {
  ListStockSuggestionsDocument,
  StockEntityType,
  StockSearchFieldEnum,
} from "dicty-graphql-schema"
import { DscNavbar } from "../components/DscNavbar"
import { cartAtom } from "../cartState"
import { QUERY_LIMIT } from "../features/NewHome/types"
import type { StrainCartItem } from "../types"

const navigateMock = vi.fn()

vi.mock("react-router-dom", async () => {
  const original =
    await vi.importActual<typeof import("react-router-dom")>("react-router-dom")
  return { ...original, useNavigate: () => navigateMock }
})

/** Minimal strain cart item used to seed the cart atom in tests. */
const mockStrainItem: StrainCartItem = {
  __typename: "Strain",
  id: "DBS0001",
  label: "testStrain",
  summary: "A test strain",
  in_stock: true,
  fee: 10,
}

/**
 * Renders DscNavbar at the given path inside the minimal router and provider
 * tree required by the component. MockedProvider with no mocks is sufficient
 * because NavbarSearch's Apollo query is lazy and never fires on mount.
 */
const renderOnPath = (path: string, store = createStore()) =>
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <MemoryRouter initialEntries={[path]}>
        <Provider store={store}>
          <Routes>
            <Route element={<DscNavbar />}>
              <Route path="*" element={<></>} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    </MockedProvider>,
  )

const renderComponent = (store = createStore()) => renderOnPath("/", store)

beforeEach(() => {
  navigateMock.mockClear()
})

// ── Presence ────────────────────────────────────────────────────────────────

test("renders the logo brand button", () => {
  renderComponent()
  expect(screen.getByRole("button", { name: /logo/i })).toBeInTheDocument()
})

test("renders the Explore menu button", () => {
  renderComponent()
  expect(
    screen.getByRole("button", { name: /^explore$/i }),
  ).toBeInTheDocument()
})

test("renders the Research menu button", () => {
  renderComponent()
  expect(
    screen.getByRole("button", { name: /^research$/i }),
  ).toBeInTheDocument()
})

test("renders the Dicty Stock Center menu button", () => {
  renderComponent()
  expect(
    screen.getByRole("button", { name: /^dicty stock center$/i }),
  ).toBeInTheDocument()
})

test("renders the Community menu button", () => {
  renderComponent()
  expect(
    screen.getByRole("button", { name: /^community$/i }),
  ).toBeInTheDocument()
})

test("renders the cart button", () => {
  renderComponent()
  expect(screen.getByRole("button", { name: /cart/i })).toBeInTheDocument()
})

// ── Navigation ───────────────────────────────────────────────────────────────

test("navigates home when the logo button is clicked", async () => {
  const user = userEvent.setup()
  renderComponent()

  await user.click(screen.getByRole("button", { name: /logo/i }))

  expect(navigateMock).toHaveBeenCalledWith("/")
})

test("navigates to /cart when the cart button is clicked", async () => {
  const user = userEvent.setup()
  renderComponent()

  await user.click(screen.getByRole("button", { name: /cart/i }))

  expect(navigateMock).toHaveBeenCalledWith("/cart")
})

// ── Contextual search visibility ─────────────────────────────────────────────

test("does not render the search input on the home page", () => {
  renderOnPath("/")
  expect(
    screen.queryByRole("textbox", { name: /search strains and plasmids/i }),
  ).not.toBeInTheDocument()
})

test("does not render the search input on the catalog page", () => {
  renderOnPath("/catalog")
  expect(
    screen.queryByRole("textbox", { name: /search strains and plasmids/i }),
  ).not.toBeInTheDocument()
})

test("renders the search input on the strains page", () => {
  renderOnPath("/strains")
  expect(
    screen.getByRole("textbox", { name: /search strains and plasmids/i }),
  ).toBeInTheDocument()
})

test("renders the search input on the payment information page", () => {
  renderOnPath("/information/payment")
  expect(
    screen.getByRole("textbox", { name: /search strains and plasmids/i }),
  ).toBeInTheDocument()
})

// ── Search backdrop ──────────────────────────────────────────────────────────

const navSearchTerm = "axe"

const navSuggestionsMock = {
  request: {
    query: ListStockSuggestionsDocument,
    variables: { query: navSearchTerm, limit: QUERY_LIMIT },
  },
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

const navbarSearchTestId = "navbar-search-backdrop"

test("search backdrop is present on pages that show the navbar search", () => {
  renderOnPath("/strains")
  expect(screen.getByTestId(navbarSearchTestId)).toBeInTheDocument()
})

test("search backdrop is not present on the home page", () => {
  renderOnPath("/")
  expect(screen.queryByTestId(navbarSearchTestId)).not.toBeInTheDocument()
})

test("search backdrop is not present on the catalog page", () => {
  renderOnPath("/catalog")
  expect(screen.queryByTestId(navbarSearchTestId)).not.toBeInTheDocument()
})

test("clicking the backdrop closes the search dropdown", async () => {
  const user = userEvent.setup()
  render(
    <MockedProvider mocks={[navSuggestionsMock]} addTypename={false}>
      <MemoryRouter initialEntries={["/strains"]}>
        <Provider store={createStore()}>
          <Routes>
            <Route element={<DscNavbar />}>
              <Route path="*" element={<></>} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    </MockedProvider>,
  )

  await user.type(
    screen.getByRole("textbox", { name: /search strains and plasmids/i }),
    navSearchTerm,
  )
  expect(await screen.findByText("axeA")).toBeInTheDocument()

  await user.click(screen.getByTestId(navbarSearchTestId))
  expect(screen.queryByText("axeA")).not.toBeInTheDocument()
})

// ── Cart badge ────────────────────────────────────────────────────────────────

test("cart aria-label uses plural 'items' when the cart is empty", () => {
  renderComponent()
  expect(
    screen.getByRole("button", { name: "Cart, 0 items" }),
  ).toBeInTheDocument()
})

test("cart aria-label uses singular 'item' when there is one item", () => {
  const store = createStore()
  store.set(cartAtom, {
    strainItems: [mockStrainItem],
    plasmidItems: [],
    maxItems: 12,
  })
  renderComponent(store)

  expect(
    screen.getByRole("button", { name: "Cart, 1 item" }),
  ).toBeInTheDocument()
})

test("cart aria-label reflects the total number of items in the cart", () => {
  const store = createStore()
  store.set(cartAtom, {
    strainItems: [mockStrainItem, { ...mockStrainItem, id: "DBS0002" }],
    plasmidItems: [],
    maxItems: 12,
  })
  renderComponent(store)

  expect(
    screen.getByRole("button", { name: "Cart, 2 items" }),
  ).toBeInTheDocument()
})
