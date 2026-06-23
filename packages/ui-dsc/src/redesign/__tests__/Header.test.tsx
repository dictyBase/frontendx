import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { Header } from "../Header"

const mockNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

test("renders Header with logo", () => {
  render(<Header navigation={mockNavigation} />)
  expect(screen.getByText("DSC")).toBeInTheDocument()
})

test("renders logo with default href", () => {
  render(<Header navigation={mockNavigation} />)
  const logo = screen.getByText("DSC")
  expect(logo).toHaveAttribute("href", "/")
})

test("renders logo with custom href", () => {
  render(<Header navigation={mockNavigation} logoHref="/custom" />)
  const logo = screen.getByText("DSC")
  expect(logo).toHaveAttribute("href", "/custom")
})

test("renders all navigation items", () => {
  render(<Header navigation={mockNavigation} />)
  expect(screen.getByText("Home")).toBeInTheDocument()
  expect(screen.getByText("About")).toBeInTheDocument()
  expect(screen.getByText("Contact")).toBeInTheDocument()
})

test("navigation items have correct hrefs", () => {
  render(<Header navigation={mockNavigation} />)
  const homeButton = screen.getByText("Home").closest("a")
  const aboutButton = screen.getByText("About").closest("a")
  const contactButton = screen.getByText("Contact").closest("a")

  expect(homeButton).toHaveAttribute("href", "/")
  expect(aboutButton).toHaveAttribute("href", "/about")
  expect(contactButton).toHaveAttribute("href", "/contact")
})

test("applies custom sx styles", () => {
  const { container } = render(
    <Header navigation={mockNavigation} sx={{ backgroundColor: "green" }} />,
  )
  const appBar = container.querySelector(".MuiAppBar-root")
  expect(appBar).toHaveStyle({ backgroundColor: "green" })
})
