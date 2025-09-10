import { test, expect } from "vitest"
import { screen, render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { EditableStrainDetailsCard } from "../catalog/EditableStrainDetailsCard"
import { strainWithPhenotype, availableStrain } from "../mocks/mockStrain"

test("Displays strain details", () => {
  render(
    <MemoryRouter>
      <EditableStrainDetailsCard
        data={strainWithPhenotype}
        tabValue={0}
        setTabValue={() => {}}
      />
    </MemoryRouter>,
  )

  expect(screen.getByText("Strain Descriptor")).toBeVisible()
  expect(screen.getByText("Strain Names")).toBeVisible()
  expect(screen.getByText("Strain Summary")).toBeVisible()
  expect(screen.getByText("Systematic Name")).toBeVisible()
  expect(screen.getByText("Strain Characteristics")).toBeVisible()
  expect(screen.getByText("Genetic Modification")).toBeVisible()
  expect(screen.getByText("Mutagenesis Method")).toBeVisible()
  expect(screen.getByText("Parental Strain")).toBeVisible()
  expect(screen.getByText("Plasmid")).toBeVisible()
  expect(screen.getByText("Associated Gene(s)")).toBeVisible()
  expect(screen.getByText("Genotype")).toBeVisible()
  expect(screen.getByText("Depositor")).toBeVisible()
  expect(screen.getByText("Reference(s)")).toBeVisible()
})

test("If the strain has 0 phenotypes, does not render a `Phenotypes` tab", () => {
  render(
    <MemoryRouter>
      <EditableStrainDetailsCard
        data={availableStrain}
        tabValue={1}
        setTabValue={() => {}}
      />
    </MemoryRouter>,
  )

  expect(screen.queryByText(/Phenotypes/)).toBeNull()
})

test("If the strain has 1 or more phenotypes, render a `Phenotypes` tab", () => {
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
