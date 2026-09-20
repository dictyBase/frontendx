import { vi, test, expect, beforeAll } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { createTheme } from "@mui/material"
import { Navbar } from "../components/Navbar"

const testTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#000000",
    },
  },
})

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
  theme: testTheme,
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
      theme={testTheme}
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
      theme={testTheme}
    />,
  )
  expect(screen.getByText("Brand")).toBeInTheDocument()
})

test("toggle button opens the menu when clicked", async () => {
  cleanup()
  vi.restoreAllMocks()
  render(<Navbar frontPageUrl="" stockCenterUrl="" {...properties} />)
  const user = userEvent.setup()
  const toggle = screen.getByRole("button", { hidden: true })
  await user.click(toggle)
  expect(toggle).toBeInTheDocument()
})

test("toggle button closes the menu when clicked while open", async () => {
  cleanup()
  vi.restoreAllMocks()
  render(<Navbar frontPageUrl="" stockCenterUrl="" {...properties} />)
  const user = userEvent.setup()
  const toggle = screen.getByRole("button", { hidden: true })
  await user.click(toggle)
  await user.click(toggle)
  expect(toggle).toBeInTheDocument()
})

test("clicking outside the navbar closes the menu", async () => {
  cleanup()
  vi.restoreAllMocks()
  render(
    <div>
      <Navbar frontPageUrl="" stockCenterUrl="" {...properties} />
      <button type="button">Outside</button>
    </div>,
  )
  const user = userEvent.setup()
  const toggle = screen.getByRole("button", { hidden: true, name: "" })
  await user.click(toggle)
  await user.click(screen.getByRole("button", { name: "Outside" }))
  expect(toggle).toBeInTheDocument()
})

test("transitionend event on container is handled when open", async () => {
  cleanup()
  vi.restoreAllMocks()
  const { container } = render(
    <Navbar frontPageUrl="" stockCenterUrl="" {...properties} />,
  )
  const user = userEvent.setup()
  const toggle = screen.getByRole("button", { hidden: true })
  await user.click(toggle)
  const containerElement = container.firstChild as HTMLElement
  fireEvent.transitionEnd(containerElement, { propertyName: "height" })
  expect(containerElement).toBeInTheDocument()
})
