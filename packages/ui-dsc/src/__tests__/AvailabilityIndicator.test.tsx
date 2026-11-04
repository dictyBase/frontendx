import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AvailabilityIndicator } from "../catalog/AvailabilityIndicator"

test("shows 'Available' when the item is in stock", () => {
  render(<AvailabilityIndicator inStock />)
  expect(screen.getByText("Available")).toBeInTheDocument()
})

test("shows 'Out of stock' when the item is not in stock", () => {
  render(<AvailabilityIndicator inStock={false} />)
  expect(screen.getByText("Out of stock")).toBeInTheDocument()
})

test("does not show 'Out of stock' when the item is in stock", () => {
  render(<AvailabilityIndicator inStock />)
  expect(screen.queryByText("Out of stock")).not.toBeInTheDocument()
})
