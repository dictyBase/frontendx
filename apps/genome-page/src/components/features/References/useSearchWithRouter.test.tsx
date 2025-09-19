import { vi, expect, test, beforeEach } from "vitest"
import { Box } from "@material-ui/core"
import { render, screen } from "@testing-library/react"
import { renderHook, act } from "@testing-library/react-hooks"
import { useParams, useSearchParams } from "react-router-dom"
import {
  useSearchWithRouter,
  useSearchParameters,
  getActiveOptionLabel,
} from "./useSearchWithRouter"

/* eslint-disable sonarjs/no-duplicate-string, unicorn/no-null */

// Mock React Router
vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
  useSearchParams: vi.fn(),
  useNavigate: vi.fn(),
}))

describe("useSearchParameters", () => {
  const mockSetSearchParameters = vi.fn()
  const mockSearchParameters = new URLSearchParams("author=smith&year=2020")

  beforeEach(() => {
    vi.clearAllMocks()
    // Setup mock router for each test
    vi.mocked(useParams).mockReturnValue({ id: "sadA" })
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParameters,
      mockSetSearchParameters,
    ])
  })

  test("should filter search parameters based on provided fields", () => {
    const fields = ["author", "year"]
    const { result } = renderHook(() => useSearchParameters(fields))
    const [searchParameters] = result.current

    expect(searchParameters).toEqual({ author: "smith", year: "2020" })
    expect(searchParameters).not.toHaveProperty("gene")
  })

  test("should update search parameters correctly", () => {
    // useSearchParams should be called with the
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams("author=smith&year=2020&month=september"),
      mockSetSearchParameters,
    ])

    const fields = ["author", "year"]
    const { result } = renderHook(() => useSearchParameters(fields))
    const [, setSearchParameters] = result.current

    act(() => {
      setSearchParameters({ author: ["johnson", "tun"], year: "2021" })
    })

    const expectedURLSearchParameters = new URLSearchParams({
      month: "september", // Does not remove params not included in `fields`.
      author: "johnson,tun", // Handles arrays of values
      year: "2021",
    })

    expect(mockSetSearchParameters).toHaveBeenCalledWith(
      expectedURLSearchParameters,
    )
  })
})

describe("getActiveOptionLabel", () => {
  test("should return capitalized last element from array", () => {
    const values = ["author", "title", "gene"]
    const result = getActiveOptionLabel(values)

    expect(result).toBe("Gene")
  })

  test("should return capitalized single element", () => {
    const values = ["author"]
    const result = getActiveOptionLabel(values)

    expect(result).toBe("Author")
  })

  test("should return empty string for empty array", () => {
    const values: string[] = []
    const result = getActiveOptionLabel(values)

    expect(result).toBe("")
  })

  test("should handle array with empty string", () => {
    const values = ["author", ""]
    const result = getActiveOptionLabel(values)

    expect(result).toBe("")
  })

  test("should capitalize first character correctly", () => {
    const values = ["authorName"]
    const result = getActiveOptionLabel(values)

    expect(result).toBe("AuthorName")
  })

  test("should handle special characters", () => {
    const values = ["author-name"]
    const result = getActiveOptionLabel(values)

    expect(result).toBe("Author-name")
  })
})

