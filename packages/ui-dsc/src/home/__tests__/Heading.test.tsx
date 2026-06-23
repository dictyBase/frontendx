import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { Heading } from "../Heading"

test("renders Heading component", () => {
  render(<Heading />)
  expect(
    screen.getByText("Welcome to Dicty Stock Center (DSC)"),
  ).toBeInTheDocument()
})

test("renders with correct heading level", () => {
  render(<Heading />)
  const heading = screen.getByRole("heading", { level: 1 })
  expect(heading).toHaveTextContent("Welcome to Dicty Stock Center (DSC)")
})

test("applies correct typography variant", () => {
  render(<Heading />)
  const heading = screen.getByRole("heading", { level: 1 })
  expect(heading.className).toContain("MuiTypography-h1")
})
