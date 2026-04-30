import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { strainGroupFilterOptions } from "@dictybase/hook-dsc"
import { FilterDropdown } from "../catalog/FilterDropdown"

const FilterDropdownWrapper = () => (
  <FilterDropdown
    options={strainGroupFilterOptions}
    param="group"
    value="regular"
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
    name: "GWDI Strains",
  })
  await click(listOption)
  const combobox = screen.getByRole("combobox")
  expect(combobox).toHaveTextContent("GWDI Strains")
  expect(window.location.search).toBe("?group=gwdi")
})
