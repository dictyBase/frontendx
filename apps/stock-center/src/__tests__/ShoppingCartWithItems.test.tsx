import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { ShoppingCartWithItems } from "../components/ShoppingCartWithItems"

const testItems = [
  {
    id: "DBS-1",
    summary: "This is a test item",
    label: "testStrain",
    quantity: 1,
    fee: 10,
  },
  {
    id: "DBS-2",
    summary: "This is another test item",
    label: "testStrain",
    quantity: 1,
    fee: 15,
  },
  {
    id: "DBS-3",
    summary: "This is the last test item",
    label: "testStrain",
    quantity: 1,
    fee: 19.79,
  },
]

const deleteItem = vi.fn()

test("Each item renders a trash button", async () => {
  render(
    <MemoryRouter>
      <ShoppingCartWithItems
        items={testItems}
        isFull={false}
        deleteItem={deleteItem}
      />
    </MemoryRouter>,
  )
  const trashButtons = screen.getAllByRole("button", {
    name: "Remove Item",
  })
  // should have two buttons - one for each item row
  expect(trashButtons).toHaveLength(3)
  // click trash button on row with multiple of strain
  await userEvent.click(trashButtons[0])
  // now all of those items from that row will be removed
  // leaving one trash button
  expect(deleteItem).toHaveBeenCalled()
})
