import React from "react"
import { render, screen } from "@testing-library/react"
import GenomicCoordsTable from "./GenomicCoordsTable"
import mockProductInfo from '../../mocks/mockProductInfo';

describe("components/panels/GenomicCoordsTable", () => {

  const product_info = [...mockProductInfo]

  it("should render children", () => {
    render(
        <GenomicCoordsTable data={product_info[0].genomic_coords}/>
    )

    expect(screen.getByText(/Exon/)).toBeInTheDocument()
    expect(screen.getByText(/Local Coords./)).toBeInTheDocument()
    expect(screen.getByText(/Chrom. Coords./)).toBeInTheDocument()

    /* First row data */
    expect(screen.getByText(/964 - 1203/)).toBeInTheDocument()
    expect(screen.getByText(/8028649 - 8028888/)).toBeInTheDocument()
  })
})
