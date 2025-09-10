import { test, expect } from "vitest"
import { screen, render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { EditableStrainDetailsCard } from "../catalog/EditableStrainDetailsCard"
import { strainWithPhenotype } from "../mocks/mockStrain"

test("if the strain has 1 or more phenotypes, render a `Phenotypes` tab", () => {
  render(
    <MemoryRouter>
      <EditableStrainDetailsCard
        data={strainWithPhenotype}
        tabValue={1}
        setTabValue={() => {}}
      />
    </MemoryRouter>,
  )

  expect(screen.getByText(/Phenotypes/)).toBeInTheDocument()
})
