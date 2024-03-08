import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { renderStrainTotal } from "../functional"
import { StrainCartItem } from "../types"

describe("renderStrainTotal", () => {
  test("should render the leftValue, numItems, and total correctly", () => {
    const mockStrainItems: Array<StrainCartItem> = [
      {
        id: "DBS0236123",
        label: "aarA-",
        summary: "mock strain 1",
        in_stock: true,
        fee: 15,
      },
      {
        id: "DBS0236123",
        label: "aarA",
        summary: "mock strain 2",
        in_stock: true,
        fee: 15,
      },
    ]

    render(renderStrainTotal({ strainItems: mockStrainItems }))

    expect(screen.getByText("Strains")).toBeInTheDocument()
    expect(screen.getByText("2 items:")).toBeInTheDocument()
    expect(screen.getByText("$30.00")).toBeInTheDocument()
  })
})
