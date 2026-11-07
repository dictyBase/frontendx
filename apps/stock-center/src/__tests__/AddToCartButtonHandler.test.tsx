import { Provider, createStore } from "jotai"
import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { cartAtom } from "../cartState"
import { mockStrainCartItem, mockPlasmidCartItem } from "../mocks/mockCartItems"
import { AddToCartButtonHandler } from "../components/AddToCartButtonHandler"

test("Displays `remove from cart` button when strain is already in the cart and stops click propagation", async () => {
  const user = userEvent.setup()
  const handleParentClick = vi.fn()
  const testStore = createStore()

  testStore.set(cartAtom, {
    strainItems: [mockStrainCartItem],
    plasmidItems: [],
    maxItems: 12,
  })

  render(
    <MemoryRouter>
      <Provider store={testStore}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div onClick={handleParentClick}>
          <AddToCartButtonHandler item={mockStrainCartItem} />
        </div>
      </Provider>
    </MemoryRouter>,
  )
  const removeFromCartButton = screen.getByRole("button", {
    name: /remove from cart/i,
  })
  expect(removeFromCartButton).toBeInTheDocument()

  await user.click(removeFromCartButton)

  expect(handleParentClick).not.toHaveBeenCalled()
  const addToCartButton = screen.getByRole("button", {
    name: /add to shopping cart/i,
  })
  expect(addToCartButton).toBeInTheDocument()
})

test("Displays `add to cart` button when the strain is not already in cart and the cart is not full", async () => {
  const user = userEvent.setup()
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: [],
    plasmidItems: [],
    maxItems: 12,
  })

  render(
    <MemoryRouter>
      <Provider store={testStore}>
        <AddToCartButtonHandler item={mockStrainCartItem} />
      </Provider>
    </MemoryRouter>,
  )
  const addToCartButton = screen.getByRole("button", {
    name: /add to shopping cart/i,
  })
  expect(addToCartButton).toBeInTheDocument()

  await user.click(addToCartButton)

  expect(screen.getByText(/added to cart/i)).toBeInTheDocument()
})

test("Displays `is full` button when the cart is full", async () => {
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: [],
    plasmidItems: [mockPlasmidCartItem],
    maxItems: 1,
  })

  render(
    <MemoryRouter>
      <Provider store={testStore}>
        <AddToCartButtonHandler item={mockStrainCartItem} />
      </Provider>
    </MemoryRouter>,
  )
  const isFullButton = screen.getByRole("button", {
    name: /Shopping cart is full/,
  })
  expect(isFullButton).toBeInTheDocument()
  expect(screen.getByTestId("ProductionQuantityLimitsIcon")).toBeInTheDocument()
  expect(screen.queryByTestId("RemoveShoppingCartIcon")).not.toBeInTheDocument()
})

test("Displays `unavailable` button when the item is unavailable", async () => {
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: [],
    plasmidItems: [],
    maxItems: 1,
  })

  render(
    <MemoryRouter>
      <Provider store={testStore}>
        <AddToCartButtonHandler
          item={{ ...mockStrainCartItem, in_stock: false }}
        />
      </Provider>
    </MemoryRouter>,
  )
  const isFullButton = screen.getByRole("button", {
    name: /Item is currently unavailable/,
  })
  expect(isFullButton).toBeInTheDocument()
  expect(screen.getByTestId("RemoveShoppingCartIcon")).toBeInTheDocument()
  expect(
    screen.queryByTestId("ProductionQuantityLimitsIcon"),
  ).not.toBeInTheDocument()
})
