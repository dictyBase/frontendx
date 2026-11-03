import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CartFullButton } from "../catalog/CartFullButton"

test("renders a button with the full cart accessible name", () => {
  render(<CartFullButton />)
  expect(
    screen.getByRole("button", { name: /shopping cart is full/i }),
  ).toBeInTheDocument()
})

test("renders the dedicated quantity-limit icon", () => {
  render(<CartFullButton />)
  expect(screen.getByTestId("ProductionQuantityLimitsIcon")).toBeInTheDocument()
})

test("renders a disabled button", () => {
  render(<CartFullButton />)
  expect(
    screen.getByRole("button", { name: /shopping cart is full/i }),
  ).toBeDisabled()
})
