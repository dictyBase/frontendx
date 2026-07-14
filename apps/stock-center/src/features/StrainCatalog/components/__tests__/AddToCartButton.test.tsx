import { vi, test, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { Provider, createStore } from "jotai"
import { AddToCartButton } from "../AddToCartButton"
import { cartAtom } from "../../../../cartState"
import type { CatalogStrain } from "../../types/catalog"

const mockStrain: CatalogStrain = {
  __typename: "Strain",
  id: "DBS-001",
  summary: "Test strain summary",
  label: "testStrain",
  in_stock: true,
  descriptor: "test(1-100)",
}

beforeEach(() => {
  vi.clearAllMocks()
})

const renderWithStore = (
  strain: CatalogStrain = mockStrain,
  store = createStore(),
  onAdd?: () => void,
) =>
  render(
    <Provider store={store}>
      <AddToCartButton strain={strain} onAdd={onAdd} />
    </Provider>,
  )

test("renders Add button when strain is in stock and cart has space", () => {
  renderWithStore()
  expect(
    screen.getByRole("button", { name: /add testStrain to cart/i }),
  ).toBeInTheDocument()
  expect(screen.getByText("Add")).toBeInTheDocument()
})

test("is enabled when cart has remaining space", () => {
  const store = createStore()
  store.set(cartAtom, { strainItems: [], plasmidItems: [], maxItems: 12 })
  renderWithStore(mockStrain, store)
  expect(screen.getByRole("button")).toBeEnabled()
})

test("is disabled when strain is out of stock", () => {
  const outOfStockStrain = { ...mockStrain, in_stock: false }
  renderWithStore(outOfStockStrain)
  expect(screen.getByRole("button")).toBeDisabled()
})

test("renders Cart Full text when cart is at capacity", () => {
  const store = createStore()
  store.set(cartAtom, { strainItems: [], plasmidItems: [], maxItems: 0 })
  renderWithStore(mockStrain, store)
  expect(screen.getByText("Cart Full")).toBeInTheDocument()
})

test("is disabled when cart is at capacity", () => {
  const store = createStore()
  store.set(cartAtom, { strainItems: [], plasmidItems: [], maxItems: 0 })
  renderWithStore(mockStrain, store)
  expect(screen.getByRole("button")).toBeDisabled()
})

test("adds strain to cart when clicked", async () => {
  const user = userEvent.setup()
  const store = createStore()
  store.set(cartAtom, { strainItems: [], plasmidItems: [], maxItems: 12 })
  renderWithStore(mockStrain, store)

  await user.click(screen.getByRole("button"))

  const cart = store.get(cartAtom)
  expect(cart.strainItems).toHaveLength(1)
  expect(cart.strainItems[0].id).toBe("DBS-001")
})

test("does not add to cart when strain is out of stock", () => {
  const store = createStore()
  store.set(cartAtom, { strainItems: [], plasmidItems: [], maxItems: 12 })
  const outOfStockStrain = { ...mockStrain, in_stock: false }
  renderWithStore(outOfStockStrain, store)

  // fireEvent bypasses pointer-events:none; the handler's own guard prevents the add
  fireEvent.click(screen.getByRole("button"))

  const cart = store.get(cartAtom)
  expect(cart.strainItems).toHaveLength(0)
})

test("calls onAdd callback after adding strain to cart", async () => {
  const user = userEvent.setup()
  const onAdd = vi.fn()
  const store = createStore()
  store.set(cartAtom, { strainItems: [], plasmidItems: [], maxItems: 12 })
  renderWithStore(mockStrain, store, onAdd)

  await user.click(screen.getByRole("button"))

  expect(onAdd).toHaveBeenCalledOnce()
})

test("does not call onAdd when cart is full", () => {
  const onAdd = vi.fn()
  const store = createStore()
  store.set(cartAtom, { strainItems: [], plasmidItems: [], maxItems: 0 })
  renderWithStore(mockStrain, store, onAdd)

  fireEvent.click(screen.getByRole("button"))

  expect(onAdd).not.toHaveBeenCalled()
})
