import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { RelatedGenesControls } from "./RelatedGenesControls"
import { GeneGroups } from "./GeneGroupSelect"

const filterGenesText = "Filter Genes"

describe("RelatedGenesControls", () => {
  const mockProperties = {
    totalGeneCount: 100,
    filteredGeneCount: 50,
    filter: "",
    onFilterChange: vi.fn(),
    group: GeneGroups.ALL,
    onGroupChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test("renders the component with all elements", () => {
    render(<RelatedGenesControls {...mockProperties} />)

    // Check for filter text field
    expect(screen.getByPlaceholderText(filterGenesText)).toBeInTheDocument()

    // Check for gene count text
    expect(screen.getByText("50 of 100 Genes")).toBeInTheDocument()

    // Check for filter icon (indirectly)
    const filterIcon = document.querySelector("button[disabled] svg")
    expect(filterIcon).toBeInTheDocument()

    // Check for gene group select
    expect(screen.getByText("All Gene Types")).toBeInTheDocument()
  })

  test("displays the correct gene counts", () => {
    const customProperties = {
      ...mockProperties,
      totalGeneCount: 75,
      filteredGeneCount: 25,
    }
    render(<RelatedGenesControls {...customProperties} />)
    expect(screen.getByText("25 of 75 Genes")).toBeInTheDocument()
  })

  test("handles filter text changes", async () => {
    const user = userEvent.setup()
    render(<RelatedGenesControls {...mockProperties} />)

    const filterInput = screen.getByPlaceholderText(filterGenesText)
    await user.type(filterInput, "abc")

    expect(mockProperties.onFilterChange).toHaveBeenCalled()
  })

  test("displays the current filter value", () => {
    const customProperties = {
      ...mockProperties,
      filter: "test-filter",
    }
    render(<RelatedGenesControls {...customProperties} />)

    const filterInput = screen.getByPlaceholderText(
      filterGenesText,
    ) as HTMLInputElement
    expect(filterInput.value).toBe("test-filter")
  })

  test("displays the correct gene group selection", () => {
    const namedGroupProperties = {
      ...mockProperties,
      group: GeneGroups.NAMED,
    }
    render(<RelatedGenesControls {...namedGroupProperties} />)

    // In Material-UI Select, the displayed value should be visible
    expect(screen.getByText("Named Genes")).toBeInTheDocument()
  })

  test("handles gene group changes", async () => {
    const user = userEvent.setup()
    render(<RelatedGenesControls {...mockProperties} />)

    // Open the select dropdown
    const selectElement = screen.getByText("All Gene Types")
    await user.click(selectElement)

    // Click on a different option
    const namedOption = screen.getByText("Named Genes")
    await user.click(namedOption)

    expect(mockProperties.onGroupChange).toHaveBeenCalled()
  })
})
