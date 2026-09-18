import { vi, test, expect, beforeAll } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
// import { userEvent } from "@testing-library/user-event"
import { Navbar } from "../components/Navbar"
// import { Brand } from "../components/Brand"
// import { Dropdown } from "../components/Dropdown"
// import { Link } from "../components/Link"
// import { MenuIcon } from "../components/MenuIcon"

// const nativeEvent = { nativeEvent: { stopImmediatePropagation: () => {} } }
const testLink = "www.google.com"
const properties = {
  items: [
    {
      dropdown: true,
      title: "Dropdown 1",
      items: [
        {
          name: "Link 1",
          href: testLink,
        },
        {
          name: "Link 2",
          href: testLink,
        },
      ],
    },
    {
      dropdown: true,
      title: "Dropdown 2",
      items: [
        {
          name: "Link 1",
          href: testLink,
        },
        {
          name: "Link 2",
          href: "wwww.google.com",
        },
      ],
    },
    {
      dropdown: false,
      title: "Visible Link 1",
      href: testLink,
    },
    {
      dropdown: false,
      title: "Visible Link 2",
      href: testLink,
    },
    {
      element: <div> Arbitrary Element </div>,
    },
  ],
  brand: {
    title: "Brand",
    href: "google.com",
  },
  theme: {},
}
const mockSetOpen = vi.fn()

beforeAll(() => {
  vi.mock("react", async () => {
    const originalModule =
      await vi.importActual<typeof import("react")>("react")
    return {
      ...originalModule,
      useState: () => [false, mockSetOpen],
    }
  })
})

beforeEach(() => {
  render(<Navbar frontPageUrl="" stockCenterUrl="" {...properties} />)
})

test("should render a brand if one is specified", () => {
  expect(screen.getByText("Brand")).toBeInTheDocument()
})
test("should render the correct number of visible Links", () => {
  const visibleLinks = screen.getAllByRole("link", { name: /Visible Link/ })
  expect(visibleLinks).toHaveLength(2)
  expect(visibleLinks[0]).toBeVisible()
  expect(visibleLinks[1]).toBeVisible()
})
test("should render the correct number of dropdowns", () => {
  expect(screen.getAllByText(/dropdown/i)).toHaveLength(2)
})
test("should render arbitrary elements if they are provided", () => {
  expect(screen.getByText(/Arbitrary Element/)).toBeInTheDocument()
})

test("should not render brand when brand is not specified", () => {
  cleanup()
  render(
    <Navbar
      frontPageUrl=""
      stockCenterUrl=""
      items={properties.items}
      theme={{}}
    />,
  )
  expect(screen.queryByText("Brand")).not.toBeInTheDocument()
})

test("should render default items when items prop is not provided", () => {
  cleanup()
  render(
    <Navbar
      frontPageUrl="https://dictycr.org"
      stockCenterUrl="https://dictycr.org/stockcenter"
      brand={properties.brand}
      theme={{}}
    />,
  )
  expect(screen.getByText("Brand")).toBeInTheDocument()
})
