import { test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { Provider, createStore } from "jotai"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { CartButton } from "../CartButton"
import { cartAtom } from "../../../../cartState"
import type { StrainCartItem } from "@dictybase/ui-dsc"

const mockStrainItem = (id: string): StrainCartItem => ({
  __typename: "Strain",
  id,
  label: `strain-${id}`,
  summary: "test",
  in_stock: true,
  fee: 10,
})

beforeEach(() => {
  sessionStorage.clear()
})

const renderWithProviders = (store = createStore()) =>
  render(
    <MemoryRouter initialEntries={["/strains"]}>
      <Routes>
        <Route
          path="/strains"
          element={
            <Provider store={store}>
              <CartButton />
            </Provider>
          }
        />
        <Route path="/cart" element={<div>Cart Page</div>} />
      </Routes>
    </MemoryRouter>,
  )

test("renders a button with zero items when cart is empty", () => {
  renderWithProviders()
  expect(
    screen.getByRole("button", { name: /shopping cart with 0 items/i }),
  ).toBeInTheDocument()
})

test("shows the current cart item count in the badge", () => {
  const store = createStore()
  store.set(cartAtom, {
    strainItems: [mockStrainItem("DBS-1"), mockStrainItem("DBS-2")],
    plasmidItems: [],
    maxItems: 12,
  })
  renderWithProviders(store)
  expect(
    screen.getByRole("button", { name: /shopping cart with 2 items/i }),
  ).toBeInTheDocument()
})

test("navigates to the cart page when clicked", async () => {
  const user = userEvent.setup()
  renderWithProviders()

  await user.click(
    screen.getByRole("button", { name: /shopping cart with 0 items/i }),
  )

  expect(screen.getByText("Cart Page")).toBeInTheDocument()
})
