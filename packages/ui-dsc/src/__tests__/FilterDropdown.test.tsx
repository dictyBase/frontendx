import { test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useSearchParams, BrowserRouter } from "react-router-dom"
import { FilterDropdown } from "../catalog/FilterDropdown"

const FilterDropdownWrapper = () => {
  const [, setSearchParameters] = useSearchParams()

  return (
    <FilterDropdown
      searchParamFn={setSearchParameters}
      param="group"
      value="regular"
    />
  )
}

test("It renders with the initial option passed to the `value` prop", () => {
  render(
    <BrowserRouter>
      <FilterDropdownWrapper />
    </BrowserRouter>,
  )
  expect(
    screen.getByRole("button", { name: "Regular Strains" }),
  ).toBeInTheDocument()
  expect(window.location.search).toBe("?group=regular")
})

test("It updates the URL search parameter when an option is selected", async () => {
  const { click } = userEvent.setup()
  render(
    <BrowserRouter>
      <FilterDropdownWrapper />
    </BrowserRouter>,
  )
  const dropdownButton = screen.getByRole("button", { name: "Regular Strains" })
  await click(dropdownButton)
  const listOption = screen.getByRole("option", {
    name: "GWDI Strains",
  })
  await click(listOption)
  expect(
    screen.getByRole("button", { name: "GWDI Strains" }),
  ).toBeInTheDocument()
  expect(window.location.search).toBe("?group=gwdi")
})
