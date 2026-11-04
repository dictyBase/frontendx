import { test, expect } from "vitest"
import { render } from "@testing-library/react"
import { StockSearchFieldEnum } from "dicty-graphql-schema"
import { MatchFieldIcon } from "../catalog/MatchFieldIcon"

test("renders the tag icon for a name-like field", () => {
  const { getByTestId } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.Label} />,
  )
  expect(getByTestId("TagIcon")).toBeInTheDocument()
})

test("renders the flask icon for an assay match", () => {
  const { getByTestId } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.Assay} />,
  )
  expect(getByTestId("ScienceIcon")).toBeInTheDocument()
})

test("renders the thermostat icon for an environment match", () => {
  const { getByTestId } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.Environment} />,
  )
  expect(getByTestId("ThermostatIcon")).toBeInTheDocument()
})

test("renders the biotech icon for a genetics match", () => {
  const { getByTestId } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.Genes} />,
  )
  expect(getByTestId("BiotechIcon")).toBeInTheDocument()
})

test("renders the visibility icon for a phenotype match", () => {
  const { getByTestId } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.Phenotype} />,
  )
  expect(getByTestId("VisibilityIcon")).toBeInTheDocument()
})

test("renders the species icon for a species match", () => {
  const { getByTestId } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.Species} />,
  )
  expect(getByTestId("CategoryIcon")).toBeInTheDocument()
})

test("renders the person icon for a depositor match", () => {
  const { getByTestId } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.Depositor} />,
  )
  expect(getByTestId("PersonIcon")).toBeInTheDocument()
})

test("renders the link icon for a cross-reference match", () => {
  const { getByTestId } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.Dbxrefs} />,
  )
  expect(getByTestId("LinkIcon")).toBeInTheDocument()
})

test("renders the menu book icon for an ontology term match", () => {
  const { getByTestId } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.TermLabel} />,
  )
  expect(getByTestId("MenuBookIcon")).toBeInTheDocument()
})

test("renders the notes icon for a summary match", () => {
  const { getByTestId } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.Summary} />,
  )
  expect(getByTestId("NotesIcon")).toBeInTheDocument()
})

test("renders a custom plasmid icon for a plasmid field match", () => {
  const { container } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.Plasmid} />,
  )
  expect(container.querySelector("svg")).toBeTruthy()
})

test("hides the icon from assistive technology", () => {
  const { container } = render(
    <MatchFieldIcon field={StockSearchFieldEnum.Label} />,
  )
  expect(container.querySelector("svg[aria-hidden='true']")).toBeTruthy()
})
