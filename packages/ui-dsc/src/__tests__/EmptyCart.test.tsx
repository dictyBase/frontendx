import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import { EmptyCart } from "../cart/EmptyCart"

test("displays empty notification", () => {
  render(
    <Router>
      <EmptyCart />
    </Router>,
  )
  expect(screen.getByText(/Your shopping cart is empty./)).toBeInTheDocument()
})

test("displays button links to catalogs", () => {
  render(
    <Router>
      <EmptyCart />
    </Router>,
  )
  expect(
    screen.getByRole("link", { name: "Browse Strains" }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole("link", { name: "Browse Plasmids" }),
  ).toBeInTheDocument()
})

test("links the full catalog button to the catalog resource", () => {
  render(
    <Router>
      <EmptyCart />
    </Router>,
  )
  expect(screen.getByRole("link", { name: "Full Catalog" })).toHaveAttribute(
    "href",
    "/catalog",
  )
})

test("links the browse buttons to their entity resources", () => {
  render(
    <Router>
      <EmptyCart />
    </Router>,
  )
  expect(screen.getByRole("link", { name: "Browse Strains" })).toHaveAttribute(
    "href",
    "/strains",
  )
  expect(screen.getByRole("link", { name: "Browse Plasmids" })).toHaveAttribute(
    "href",
    "/plasmids",
  )
})
