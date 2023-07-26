import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { OrderDescription } from "../order/OrderDescription"

test("renders success message for valid order IDs", () => {
  render(<OrderDescription />)
  expect(
    screen.getByRole("heading", { name: "Thank you for your order" }),
  ).toBeInTheDocument()
})
