import { test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchBar } from "../catalog/SearchBar"

const defaultDropdownValue = "Regular Strains"
const catalogHelpButtonName = "Learn more about the stock catalog page"

beforeEach(() => {
  render(
    <MemoryRouter>
      <SearchBar />
    </MemoryRouter>,
  )
})

test("It renders a dropdown menu for selecting a filter", () => {
  // The FilterDropdown component uses a Material UI Select component, whose top level element has role="combobox" in MUI v5
  const comboboxes = screen.getAllByRole("combobox")
  // Find the filter dropdown by checking its text content
  const filterDropdown = comboboxes.find(
    (callback) => callback.textContent === defaultDropdownValue,
  )
  expect(filterDropdown).toBeDefined()
})

test("It renders a text box for entering search terms", () => {
  // There are multiple comboboxes on the page (filter dropdown + search box)
  expect(screen.getAllByRole("combobox").length).toBeGreaterThan(0)
})

test("It renders a help button to show information about using browsing the catalog", () => {
  expect(
    screen.getByRole("button", { name: catalogHelpButtonName }),
  ).toBeInTheDocument()
})