describe("useSearchWithRouter", () => {
  const mockSetSearchParameters = vi.fn()
  const mockSearchParameters = new URLSearchParams(
    "author=smith&title=dicty&gene=sadA",
  )

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useSearchParams).mockReturnValue([
      mockSearchParameters,
      mockSetSearchParameters,
    ])
  })

  test("should initialize with correct values from URL", () => {
    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      }),
    )
    expect(result.current.value).toContain("title")
    expect(result.current.value).toContain("author")
    expect(result.current.value).toContain("gene")
    expect(result.current.isAcceptingInput).toBe(false)
  })

  test("should handle onChange when selecting an option", () => {
    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      }),
    )

    act(() => {
      result.current.onChange(null, ["author", "gene"], "select-option")
    })

    expect(result.current.value).toEqual(["author", "gene"])
    expect(result.current.isAcceptingInput).toBe(true)
  })

  test("should handle onInputChange for user input", () => {
    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      }),
    )

    // First select a field
    act(() => {
      result.current.onChange(null, ["gene"], "select-option")
    })

    // Then type in the input
    act(() => {
      result.current.onInputChange(
        { type: "change" } as React.ChangeEvent<{}>,
        "nature",
        "input",
      )
    })

    expect(result.current.input).toEqual({
      user: "nature",
      userCopy: "nature",
    })
  })

  test("should not update input when event type is invalid", () => {
    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      }),
    )

    // First select a field to make isAcceptingInput true
    act(() => {
      result.current.onChange(null, ["gene"], "select-option")
    })

    const initialInput = result.current.input

    // Try to change input with invalid event type
    act(() => {
      result.current.onInputChange(
        { type: "click" } as React.ChangeEvent<{}>,
        "nature",
        "input",
      )
    })

    // Input should not have changed
    expect(result.current.input).toEqual(initialInput)
  })

  test("should not update input when not accepting input", () => {
    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      }),
    )

    // Verify isAcceptingInput is false initially
    expect(result.current.isAcceptingInput).toBe(false)

    const initialInput = result.current.input

    // Try to change input when not accepting input
    act(() => {
      result.current.onInputChange(
        { type: "change" } as React.ChangeEvent<{}>,
        "nature",
        "input",
      )
    })

    // Input should not have changed
    expect(result.current.input).toEqual(initialInput)
    expect(result.current.isAcceptingInput).toBe(false)
  })

  test("should handle onInputChange when completing input", () => {
    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      }),
    )

    // First select a field
    act(() => {
      result.current.onChange(null, ["gene"], "select-option")
    })

    // Type in the input
    act(() => {
      result.current.onInputChange(
        { type: "change" } as React.ChangeEvent<{}>,
        "nature",
        "input",
      )
    })

    // Complete the input (e.g., press Enter)
    act(() => {
      result.current.onInputChange(
        { type: "keydown" } as React.ChangeEvent<{}>,
        "nature",
        "create-option",
      )
    })

    expect(result.current.isAcceptingInput).toBe(false)
    expect(result.current.activeChipValue).toBe("gene: nature")
  })
  test("should handle onDeleteChip correctly", () => {
    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      }),
    )

    // Delete the "author: smith" chip
    act(() => {
      result.current.onDeleteChip("author: smith")
    })

    expect(result.current.value).not.toContain("author")
  })

  test("should filter fields correctly", () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({
        title: "dicty",
        author: "smith,tun",
        nonField: "test",
      }),
      vi.fn(),
    ])
    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene", "year"],
        help: "Search help text",
      }),
    )

    const filteredFields = result.current.filterFields([
      "author",
      "title",
      "gene",
      "year",
    ])
    // When not accepting input, should filter out already selected fields
    expect(filteredFields).toContain("gene")
    expect(filteredFields).toContain("year")
    expect(filteredFields).not.toContain("author")
    expect(filteredFields).not.toContain("title")

    // When accepting input, should return empty array
    act(() => {
      result.current.onChange(null, ["author", "gene"], "select-option")
    })

    expect(
      result.current.filterFields(["author", "title", "gene", "year"]),
    ).toEqual([])
  })

  test("should render tags correctly", () => {
    // Mock the router query to have exactly two items for this test
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ title: "dicty", author: "smith" }),
      vi.fn(),
    ])

    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title"], // Only include author and title fields
        help: "Search help text",
      }),
    )

    // Create a wrapper component to render the tags
    const TagsWrapper = () => (
      <Box data-testid="tags-container">
        {result.current.renderTags(["author", "title"])}
      </Box>
    )

    // Render the wrapper component
    render(<TagsWrapper />)

    // Get the container and count its children
    const container = screen.getByTestId("tags-container")
    const tagElements = container.children

    // Verify we have exactly 2 tag elements
    expect(tagElements.length).toBe(2) // "author: smith" and "title: dicty"
  })

  test("should render tags correctly when isAcceptingInput is false", () => {
    // Mock the router query with initial data
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ author: "smith" }),
      vi.fn(),
    ])

    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      }),
    )

    // Select a new field to make isAcceptingInput true
    act(() => {
      result.current.onChange(null, ["author", "gene"], "select-option")
    })

    // Add input
    act(() => {
      result.current.onInputChange(
        { type: "change" } as React.ChangeEvent<{}>,
        "nature",
        "input",
      )
    })

    // Complete the input to make isAcceptingInput false
    act(() => {
      result.current.onInputChange(
        { type: "keydown" } as React.ChangeEvent<{}>,
        "nature",
        "create-option",
      )
    })

    // Verify isAcceptingInput is false
    expect(result.current.isAcceptingInput).toBe(false)

    // Create a wrapper component to render the tags
    const TagsWrapper = () => (
      <Box data-testid="tags-container">
        {result.current.renderTags(["author", "gene"])}
      </Box>
    )

    // Render the wrapper component
    render(<TagsWrapper />)

    // Get the container and count its children
    const container = screen.getByTestId("tags-container")
    const tagElements = container.children

    // When isAcceptingInput is false, should render SearchTerm components
    // for previousChipValue and activeChipValue (excluding empty strings)
    expect(tagElements.length).toBe(2) // "author: smith" and "gene: nature"
  })

  test("should render input correctly", () => {
    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      }),
    )

    const mockParameters = {
      InputProps: {},
      inputProps: {},
    } as any

    const input = result.current.renderInput(mockParameters)

    // Verify the rendered input has the correct props
    expect(input.props.label).toBe("Search")
    expect(input.props.variant).toBe("outlined")
    expect(input.props.fullWidth).toBe(true)
  })

  test("should render option correctly", () => {
    const { result } = renderHook(() =>
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      }),
    )

    const option = result.current.renderOption("author")

    // Verify the option has the correct label (capitalized)
    expect(option.props.label).toBe("Author")
  })
})
