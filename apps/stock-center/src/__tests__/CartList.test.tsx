import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Provider } from "jotai"
import { CartList } from "../components/CartList"
import { cartAtom } from "../cartState"
import { testItems } from "../mocks/cartData"

test("Renders a list item for each strainItem passed into the items prop", () => {
  render(
    <MemoryRouter>
      <Provider initialValues={[[cartAtom, { strainItems: testItems }]]}>
        <CartList cart={{ strainItems: testItems, maxItems: 12 }} />
      </Provider>
    </MemoryRouter>,
  )

  const cartItems = screen.getAllByRole("listitem")
  expect(cartItems).toHaveLength(3)
})
