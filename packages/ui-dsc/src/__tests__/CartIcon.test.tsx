import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { CartIcon } from "../cart/CartIcon"

const cartItems = [
  {
    id: "DBS123",
    label: "test1",
    fee: 30,
    in_stock: true,
  },
  {
    id: "DBP456",
    label: "test2",
    fee: 15,
    in_stock: true,
  },
]
test("correctly indicates items in cart", () => {
  render(
    <MemoryRouter>
      <CartIcon items={cartItems} isFull={false} />
    </MemoryRouter>,
  )
  expect(screen.getByText("2")).toBeInTheDocument()
})
test("displays notice if cart is full", () => {
  render(
    <MemoryRouter>
      <CartIcon items={[]} isFull />
    </MemoryRouter>,
  )
  expect(screen.getByText("* cart full")).toBeInTheDocument()
})

test("correctly indicates no items in cart", () => {
  render(
    <MemoryRouter>
      <CartIcon items={[]} isFull={false} />
    </MemoryRouter>,
  )
  expect(screen.getByText("0")).toBeInTheDocument()
})
