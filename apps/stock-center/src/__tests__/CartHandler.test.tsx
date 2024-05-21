import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Provider, createStore } from "jotai"
import CartHandler from "../pages/cart"
import { cartAtom } from "../cartState"
import { testItems } from "../mocks/cartData"

const store = createStore()

test("Renders ShoppingCartWithItems component if there are items in the cart state. Does not render EmptyShoppingCart", () => {
  store.set(cartAtom, {
    strainItems: testItems,
    plasmidItems: [],
    maxItems: 12,
  })
  render(
    <MemoryRouter>
      <Provider store={store}>
        <CartHandler />
      </Provider>
    </MemoryRouter>,
  )

  const cartItems = screen.getAllByRole("listitem")
  expect(cartItems).toHaveLength(3)
  expect(screen.queryByText(/Your shopping cart is empty./)).toBeNull()
})

test("Renders EmptyShoppingCart component if there are items in the cart state. Does Not render ShoppingCartWithItems", () => {
  store.set(cartAtom, { strainItems: [], plasmidItems: [], maxItems: 12 })
  render(
    <MemoryRouter>
      <Provider store={store}>
        <CartHandler />
      </Provider>
    </MemoryRouter>,
  )

  expect(screen.getByText(/Your shopping cart is empty./)).toBeInTheDocument()
  expect(screen.queryAllByRole("listitem")).toHaveLength(0)
})
