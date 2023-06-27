import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
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

test("Renders a list item for each strainItem passed into the items prop", () => {
  render(
    <MemoryRouter>
      <ShoppingCartWithItems
        items={testItems}
        isFull={false}
        deleteItem={deleteItem}
      />
    </MemoryRouter>,
  )

  const cartItems = screen.getAllByRole("listitem")

  expect(cartItems).toHaveLength(3)
})
