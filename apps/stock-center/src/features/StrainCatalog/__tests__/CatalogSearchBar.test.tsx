import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { StrainType } from "dicty-graphql-schema"
import { expect, test, vi } from "vitest"
import { CatalogSearchBar } from "../components/CatalogSearchBar"
import type { CatalogFilters } from "../types/catalog"

const TestWrapper = ({
  children,
  initialEntries = ["/"],
}: {
  children: React.ReactNode
  initialEntries?: string[]
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Routes>
      <Route path="/" element={children} />
    </Routes>
  </MemoryRouter>
)

test("renders search input with placeholder", () => {
  const mockOnSearchChange = vi.fn()
  const filters: CatalogFilters = {
    strainType: StrainType.Regular,
    searchQuery: "",
  }

  render(
    <TestWrapper>
      <CatalogSearchBar onSearchChange={mockOnSearchChange} filters={filters} />
    </TestWrapper>,
  )

  expect(
    screen.getByPlaceholderText(/search by descriptor/i),
  ).toBeInTheDocument()
})

test("shows clear button when search input has value", async () => {
  const user = userEvent.setup()
  const mockOnSearchChange = vi.fn()
  const filters: CatalogFilters = {
    strainType: StrainType.Regular,
    searchQuery: "",
  }

  render(
    <TestWrapper>
      <CatalogSearchBar onSearchChange={mockOnSearchChange} filters={filters} />
    </TestWrapper>,
  )

  const input = screen.getByPlaceholderText(
    /search by descriptor/i,
  ) as HTMLInputElement
  await user.type(input, "test")

  // Clear button should appear when input has value
  const clearButton = screen.getByRole("button", { name: "✕" })
  expect(clearButton).toBeInTheDocument()
})

test("clears search when clear button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnSearchChange = vi.fn()
  const filters: CatalogFilters = {
    strainType: StrainType.Regular,
    searchQuery: "",
  }

  render(
    <TestWrapper initialEntries={["/?q=test"]}>
      <CatalogSearchBar onSearchChange={mockOnSearchChange} filters={filters} />
    </TestWrapper>,
  )

  // Wait for component to initialize from URL
  await screen.findByDisplayValue("test")
  const clearButton = screen.getByRole("button", { name: "✕" })

  await user.click(clearButton)

  expect(mockOnSearchChange).toHaveBeenCalledWith({
    strainType: StrainType.Regular,
    searchQuery: "",
  })
})

test("shows Clear All button when search filters are active", async () => {
  const user = userEvent.setup()
  const mockOnSearchChange = vi.fn()
  const filters: CatalogFilters = {
    strainType: StrainType.Regular,
    searchQuery: "",
  }

  render(
    <TestWrapper>
      <CatalogSearchBar onSearchChange={mockOnSearchChange} filters={filters} />
    </TestWrapper>,
  )

  const searchInput = screen.getByPlaceholderText(
    /search by descriptor/i,
  ) as HTMLInputElement
  await user.type(searchInput, "test")

  // Clear All button should appear when filters are active
  const clearAllButton = screen.getByRole("button", { name: /clear all/i })
  expect(clearAllButton).toBeInTheDocument()
})

test("clears all filters when Clear All button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnSearchChange = vi.fn()
  const filters: CatalogFilters = {
    strainType: StrainType.Bacterial,
    searchQuery: "",
  }

  render(
    <TestWrapper>
      <CatalogSearchBar onSearchChange={mockOnSearchChange} filters={filters} />
    </TestWrapper>,
  )

  const clearAllButton = screen.getByRole("button", { name: /clear all/i })
  await user.click(clearAllButton)

  expect(mockOnSearchChange).toHaveBeenCalledWith({
    strainType: StrainType.Regular,
    searchQuery: "",
  })
})

test("hides active filters section when no filters are applied", () => {
  const mockOnSearchChange = vi.fn()
  const filters: CatalogFilters = {
    strainType: StrainType.Regular,
    searchQuery: "",
  }

  render(
    <TestWrapper>
      <CatalogSearchBar onSearchChange={mockOnSearchChange} filters={filters} />
    </TestWrapper>,
  )

  expect(
    screen.queryByRole("button", { name: /clear all/i }),
  ).not.toBeInTheDocument()
})

test("displays active filter chips when filters are applied", () => {
  const mockOnSearchChange = vi.fn()
  const filters: CatalogFilters = {
    strainType: StrainType.Bacterial,
    searchQuery: "test",
  }

  render(
    <TestWrapper>
      <CatalogSearchBar onSearchChange={mockOnSearchChange} filters={filters} />
    </TestWrapper>,
  )

  expect(screen.getByText(/Type: BACTERIAL/)).toBeInTheDocument()
})
