import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ShoppingCartTotalCard } from "../cart/ShoppingCartTotalCard"
import { testItems } from "./testData"

test("displays correct total", () => {
  render(
    <MemoryRouter>
      <ShoppingCartTotalCard items={testItems} />
    </MemoryRouter>,
  )

  expect(screen.getByText(/strains/i)).toBeInTheDocument()
  expect(screen.getByText(/total/i)).toBeInTheDocument()
  const total = screen.getAllByText("$44.79")
  expect(total.length).toBeGreaterThan(1)
})
