import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { Provider, createStore } from "jotai"
import { MockedProvider } from "@apollo/client/testing"
import { createTheme } from "@mui/material/styles"
import { indigo } from "@mui/material/colors"
import { vi, test, expect, beforeEach } from "vitest"
import { pipe } from "fp-ts/function"
import { reduceWithIndex as AreduceWithIndex } from "fp-ts/Array"
import { match as Bmatch } from "fp-ts/boolean"
import {
  ListStockSuggestionsDocument,
  StockEntityType,
  StockSearchFieldEnum,
} from "dicty-graphql-schema"
import { dictyThemeV5, nordicThemeV5 } from "@dictybase/ui-common"
import { DscNavbar, authButtonSx } from "../components/DscNavbar"
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
    screen.getByRole("navigation", { name: /^explore$/i }),
  ).toBeInTheDocument()
})

test("renders the Research menu button", () => {
  renderComponent()
  expect(
    screen.getByRole("navigation", { name: /^research$/i }),
  ).toBeInTheDocument()
})

test("renders the Dicty Stock Center menu button", () => {
  renderComponent()
  expect(
    screen.getByRole("navigation", { name: /^dicty stock center$/i }),
  ).toBeInTheDocument()
})

test("renders the Community menu button", () => {
  renderComponent()
  expect(
    screen.getByRole("navigation", { name: /^community$/i }),
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

// ── Authentication ────────────────────────────────────────────────────────────

test("renders the login button when authentication is enabled", () => {
  renderComponent()
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument()
})

/** Offsets of the red, green and blue channels inside a `#rrggbb` string. */
const CHANNEL_OFFSETS = [1, 3, 5]

/** WCAG relative-luminance weights of the red, green and blue channels. */
const LUMINANCE_WEIGHTS = [0.2126, 0.7152, 0.0722]

/** Minimum contrast ratio WCAG AA requires for normal-size text. */
const MIN_CONTRAST_RATIO = 4.5

/** Length of a hexadecimal colour written in its `#rgb` shorthand form. */
const SHORT_HEX_LENGTH = 4

/**
 * Expands a `#rgb` shorthand colour into its equivalent `#rrggbb` form.
 *
 * @param hex - A three- or six-digit hexadecimal colour, e.g. `#fff`.
 * @returns The colour in six-digit form, e.g. `#ffffff`.
 */
const expandHex = (hex: string): string =>
  pipe(
    hex.length === SHORT_HEX_LENGTH,
    Bmatch(
      () => hex,
      () => `#${hex.slice(1).replaceAll(/./g, (channel) => channel.repeat(2))}`,
    ),
  )

/**
 * Converts an sRGB colour channel to its linear-light value.
 *
 * @param channel - The channel value, normalized to the 0-1 range.
 * @returns The linear-light value of the channel.
 */
const linearizeChannel = (channel: number): number =>
  pipe(
    channel <= 0.039_28,
    Bmatch(
      () => ((channel + 0.055) / 1.055) ** 2.4,
      () => channel / 12.92,
    ),
  )

/**
 * Computes the WCAG relative luminance of a colour.
 *
 * @param hex - A three- or six-digit hexadecimal colour, e.g. `#e5e9f0`.
 * @returns The relative luminance, between 0 (black) and 1 (white).
 */
const relativeLuminance = (hex: string): number => {
  const expanded = expandHex(hex)
  return pipe(
    CHANNEL_OFFSETS,
    AreduceWithIndex(
      0,
      (index, sum, offset) =>
        sum +
        pipe(
          Number.parseInt(expanded.slice(offset, offset + 2), 16) / 255,
          linearizeChannel,
        ) *
          LUMINANCE_WEIGHTS[index],
    ),
  )
}

/**
 * Computes the WCAG contrast ratio between two colours.
 *
 * @param foreground - The six-digit hexadecimal colour of the text.
 * @param background - The six-digit hexadecimal colour behind the text.
 * @returns The contrast ratio, between 1 (identical colours) and 21.
 */
const contrastRatio = (foreground: string, background: string): number => {
  const luminances = [
    relativeLuminance(foreground),
    relativeLuminance(background),
  ].sort((first, second) => second - first)
  const [lighter, darker] = luminances
  return (lighter + 0.05) / (darker + 0.05)
}

test("takes the auth button colour from the theme's primary contrast text", () => {
  const theme = createTheme({
    palette: { primary: { main: indigo[50], contrastText: "#2e3440" } },
  })
  expect(authButtonSx(theme)["& button"].color).toBe(
    theme.palette.primary.contrastText,
  )
})

test("keeps the auth button readable on the light nordic navbar", () => {
  expect(
    contrastRatio(
      authButtonSx(nordicThemeV5)["& button"].color,
      nordicThemeV5.palette.primary.dark,
    ),
  ).toBeGreaterThanOrEqual(MIN_CONTRAST_RATIO)
})

test("keeps the auth button readable on the dark dicty navbar", () => {
  expect(
    contrastRatio(
      authButtonSx(dictyThemeV5)["& button"].color,
      dictyThemeV5.palette.primary.dark,
    ),
  ).toBeGreaterThanOrEqual(MIN_CONTRAST_RATIO)
})

// ── Dicty Stock Center menu contents ──────────────────────────────────────────

/**
 * Opens the "Dicty Stock Center" dropdown so its links can be inspected.
 */
const openStockCenterMenu = async () => {
  const user = userEvent.setup()
  renderComponent()
  await user.hover(
    screen.getByRole("navigation", { name: /^dicty stock center$/i }),
  )
}

test("links the Standard Operating Procedures item to the internal SOP page", async () => {
  await openStockCenterMenu()
  expect(
    screen.getByRole("link", { name: /standard operating procedures/i }),
  ).toHaveAttribute("href", expect.stringContaining("/information/sop/show"))
})

test("links the Strains catalog item to the catalog page filtered by strains", async () => {
  await openStockCenterMenu()
  expect(screen.getByRole("link", { name: /^strains$/i })).toHaveAttribute(
    "href",
    expect.stringContaining("/catalog?entity=strain"),
  )
})

test("links the Plasmids catalog item to the catalog page filtered by plasmids", async () => {
  await openStockCenterMenu()
  expect(screen.getByRole("link", { name: /^plasmids$/i })).toHaveAttribute(
    "href",
    expect.stringContaining("/catalog?entity=plasmid"),
  )
})

test("links the Full Catalog item to the catalog page", async () => {
  await openStockCenterMenu()
  expect(screen.getByRole("link", { name: /full catalog/i })).toHaveAttribute(
    "href",
    expect.stringContaining("/catalog"),
  )
})
