import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { BrowserRouter, MemoryRouter } from "react-router-dom"
import { strainGroupFilterOptions } from "@dictybase/hook-dsc"
import { FilterDropdown } from "../catalog/FilterDropdown"

/** Search parameter key shared by every test case. */
const GROUP_PARAM = "group"

/** Option passed to the `value` prop in every test case. */
const DEFAULT_VALUE = "regular"

/** Label of the option the dropdown switches to in the update tests. */
const GWDI_LABEL = "GWDI Strains"

/** Label of the option passed to the `value` prop in every test case. */
const REGULAR_LABEL = "Regular Strains"

const FilterDropdownWrapper = () => (
  <FilterDropdown
    options={strainGroupFilterOptions}
    param={GROUP_PARAM}
    value={DEFAULT_VALUE}
  />
)

test("It renders with the initial option passed to the `value` prop", () => {
  render(
    <BrowserRouter>
      <FilterDropdownWrapper />
    </BrowserRouter>,
  )
  const combobox = screen.getByRole("combobox")
  expect(combobox).toBeInTheDocument()
  expect(combobox).toHaveTextContent("Regular Strains")
  expect(window.location.search).toBe("?group=regular")
})

test("It updates the URL search parameter when an option is selected", async () => {
  const { click } = userEvent.setup()
  render(
    <BrowserRouter>
      <FilterDropdownWrapper />
    </BrowserRouter>,
  )
  const dropdownButton = screen.getByRole("combobox")
  await click(dropdownButton)
  const listOption = screen.getByRole("option", {
    name: GWDI_LABEL,
  })
  await click(listOption)
  const combobox = screen.getByRole("combobox")
  expect(combobox).toHaveTextContent(GWDI_LABEL)
  expect(window.location.search).toBe("?group=gwdi")
})

test("prefers the url search parameter over the value prop", () => {
  render(
    <MemoryRouter initialEntries={["/?group=gwdi"]}>
      <FilterDropdown
        options={strainGroupFilterOptions}
        param={GROUP_PARAM}
        value={DEFAULT_VALUE}
      />
    </MemoryRouter>,
  )
  expect(screen.getByRole("combobox")).toHaveTextContent(GWDI_LABEL)
})

test("falls back to the value prop when the url has no matching parameter", () => {
  render(
    <MemoryRouter>
      <FilterDropdown
        options={strainGroupFilterOptions}
        param={GROUP_PARAM}
        value={DEFAULT_VALUE}
      />
    </MemoryRouter>,
  )
  expect(screen.getByRole("combobox")).toHaveTextContent(REGULAR_LABEL)
})
