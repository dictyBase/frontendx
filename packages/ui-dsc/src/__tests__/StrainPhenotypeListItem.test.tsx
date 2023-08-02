import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Phenotype, Publication } from "dicty-graphql-schema"
import { MemoryRouter } from "react-router"
import { StrainPhenotypeListItem } from "../catalog/StrainPhenotypeListItem"

const mockData: Phenotype = {
  phenotype: "Test Phenotype",
  note: "Test Note",
  assay: "Test Assay",
  environment: "Test Environment",
  publication: {
    id: "1",
    title: "Test Publication",
  } as Publication,
}

test("StrainPhenotypeListItem component renders correctly", () => {
  render(
    <MemoryRouter>
      <StrainPhenotypeListItem data={mockData} />
    </MemoryRouter>,
  )

  const phenotypeLink = screen.getByRole("link", { name: "Test Phenotype" })
  expect(phenotypeLink).toBeInTheDocument()

  const note = screen.getByText("Test Note")
  expect(note).toBeInTheDocument()

  const assay = screen.getByText(
    (_, node) => node?.textContent === "Assay: Test Assay",
  )
  expect(assay).toBeInTheDocument()

  const environment = screen.getByText(
    (_, node) => node?.textContent === "Environment: Test Environment",
  )
  expect(environment).toBeInTheDocument()

  const publicationTitle = screen.getByText(/Test Publication/)
  expect(publicationTitle).toBeInTheDocument()
})
