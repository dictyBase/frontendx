import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { expect, test } from "vitest"
import { OrderingSteps } from "../features/NewHome/OrderingSteps"

const renderComponent = () =>
  render(
    <MemoryRouter>
      <OrderingSteps />
    </MemoryRouter>,
  )

test("renders the ordering steps toggle button", () => {
  renderComponent()
  expect(
    screen.getByRole("button", { name: /how to place an order/i }),
  ).toBeInTheDocument()
})

test("toggle button has aria-expanded false by default", () => {
  renderComponent()
  expect(
    screen.getByRole("button", { name: /how to place an order/i }),
  ).toHaveAttribute("aria-expanded", "false")
})

test("does not show step content by default", () => {
  renderComponent()
  expect(
    screen.queryByText(/search or browse the catalog/i),
  ).not.toBeInTheDocument()
})

test("shows all step titles after clicking the toggle", async () => {
  const user = userEvent.setup()
  renderComponent()

  await user.click(screen.getByRole("button", { name: /how to place an order/i }))

  expect(screen.getByText(/search or browse the catalog/i)).toBeInTheDocument()
  expect(screen.getByText(/add items to your cart/i)).toBeInTheDocument()
  expect(screen.getByText(/review your order/i)).toBeInTheDocument()
  expect(screen.getByText(/submit with payment/i)).toBeInTheDocument()
  expect(screen.getByText(/receive confirmation/i)).toBeInTheDocument()
})

test("shows the payment information link when expanded", async () => {
  const user = userEvent.setup()
  renderComponent()

  await user.click(screen.getByRole("button", { name: /how to place an order/i }))

  const paymentLink = screen.getByRole("link", {
    name: /view accepted payment methods/i,
  })
  expect(paymentLink).toBeInTheDocument()
  expect(paymentLink).toHaveAttribute("href", "/information/payment")
})

test("toggle button has aria-expanded true after clicking", async () => {
  const user = userEvent.setup()
  renderComponent()

  await user.click(screen.getByRole("button", { name: /how to place an order/i }))

  expect(
    screen.getByRole("button", { name: /how to place an order/i }),
  ).toHaveAttribute("aria-expanded", "true")
})

test("toggle button returns to aria-expanded false when clicked a second time", async () => {
  // MUI Collapse defers unmounting until the CSS transition ends, which does
  // not fire in jsdom. We verify the collapsed state through aria-expanded,
  // which updates synchronously with the isOpen state.
  const user = userEvent.setup()
  renderComponent()

  const toggle = screen.getByRole("button", { name: /how to place an order/i })

  await user.click(toggle)
  expect(toggle).toHaveAttribute("aria-expanded", "true")

  await user.click(toggle)
  expect(toggle).toHaveAttribute("aria-expanded", "false")
})
