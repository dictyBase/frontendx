import { describe, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import { EmptyCart } from "../components/EmptyCart"

describe("features/ShoppingCart/EmptyCart", () => {
  describe("initial component render", () => {
    test("displays empty notification", () => {
      render(
        <Router>
          <EmptyCart />
        </Router>,
      )
      expect(
        screen.getByText(/Your shopping cart is empty./),
      ).toBeInTheDocument()
    })
    test("displays button links to catalogs", () => {
      render(
        <Router>
          <EmptyCart />
        </Router>,
      )
      expect(
        screen.getByRole("button", { name: "Strain Catalog" }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "Plasmid Catalog" }),
      ).toBeInTheDocument()
    })
  })
})
