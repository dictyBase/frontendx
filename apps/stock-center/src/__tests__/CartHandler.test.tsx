import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Provider } from "jotai"
import CartHandler from "../pages/cart"
import { strainItemsAtom } from "../cartState"
import { testItems } from "../mocks/cartData"

test("Renders ShoppingCartWithItems component if there are items in the cart state. Does not render EmptyShoppingCart", () => {
  render(
    <MemoryRouter>
      <Provider initialValues={[[strainItemsAtom, testItems]]}>
        <CartHandler />
      </Provider>
    </MemoryRouter>,
  )

  const cartItems = screen.getAllByRole("listitem")
  expect(cartItems).toHaveLength(3)
  expect(screen.queryByText(/Your shopping cart is empty./)).toBeNull()
})

test("Renders EmptyShoppingCart component if there are items in the cart state. Does Not render ShoppingCartWithItems", () => {
  render(
    <MemoryRouter>
      <Provider initialValues={[[strainItemsAtom, []]]}>
        <CartHandler />
      </Provider>
    </MemoryRouter>,
  )

  expect(screen.getByText(/Your shopping cart is empty./)).toBeInTheDocument()
  expect(screen.queryAllByRole("listitem")).toHaveLength(0)
})
