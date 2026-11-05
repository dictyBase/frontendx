import { test, expect } from "vitest"
import { screen, render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { StrainDetailsCard } from "../catalog/StrainDetailsCard"
import { strainWithPhenotype, availableStrain } from "../mocks/mockStrain"
// availableStrain is used for the full-details test because it has
// publications, a named gene and all other fields populated.

test("Displays strain details", () => {
  render(
    <MemoryRouter>
      <StrainDetailsCard
        data={availableStrain}
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
      <StrainDetailsCard
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
      <StrainDetailsCard
        data={strainWithPhenotype}
        tabValue={1}
        setTabValue={() => {}}
      />
    </MemoryRouter>,
  )

  expect(screen.getByText(/Phenotypes/)).toBeInTheDocument()
})

test("does not render an 'Associated Gene(s)' row when all genes have blank names", () => {
  const strainWithBlankGene = {
    ...availableStrain,
    genes: [{ __typename: "Gene", name: "" }],
  } as typeof availableStrain
  const { container } = render(
    <MemoryRouter>
      <StrainDetailsCard
        data={strainWithBlankGene}
        tabValue={0}
        setTabValue={() => {}}
      />
    </MemoryRouter>,
  )
  expect(screen.queryByText("Associated Gene(s)")).not.toBeInTheDocument()
  expect(container.querySelector('a[href="/gene/"]')).toBeNull()
})

test("renders a gene tag for every named gene", () => {
  const strainWithGenes = {
    ...availableStrain,
    genes: [
      { __typename: "Gene", name: "sadA" },
      { __typename: "Gene", name: "gflB" },
    ],
  } as typeof availableStrain
  const { container } = render(
    <MemoryRouter>
      <StrainDetailsCard
        data={strainWithGenes}
        tabValue={0}
        setTabValue={() => {}}
      />
    </MemoryRouter>,
  )
  expect(container.querySelector('a[href="/gene/sadA"]')).not.toBeNull()
  expect(container.querySelector('a[href="/gene/gflB"]')).not.toBeNull()
})
