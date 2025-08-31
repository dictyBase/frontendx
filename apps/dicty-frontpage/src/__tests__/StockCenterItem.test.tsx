import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StockCenterItem } from "../features/Frontpage/StockCenterItem"

const mockPlasmidData = {
  listRecentPlasmids: [
    { id: "1", name: "pDV1" },
    { id: "2", name: "pDV2" },
  ],
  listRecentStrains: [],
}

const mockStrainData = {
  listRecentPlasmids: [],
  listRecentStrains: [
    { id: "1", systematic_name: "DBS0001" },
    { id: "2", systematic_name: "DBS0002" },
  ],
}

test("renders plasmid items when type is Plasmid", () => {
  render(<StockCenterItem data={mockPlasmidData} type="Plasmid" />)

  expect(screen.getByText("pDV1")).toBeInTheDocument()
  expect(screen.getByText("pDV2")).toBeInTheDocument()
})

test("renders strain items when type is Strain", () => {
  render(<StockCenterItem data={mockStrainData} type="Strain" />)

  expect(screen.getByText("DBS0001")).toBeInTheDocument()
  expect(screen.getByText("DBS0002")).toBeInTheDocument()
})

test("renders fallback component when type is neither Plasmid nor Strain", () => {
  // @ts-expect-error Testing invalid type for coverage
  render(<StockCenterItem data={mockPlasmidData} type="Invalid" />)

  expect(screen.getByText("This shouldn't happen at all.")).toBeInTheDocument()
})

test("handles empty data arrays", () => {
  const emptyData = {
    listRecentPlasmids: [],
    listRecentStrains: [],
  }

  render(<StockCenterItem data={emptyData} type="Plasmid" />)

  // Should render empty content (no items)
  expect(screen.queryByText("pDV1")).not.toBeInTheDocument()
})
