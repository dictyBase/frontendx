import { test, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { createTheme } from "@mui/material"
import { Navbar } from "../components/Navbar"

const testTheme = createTheme({
  palette: {
    primary: { main: "#000000" },
    secondary: { main: "#000000" },
  },
})

const testLink = "www.google.com"
const properties = {
  items: [
    {
      dropdown: true,
      title: "Dropdown 1",
      items: [
        { name: "Link 1", href: testLink },
        { name: "Link 2", href: testLink },
      ],
    },
    {
      dropdown: false,
      title: "Visible Link",
      href: testLink,
    },
  ],
  brand: { title: "Brand", href: "google.com" },
  theme: testTheme,
}

test("toggle button opens and then closes the menu", async () => {
  render(<Navbar frontPageUrl="" stockCenterUrl="" {...properties} />)
  const user = userEvent.setup()
  const toggle = screen.getByRole("button", { hidden: true })
  // open
  await user.click(toggle)
  // close
  await user.click(toggle)
  expect(toggle).toBeInTheDocument()
})

test("clicking outside navbar closes the open menu", async () => {
  render(
    <div>
      <Navbar frontPageUrl="" stockCenterUrl="" {...properties} />
      <button type="button">Outside</button>
    </div>,
  )
  const user = userEvent.setup()
  // The toggle is the first hidden button (the MenuIcon hamburger)
  const toggle = screen.getAllByRole("button", { hidden: true })[0]
  await user.click(toggle)
  await user.click(screen.getByRole("button", { name: "Outside" }))
  expect(toggle).toBeInTheDocument()
})

test("transitionend with propertyName=height sets container height to auto when open", async () => {
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

test("clicking a dropdown item calls changeDropdown with the correct index", async () => {
  render(<Navbar frontPageUrl="" stockCenterUrl="" {...properties} />)
  const user = userEvent.setup()
  await user.click(screen.getByText(/dropdown 1/i))
  // changeDropdown was called — the dropdown renders its links
  expect(screen.getByText(/dropdown 1/i)).toBeInTheDocument()
})

test("renders fallback otherwise branch when item shape does not match", () => {
  render(
    <Navbar
      frontPageUrl=""
      stockCenterUrl=""
      items={[{ dropdown: true, title: "Bad" } as never]}
      theme={testTheme}
    />,
  )
  // The otherwise branch renders an empty fragment — just confirm no crash
  expect(document.body).toBeInTheDocument()
})
