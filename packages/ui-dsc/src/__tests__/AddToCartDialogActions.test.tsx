import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { AddToCartDialogActions } from "../catalog/AddToCartDialogActions"

const handleCloseSpy = vi.fn()
const properties = {
  handleClose: handleCloseSpy,
}

test("calls the passed handleClose function when the Continue Shopping Button is pressed", async () => {
  render(
    <MemoryRouter>
      <AddToCartDialogActions {...properties} />
    </MemoryRouter>,
  )
  const button = screen.getByRole("button", { name: "Continue Shopping" })
  await userEvent.click(button)
  expect(handleCloseSpy).toHaveBeenCalledOnce()
})

test("navigates to the `/cart` route when the View Cart Button is pressed", async () => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/cart" element={<> Shopping Cart </>} />
        <Route path="/" element={<AddToCartDialogActions {...properties} />} />
      </Routes>
    </MemoryRouter>,
  )
  const button = screen.getByRole("button", { name: "View Cart" })
  await userEvent.click(button)
  expect(screen.getByText("Shopping Cart")).toBeInTheDocument()
})
