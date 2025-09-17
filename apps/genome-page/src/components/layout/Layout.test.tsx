import { expect, test } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { Box } from "@material-ui/core"
import { render, screen } from "@testing-library/react"
import { TabValues, Layout } from "./Layout"

const defaultProps = {
  tabValue: TabValues.SUMMARY,
  gene: "dscA",
  title: "Test Gene Title",
  description: "Test gene description",
  children: <Box>Test content</Box>,
}

test("renders all four tabs correctly", () => {
  render(
    <MemoryRouter>
      <Layout {...defaultProps} />
    </MemoryRouter>,
  )

  // Check if all four tabs are rendered with the correct labels
  expect(screen.getByText("Gene Summary")).toBeInTheDocument()
  expect(screen.getByText("Gene Ontology")).toBeInTheDocument()
  expect(screen.getByText("Phenotypes")).toBeInTheDocument()
  expect(screen.getByText("References")).toBeInTheDocument()
})

test("sets the correct href for each tab link", () => {
  render(
    <MemoryRouter>
      <Layout {...defaultProps} />
    </MemoryRouter>,
  )

  // Check if tabs have the correct hrefs
  const summaryTab = screen.getByRole("link", { name: "Gene Summary" })
  expect(summaryTab).toHaveAttribute("href", "/dscA")

  const goTab = screen.getByRole("link", { name: "Gene Ontology" })
  expect(goTab).toHaveAttribute("href", "/dscA/goannotations")

  const phenotypesTab = screen.getByRole("link", { name: "Phenotypes" })
  expect(phenotypesTab).toHaveAttribute("href", "/dscA/phenotypes")

  const referencesTab = screen.getByRole("link", { name: "References" })
  expect(referencesTab).toHaveAttribute("href", "/dscA/references")
})
