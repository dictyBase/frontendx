import { Provider, createStore } from "jotai"
import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { cartAtom } from "../cartState"
import { mockPlasmidCartItem, mockStrainCartItem } from "../mocks/mockCartItems"
import { PlasmidAvailableDisplay } from "../components/PlasmidAvailableDisplay"

test("Displays `remove from cart` button when plasmid is already in the cart", async () => {
  const user = userEvent.setup()
  const testStore = createStore()

  testStore.set(cartAtom, {
    strainItems: [],
    plasmidItems: [mockPlasmidCartItem],
    maxItems: 12,
  })

  render(
    <MemoryRouter>
      <Provider store={testStore}>
        <PlasmidAvailableDisplay cartData={mockPlasmidCartItem} />
      </Provider>
    </MemoryRouter>,
  )
  const removeFromCartButton = screen.getByText(/remove from cart/i)
  expect(removeFromCartButton).toBeInTheDocument()

  await user.click(removeFromCartButton)

  const addToCartButton = screen.getByText(/add to cart/i)
  expect(addToCartButton).toBeInTheDocument()
})

test("Displays `add to cart` button when the plasmid is not already in cart and the cart is not full", async () => {
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
        <PlasmidAvailableDisplay cartData={mockPlasmidCartItem} />
      </Provider>
    </MemoryRouter>,
  )
  const addToCartButton = screen.getByText(/add to cart/i)
  expect(addToCartButton).toBeInTheDocument()

  await user.click(addToCartButton)

  const removeFromCartButton = screen.getByText(/remove from cart/i)
  expect(removeFromCartButton).toBeInTheDocument()
})

test("Displays `is full` button when the cart is full", async () => {
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: [mockStrainCartItem],
    plasmidItems: [],
    maxItems: 1,
  })

  render(
    <MemoryRouter>
      <Provider store={testStore}>
        <PlasmidAvailableDisplay cartData={mockPlasmidCartItem} />
      </Provider>
    </MemoryRouter>,
  )
  const isFullButton = screen.getByText(/is full/i)
  expect(isFullButton).toBeInTheDocument()
})
