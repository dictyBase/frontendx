import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { fees } from "../fees"
import { AddToCartDialog } from "../catalog/AddToCartDialog"

const setShowDialogSpy = vi.fn()
const setCheckedItemsSpy = vi.fn()

const properties = {
  data: [
    {
      id: "DBS1234",
      label: "test strain",
      summary: "test summary",
      fee: fees.STRAIN_FEE,
      quantity: 1,
    },
  ],
  setCheckedItems: setCheckedItemsSpy,
  setShowDialog: setShowDialogSpy,
}

test("calls functions when clicking close button", async () => {
  render(
    <BrowserRouter>
      <AddToCartDialog {...properties} />
    </BrowserRouter>,
  )
  const button = screen.getByRole("button", { name: "View Cart" })
  await userEvent.click(button)
  expect(setCheckedItemsSpy).toHaveBeenCalledTimes(1)
  expect(setShowDialogSpy).toHaveBeenCalledTimes(1)
})
