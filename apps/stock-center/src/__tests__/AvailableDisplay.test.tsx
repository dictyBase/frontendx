import { test, expect } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "jotai"
import { MemoryRouter } from "react-router-dom"
import { AvailableDisplay } from "../components/AvailableDisplay"
import { cartAtom } from "../state"

test("should display capacity full message when reaching 12 items in cart", async () => {
  const cartData = {
    id: "DBS123456",
    label: "test1",
    summary: "this is the best test strain in the world",
    fee: 10,
  }

  render(
    <MemoryRouter>
      <Provider
        initialValues={[
          [
            cartAtom,
            { strainItems: [{ ...cartData, quantity: 10 }], maxItems: 12 },
          ],
        ]}>
        <AvailableDisplay cartData={cartData} />
      </Provider>
    </MemoryRouter>,
  )
  const cartButton = screen.getByText(/Add to Cart/)
  expect(cartButton).toBeInTheDocument()
  const dropdown = screen.getByRole("button", { name: "Qty 1" })
  await userEvent.click(dropdown)
  const listbox = within(screen.getByRole("listbox"))
  await userEvent.click(listbox.getByText("2"))
  await userEvent.click(cartButton)
  expect(screen.getByText(/Cart capacity is full/)).toBeInTheDocument()
})
