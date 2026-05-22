import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { renderStrainTotal, renderPlasmidTotal } from "../functional"
import { StrainCartItem, PlasmidCartItem } from "../types"

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

    render(
      renderStrainTotal({ strainItems: mockStrainItems, plasmidItems: [] }),
    )

    expect(screen.getByText("Strains")).toBeInTheDocument()
    expect(screen.getByText("2 items:")).toBeInTheDocument()
    expect(screen.getByText("$30.00")).toBeInTheDocument()
  })
})

describe("renderPlasmidTotal", () => {
  test("should render the leftValue, numItems, and total correctly", () => {
    const mockPlasmidItems: Array<PlasmidCartItem> = [
      {
        id: "DBS0236123",
        name: "aarA-",
        summary: "mock plasmid 1",
        in_stock: true,
        fee: 15,
      },
      {
        id: "DBS0236123",
        name: "aarA",
        summary: "mock plasmid 2",
        in_stock: true,
        fee: 15,
      },
    ]

    render(
      renderPlasmidTotal({ plasmidItems: mockPlasmidItems, strainItems: [] }),
    )

    expect(screen.getByText("Plasmids")).toBeInTheDocument()
    expect(screen.getByText("2 items:")).toBeInTheDocument()
    expect(screen.getByText("$30.00")).toBeInTheDocument()
  })
})
