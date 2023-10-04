import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { CartItem } from "../cart/CartItem"

const testItem = {
  id: "DBS-1",
  summary: "This is a test item",
  label: "testStrain",
  quantity: 1,
  fee: 10,

  in_stock: true,
}

const deleteItem = vi.fn()

test("Each item renders a trash button", async () => {
  render(
    <MemoryRouter>
      <CartItem item={testItem} deleteItem={deleteItem} />
    </MemoryRouter>,
  )
  const trashButton = screen.getByRole("button", {
    name: "Remove Item",
  })
  expect(trashButton).toBeInTheDocument()
  await userEvent.click(trashButton)
  expect(deleteItem).toHaveBeenCalled()
})
