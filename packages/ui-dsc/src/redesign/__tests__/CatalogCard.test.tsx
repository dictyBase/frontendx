import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { expect, test } from "vitest"
import { CatalogCard } from "../CatalogCard"

const defaultProperties = {
  icon: "🧬",
  title: "Test Catalog",
  description: "Test description for catalog",
  href: "/catalog",
}

test("renders CatalogCard with icon", () => {
  render(
    <MemoryRouter>
      <CatalogCard {...defaultProperties} />
    </MemoryRouter>,
  )
  expect(screen.getByText("🧬")).toBeInTheDocument()
})

test("renders CatalogCard with title", () => {
  render(
    <MemoryRouter>
      <CatalogCard {...defaultProperties} />
    </MemoryRouter>,
  )
  expect(screen.getByText("Test Catalog")).toBeInTheDocument()
})

test("renders CatalogCard with description", () => {
  render(
    <MemoryRouter>
      <CatalogCard {...defaultProperties} />
    </MemoryRouter>,
  )
  expect(screen.getByText("Test description for catalog")).toBeInTheDocument()
})

test("renders default link text", () => {
  render(
    <MemoryRouter>
      <CatalogCard {...defaultProperties} />
    </MemoryRouter>,
  )
  expect(screen.getByText("Explore →")).toBeInTheDocument()
})

test("renders custom link text", () => {
  render(
    <MemoryRouter>
      <CatalogCard {...defaultProperties} linkText="View More" />
    </MemoryRouter>,
  )
  expect(screen.getByText("View More")).toBeInTheDocument()
})

test("renders link with correct href", () => {
  render(
    <MemoryRouter>
      <CatalogCard {...defaultProperties} />
    </MemoryRouter>,
  )
  const link = screen.getByRole("link")
  expect(link).toHaveAttribute("href", "/catalog")
})

test("applies custom sx styles", () => {
  const { container } = render(
    <MemoryRouter>
      <CatalogCard {...defaultProperties} sx={{ backgroundColor: "red" }} />
    </MemoryRouter>,
  )
  const card = container.querySelector(".MuiCard-root")
  expect(card).toHaveStyle({ backgroundColor: "red" })
})
