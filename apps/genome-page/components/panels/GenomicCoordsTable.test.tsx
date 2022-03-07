import React from "react"
import { render, screen } from "@testing-library/react"
import GenomicCoordsTable from "./GenomicCoordsTable"
import mockProductInfo from "../../mocks/mockProductInfo"

describe("components/panels/GenomicCoordsTable", () => {
  const product_info = [...mockProductInfo]

  it("should render children", () => {
    render(<GenomicCoordsTable data={product_info[0].genomic_coords} />)

    expect(screen.getByText(/Exon/)).toBeInTheDocument()
    expect(screen.getByText(/Local Coords./)).toBeInTheDocument()
    expect(screen.getByText(/Chrom. Coords./)).toBeInTheDocument()

    /* First row data */
    expect(screen.getByText(/1 - 626/)).toBeInTheDocument()
    expect(screen.getByText(/1641837 - 1641212/)).toBeInTheDocument()
  })
})
