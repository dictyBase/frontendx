import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { CartTotalCard } from "../cart/CartTotalCard"
import { testItems } from "../common/testData"

test("displays correct total", () => {
  render(
    <MemoryRouter>
      <CartTotalCard items={testItems} />
    </MemoryRouter>,
  )

  expect(screen.getByText(/strains/i)).toBeInTheDocument()
  expect(screen.getByText(/total/i)).toBeInTheDocument()
  const total = screen.getAllByText("$44.79")
  expect(total.length).toBeGreaterThan(1)
})
