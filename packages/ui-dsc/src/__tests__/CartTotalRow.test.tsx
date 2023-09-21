import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CartTotalRow } from "../cart/CartTotalRow"

test("should render the leftValue, numItems, and total correctly", () => {
  const properties = {
    leftValue: "Strains",
    numItems: 5,
    total: "10.99",
    variant: "inherit" as "inherit",
  }

  render(<CartTotalRow {...properties} />)

  const leftValueElement = screen.getByText("Strains")
  const numberItemsElement = screen.getByText("5 items:")
  const totalElement = screen.getByText("10.99")

  expect(leftValueElement).toBeInTheDocument()
  expect(numberItemsElement).toBeInTheDocument()
  expect(totalElement).toBeInTheDocument()
})

test("should have the proper variant for Typography components", () => {
  const properties = {
    leftValue: "Plasmids",
    numItems: 0,
    total: "0.00",
    variant: "h6" as "h6",
  }

  render(<CartTotalRow {...properties} />)

  const leftValueElement = screen.getByText("Plasmids").parentElement
  const numberItemsElement = screen.getByText("0 items:")
  const totalElement = screen.getByText("0.00")
  const variantClassName = "MuiTypography-h6"

  expect(leftValueElement).toHaveClass(variantClassName)
  expect(numberItemsElement).toHaveClass(variantClassName)
  expect(totalElement).toHaveClass(variantClassName)
})
