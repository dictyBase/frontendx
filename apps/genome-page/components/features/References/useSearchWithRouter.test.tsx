import { render, screen } from "@testing-library/react"
import { renderHook, act } from "@testing-library/react-hooks"
import { useSearchWithRouter, useSearchParameters } from "./useSearchWithRouter"
import { useRouter } from "next/router"

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

describe("useSearchParameters", () => {
  const mockReplace = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    // Setup mock router for each test
    ;(useRouter as jest.Mock).mockReturnValue({
      query: { gene: "sadA", author: "smith", year: "2020" },
      replace: mockReplace,
    })
  })

  test("should filter search parameters based on provided fields", () => {
    const fields = ["author", "year"]
    const { result } = renderHook(() => useSearchParameters(fields))
    const [searchParams] = result.current
    
    expect(searchParams).toEqual({ author: "smith", year: "2020" })
    expect(searchParams).not.toHaveProperty("gene")
  })

  test("should update search parameters correctly", () => {
    const fields = ["author", "year"]
    const { result } = renderHook(() => useSearchParameters(fields))
    const [, setSearchParams] = result.current
    
    act(() => {
      setSearchParams({ author: "johnson", year: "2021" })
    })
    
    expect(mockReplace).toHaveBeenCalledWith({
      query: {
        gene: "sadA", // Dynamic route parameter preserved
        author: "johnson",
        year: "2021",
      },
    })
  })
})

describe("useSearchWithRouter", () => {
  const mockReplace = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    // Setup mock router for each test
    ;(useRouter as jest.Mock).mockReturnValue({
      query: { gene: "sadA", author: "smith", title: "dicty" },
      replace: mockReplace,
    })
  })

  test("should initialize with correct values from URL", () => {
    const { result } = renderHook(() => 
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      })
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
      })
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
      })
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
        "input"
      )
    })
    
    expect(result.current.input).toEqual({
      user: "nature",
      userCopy: "nature",
    })
  })

  test("should handle onInputChange when completing input", () => {
    const { result } = renderHook(() => 
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      })
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
        "input"
      )
    })
    
    // Complete the input (e.g., press Enter)
    act(() => {
      result.current.onInputChange(
        { type: "keydown" } as React.ChangeEvent<{}>,
        "nature",
        "create-option"
      )
    })
    
    expect(result.current.isAcceptingInput).toBe(false)
    expect(result.current.activeChipValue).toBe("gene: nature")
    expect(mockReplace).toHaveBeenCalledWith({
      query: {
        gene: "nature",
        author: "smith",
        title: "dicty",
      },
    })
  })

  test("should handle onDeleteChip correctly", () => {
    const { result } = renderHook(() => 
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      })
    )
    
    // Delete the "author: smith" chip
    act(() => {
      result.current.onDeleteChip("author: smith")
    })
    
    expect(result.current.value).not.toContain("author")
    expect(mockReplace).toHaveBeenCalledWith({
      query: {
        gene: "sadA",
        title: "dicty",
      },
    })
  })

  test("should filter fields correctly", () => {
    const { result } = renderHook(() => 
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene", "year"],
        help: "Search help text",
      })
    )
    
    // When not accepting input, should filter out already selected fields
    expect(result.current.filterFields(["author", "title", "gene", "year"]))
      .toEqual(["gene", "year"])
    
    // When accepting input, should return empty array
    act(() => {
      result.current.onChange(null, ["author", "gene"], "select-option")
    })
    
    expect(result.current.filterFields(["author", "title", "gene", "year"]))
      .toEqual([])
  })

  test("should render tags correctly", () => {
    // Mock the router query to have exactly two items for this test
    ;(useRouter as jest.Mock).mockReturnValue({
      query: { author: "smith", title: "dicty" },
      replace: jest.fn(),
    })
    
    const { result } = renderHook(() => 
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title"], // Only include author and title fields
        help: "Search help text",
      })
    )
    
    // Create a wrapper component to render the tags
    const TagsWrapper = () => <div data-testid="tags-container">{result.current.renderTags(["author", "title"])}</div>
    
    // Render the wrapper component
    render(<TagsWrapper />)
    
    // Get the container and count its children
    const container = screen.getByTestId("tags-container")
    const tagElements = container.children
    
    // Verify we have exactly 2 tag elements
    expect(tagElements.length).toBe(2) // "author: smith" and "title: dicty"
  })

  test("should render input correctly", () => {
    const { result } = renderHook(() => 
      useSearchWithRouter({
        label: "Search",
        fields: ["author", "title", "gene"],
        help: "Search help text",
      })
    )
    
    const mockParams = {
      InputProps: {},
      inputProps: {},
    } as any
    
    const input = result.current.renderInput(mockParams)
    
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
      })
    )
    
    const option = result.current.renderOption("author")
    
    // Verify the option has the correct label (capitalized)
    expect(option.props.label).toBe("Author")
  })
})
