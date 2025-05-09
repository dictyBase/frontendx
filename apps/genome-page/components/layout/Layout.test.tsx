import { render, screen } from "@testing-library/react"
import { TabValues, Layout } from "./Layout"

describe("Layout", () => {
  const defaultProps = {
    tabValue: TabValues.SUMMARY,
    gene: "dscA",
    title: "Test Gene Title",
    description: "Test gene description",
    children: <div>Test content</div>,
  }

  test("renders all four tabs correctly", () => {
    render(<Layout {...defaultProps} />)

    // Check if all four tabs are rendered with the correct labels
    expect(screen.getByText("Gene Summary")).toBeInTheDocument()
    expect(screen.getByText("Gene Ontology")).toBeInTheDocument()
    expect(screen.getByText("Phenotypes")).toBeInTheDocument()
    expect(screen.getByText("References")).toBeInTheDocument()
  })

  test("sets the correct href for each tab link", () => {
    render(<Layout {...defaultProps} />)

    // Check if tabs have the correct hrefs
    const summaryTab = screen.getByRole("tab", { name: "Gene Summary" })
    expect(summaryTab).toHaveAttribute("href", "/dscA")

    const goTab = screen.getByRole("tab", { name: "Gene Ontology" })
    expect(goTab).toHaveAttribute("href", "/dscA/goannotations")

    const phenotypesTab = screen.getByRole("tab", { name: "Phenotypes" })
    expect(phenotypesTab).toHaveAttribute("href", "/dscA/phenotypes")

    const referencesTab = screen.getByRole("tab", { name: "References" })
    expect(referencesTab).toHaveAttribute("href", "/dscA/references")
  })
})
