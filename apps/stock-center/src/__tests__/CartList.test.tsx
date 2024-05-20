import { test, expect } from "vitest"
import { ReactElement } from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Provider, createStore } from "jotai"
import { CartList } from "../components/CartList"
import { cartAtom } from "../cartState"
import { testItems } from "../mocks/cartData"

test("Renders a list item for each strainItem passed into the items prop", () => {
  const cartStore = createStore()
  cartStore.set(cartAtom, {
    strainItems: testItems,
    plasmidItems: [],
    maxItems: 12,
  })
  render(
    <MemoryRouter>
      <Provider store={cartStore}>
        <CartList />
      </Provider>
    </MemoryRouter>,
  )

  const cartItems = screen.getAllByRole("listitem")
  expect(cartItems).toHaveLength(3)
})
