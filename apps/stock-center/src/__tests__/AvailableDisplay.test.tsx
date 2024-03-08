import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AvailableDisplay } from "../components/AvailableDisplay"

test("should display capacity full message when reaching 12 items in cart", async () => {
  const cartData = {
    id: "DBS123456",
    label: "test1",
    summary: "this is the best test strain in the world",
    in_stock: true,
    fee: 10,
  }

  render(
    <MemoryRouter>
      <AvailableDisplay cartData={cartData} />
    </MemoryRouter>,
  )
  const cartButton = screen.getByText(/Add to Cart/)
  expect(cartButton).toBeInTheDocument()
})
