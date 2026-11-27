import { test, expect } from "vitest"
import { screen, render } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MockedProvider } from "@apollo/client/testing"
import { MemoryRouter } from "react-router-dom"
import { EditableStrainDetailsCard } from "../catalog/EditableStrainDetailsCard"
import { strainWithPhenotype, availableStrain } from "../mocks/mockStrain"

test("Displays strain details", () => {
  render(
    <MockedProvider addTypename={false}>
      <MemoryRouter>
        <EditableStrainDetailsCard
          data={strainWithPhenotype}
          tabValue={0}
          setTabValue={() => {}}
        />
      </MemoryRouter>
    </MockedProvider>,
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
  expect(screen.getByText("Species")).toBeVisible()
  expect(screen.getByText("Depositor")).toBeVisible()
  expect(screen.getByText("Reference(s)")).toBeVisible()
})

test("Renders Edit and Create buttons for strain detail rows", () => {
  render(
    <MockedProvider addTypename={false}>
      <MemoryRouter>
        <EditableStrainDetailsCard
          data={strainWithPhenotype}
          tabValue={0}
          setTabValue={() => {}}
        />
      </MemoryRouter>
    </MockedProvider>,
  )

  expect(
    screen.getAllByRole("button", { name: /^edit$/i }).length,
  ).toBeGreaterThan(0)
  expect(
    screen.getAllByRole("button", { name: /^create$/i }).length,
  ).toBeGreaterThan(0)
})

test("Allows opening inline edit mode for a strain field and canceling without changes", async () => {
  const user = userEvent.setup()

  render(
    <MockedProvider addTypename={false}>
      <MemoryRouter>
        <EditableStrainDetailsCard
          data={availableStrain}
          tabValue={0}
          setTabValue={() => {}}
        />
      </MemoryRouter>
    </MockedProvider>,
  )

  const editButtons = screen.getAllByRole("button", { name: /^edit$/i })
  await user.click(editButtons[0])

  const input = screen.getByDisplayValue(availableStrain.label)
  expect(input).toBeInTheDocument()

  await user.clear(input)
  await user.type(input, "modified-label")

  await user.click(screen.getByRole("button", { name: /cancel/i }))

  expect(screen.getByText(availableStrain.label)).toBeInTheDocument()
  expect(screen.queryByDisplayValue("modified-label")).not.toBeInTheDocument()
})

test("Renders gene links and publication references with delete and add controls", () => {
  const { container } = render(
    <MockedProvider addTypename={false}>
      <MemoryRouter>
        <EditableStrainDetailsCard
          data={availableStrain}
          tabValue={0}
          setTabValue={() => {}}
        />
      </MemoryRouter>
    </MockedProvider>,
  )

  expect(container.querySelector('a[href="/gene/aarA"]')).not.toBeNull()
  expect(screen.getByTestId("publication-display")).toBeInTheDocument()
  expect(screen.getByText("11084033")).toBeInTheDocument()
})

test("If the strain has 0 phenotypes, does not render a `Phenotypes` tab", () => {
  render(
    <MockedProvider addTypename={false}>
      <MemoryRouter>
        <EditableStrainDetailsCard
          data={availableStrain}
          tabValue={1}
          setTabValue={() => {}}
        />
      </MemoryRouter>
    </MockedProvider>,
  )

  expect(screen.queryByText(/Phenotypes/)).toBeNull()
})

test("If the strain has 1 or more phenotypes, render a `Phenotypes` tab", () => {
  render(
    <MockedProvider addTypename={false}>
      <MemoryRouter>
        <EditableStrainDetailsCard
          data={strainWithPhenotype}
          tabValue={1}
          setTabValue={() => {}}
        />
      </MemoryRouter>
    </MockedProvider>,
  )

  expect(screen.getByText(/Phenotypes/)).toBeInTheDocument()
})
