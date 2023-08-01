import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StrainPhenotypeListHeader } from "../catalog/StrainPhenotypeListHeader"

test("renders ", () => {
  render(<StrainPhenotypeListHeader />)
  expect(screen.getByText(/Phenotype/)).toBeInTheDocument()
  expect(screen.getByText(/Notes/)).toBeInTheDocument()
  expect(screen.getByText(/Assay/)).toBeInTheDocument()
})
