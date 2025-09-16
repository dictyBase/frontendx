import { Box } from "@material-ui/core"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { ReferencesToolbar } from "./ReferencesToolbar"

// Mock the ReferencesSearchBox component
vi.mock("./ReferenceSearchBox", () => ({
  ReferencesSearchBox: ({ fields }: { fields: string[] }) => (
    <Box data-testid="references-search-box">
      Mock Search Box with fields: {fields.join(", ")}
    </Box>
  ),
}))

const oldestFirstText = "Oldest First"

describe("ReferencesToolbar", () => {
  const defaultProps = {
    totalPublicationCount: 10,
    filteredPublicationCount: 10,
    order: "Newest First",
    setOrder: vi.fn(),
    searchFields: ["author", "title", "journal"],
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test("renders publication count when filtered count equals total count", () => {
    render(<ReferencesToolbar {...defaultProps} />)

    expect(screen.getByText("10 References")).toBeInTheDocument()
  })

  test("renders publication count when filtered count is less than total count", () => {
    render(
      <ReferencesToolbar
        {...defaultProps}
        filteredPublicationCount={5}
        totalPublicationCount={10}
      />,
    )

    expect(screen.getByText("5 of 10 References")).toBeInTheDocument()
  })

  test("renders singular 'Reference' when total count is 1", () => {
    render(
      <ReferencesToolbar
        {...defaultProps}
        totalPublicationCount={1}
        filteredPublicationCount={1}
      />,
    )

    expect(screen.getByText("1 Reference")).toBeInTheDocument()
  })

  test("renders plural 'References' when total count is greater than 1", () => {
    render(
      <ReferencesToolbar
        {...defaultProps}
        totalPublicationCount={5}
        filteredPublicationCount={5}
      />,
    )

    expect(screen.getByText("5 References")).toBeInTheDocument()
  })

  test("displays current order value in select", () => {
    render(<ReferencesToolbar {...defaultProps} order="Title (A to Z)" />)

    expect(screen.getByDisplayValue("Title (A to Z)")).toBeInTheDocument()
  })

  test("calls setOrder when select value changes", async () => {
    const user = userEvent.setup()
    const mockSetOrder = vi.fn()
    render(<ReferencesToolbar {...defaultProps} setOrder={mockSetOrder} />)

    const select = screen.getByRole("button", { name: /newest first/i })
    await user.click(select)

    const option = screen.getByRole("option", { name: oldestFirstText })
    await user.click(option)

    expect(mockSetOrder).toHaveBeenCalledWith(oldestFirstText)
  })

  test("renders all sort options", async () => {
    const user = userEvent.setup()
    render(<ReferencesToolbar {...defaultProps} />)

    const select = screen.getByRole("button", { name: /newest first/i })
    await user.click(select)

    expect(
      screen.getByRole("option", { name: "Newest First" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("option", { name: oldestFirstText }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("option", { name: "Title (A to Z)" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("option", { name: "Title (Z to A)" }),
    ).toBeInTheDocument()
  })

  test("renders ReferencesSearchBox with correct fields", () => {
    const searchFields = ["author", "title", "journal", "year"]
    render(<ReferencesToolbar {...defaultProps} searchFields={searchFields} />)

    expect(screen.getByTestId("references-search-box")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Mock Search Box with fields: author, title, journal, year",
      ),
    ).toBeInTheDocument()
  })

  test("renders with zero publications", () => {
    render(
      <ReferencesToolbar
        {...defaultProps}
        totalPublicationCount={0}
        filteredPublicationCount={0}
      />,
    )

    expect(screen.getByText(/0 references/i)).toBeInTheDocument()
  })

  test("handles edge case with filtered count greater than total count", () => {
    render(
      <ReferencesToolbar
        {...defaultProps}
        filteredPublicationCount={15}
        totalPublicationCount={10}
      />,
    )

    expect(screen.getByText("15 of 10 References")).toBeInTheDocument()
  })
})
