import { render, screen } from "@testing-library/react"
import { SelectedPublication } from "common/@types"
import { Gene } from "dicty-graphql-schema"
import { RelatedGenesHeader } from "./RelatedGenesHeader"

describe("RelatedGenesHeader", () => {
  // Sample publication data for testing
  const mockPublication: SelectedPublication = {
    id: "pub123",
    title: "Test Publication Title",
    journal: "Nature",
    pages: "123-145",
    authors: [
      { last_name: "Smith" },
      { last_name: "Johnson" },
      { last_name: "Williams" },
    ],
    related_genes: [
      { id: "DDB_G0123456", name: "geneA" },
      { id: "DDB_G0123457", name: "geneB" },
      { id: "DDB_G0123458", name: "geneC" },
    ] as Array<Gene>,
  }

  it("displays publication title, journal, and pages correctly", () => {
    render(<RelatedGenesHeader publication={mockPublication} />)

    // Check if title is rendered
    expect(screen.getByText(/test publication title/i)).toBeInTheDocument()

    // Check if journal is rendered
    expect(screen.getByText(/nature/i)).toBeInTheDocument()

    // Check if pages is rendered
    expect(screen.getByText(/123-145/i)).toBeInTheDocument()

    // Check the combined format (this regex matches the entire title line pattern)
    const titlePattern = new RegExp(
      `${mockPublication.title}.*${mockPublication.journal}.*${mockPublication.pages}`,
    )
    expect(
      screen.getByRole("heading", { name: titlePattern }),
    ).toBeInTheDocument()
  })

  it("displays authors correctly with commaSeparateWithAnd function", () => {
    render(<RelatedGenesHeader publication={mockPublication} />)

    // Check if authors are rendered in the expected format: "Smith, Johnson & Williams"
    expect(screen.getByText("Smith, Johnson & Williams")).toBeInTheDocument()
  })

  test("displays the number of related genes correctly", () => {
    render(<RelatedGenesHeader publication={mockPublication} />)

    // Check if the number of related genes is displayed correctly
    expect(
      screen.getByRole("heading", { name: /3 genes mentioned in/i }),
    ).toBeInTheDocument()
  })

  it("handles a single author correctly", () => {
    const singleAuthorPublication = {
      ...mockPublication,
      authors: [{ last_name: "Smith" }],
    }

    render(<RelatedGenesHeader publication={singleAuthorPublication} />)

    // Check if a single author is displayed correctly without commas or &
    expect(screen.getByText("Smith")).toBeInTheDocument()
  })

  it("handles multiple related genes correctly", () => {
    // Create a publication with more related genes
    const manyGenesPublication = {
      ...mockPublication,
      related_genes: new Array(15).fill(undefined).map((_, index) => ({
        id: `DDB_G0${index}`,
        name: `gene${index}`,
      })) as Array<Gene>,
    }

    render(<RelatedGenesHeader publication={manyGenesPublication} />)

    // Check if the number of related genes is displayed correctly
    expect(
      screen.getByRole("heading", { name: /15 genes mentioned in/i }),
    ).toBeInTheDocument()
  })
})
