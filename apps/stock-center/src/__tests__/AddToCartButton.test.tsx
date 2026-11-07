import { vi, expect, test, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { Provider } from "jotai"
import { AddToCartButton } from "../components/AddToCartButton"
import {
  mockPlasmidCatalogItem,
  mockStrainCatalogItem,
} from "../mocks/mockCatalogItems"

const mockSetShowDialog = vi.fn()

const addToCartButtonName = "Add to shopping cart"

beforeEach(() => {
  vi.clearAllMocks()
})

test("Displays button with `Add to Cart` text", () => {
  render(
    <Provider>
      <AddToCartButton
        items={[mockStrainCatalogItem]}
        setShowDialog={mockSetShowDialog}
      />
    </Provider>,
  )
  expect(
    screen.getByRole("button", { name: addToCartButtonName }),
  ).toBeVisible()
})

test("Calls the function passed to `setShowDialog` prop when clicked", async () => {
  const user = userEvent.setup()
  render(
    <Provider>
      <AddToCartButton
        items={[mockPlasmidCatalogItem]}
        setShowDialog={mockSetShowDialog}
      />
    </Provider>,
  )
  await user.click(screen.getByRole("button", { name: addToCartButtonName }))

  expect(mockSetShowDialog).toHaveBeenCalledOnce()
})

test("Stops click event propagation to parent elements", async () => {
  const user = userEvent.setup()
  const handleParentClick = vi.fn()
  render(
    <Provider>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div onClick={handleParentClick}>
        <AddToCartButton
          items={[mockStrainCatalogItem]}
          setShowDialog={mockSetShowDialog}
        />
      </div>
    </Provider>,
  )
  await user.click(screen.getByRole("button", { name: addToCartButtonName }))

  expect(handleParentClick).not.toHaveBeenCalled()
})
