import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { StrainDetailsCard } from "../catalog/StrainDetailsCard"
import { strainWithPhenotype } from "../mocks/mockStrain"

test("if the strain has 1 or more phenotypes, render a `Phenotypes` tab ", () => {
  render(
    <MemoryRouter>
      <StrainDetailsCard data={strainWithPhenotype} />
    </MemoryRouter>,
  )

  expect(screen.getByText(/Phenotypes/)).toBeInTheDocument()
})
