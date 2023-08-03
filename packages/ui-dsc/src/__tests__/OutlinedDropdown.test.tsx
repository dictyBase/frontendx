import { vi, test, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { OutlinedDropdown } from "../OutlinedDropdown"

const handleChangeSpy = vi.fn()
const values = [1, 2, 3, 4, 5, 6]

test("calls function handleChange when a menu item is clicked", async () => {
  render(
    <OutlinedDropdown
      handleChange={handleChangeSpy}
      label="Qty"
      dropdownValues={values}
      inputValue={4}
    />,
  )
  const dropdown = screen.getByRole("button", { name: "Qty 4" })
  expect(dropdown).toBeInTheDocument()
  await userEvent.click(dropdown)
  const listbox = within(screen.getByRole("listbox"))
  await userEvent.click(listbox.getByText("2"))
  expect(handleChangeSpy).toHaveBeenCalledTimes(1)
})
