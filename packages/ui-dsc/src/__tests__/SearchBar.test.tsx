import { vi, test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchBar } from "../catalog/SearchBar"

const setSearchParameters = vi.fn()
const defaultDropdownValue = "Regular Strains"
const catalogHelpButtonName = "Learn more about the stock catalog page"

beforeEach(() => {
  render(
    <MemoryRouter>
      <SearchBar setSearchParameters={setSearchParameters} />
    </MemoryRouter>,
  )
})

test("It renders a dropdown menu for selecting a filter", () => {
  expect(
    // The FilterDropdown component uses a Material UI Select component, whose top level element is a div with the attribute role="button", therefore
    // we get the element with getByRole("button"):
    screen.getByRole("button", { name: defaultDropdownValue }),
  ).toBeInTheDocument()
})

test("It renders a text box for entering search terms", () => {
  expect(screen.getByRole("textbox")).toBeInTheDocument()
})

test("It renders a help button to show information about using browsing the catalog", () => {
  expect(
    screen.getByRole("button", { name: catalogHelpButtonName }),
  ).toBeInTheDocument()
})
