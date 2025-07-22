import { render, screen } from "@testing-library/react"
import { NoMatchDisplay } from "./NoMatchDisplay"

const helpText = "Try searching again using different terms"
const mainText = "No matches"
describe("NoMatchDisplay", () => {
  test("renders search icon", () => {
    const { container } = render(<NoMatchDisplay />)

    const searchIcon = container.querySelector(".MuiSvgIcon-root")
    expect(searchIcon).toBeInTheDocument()
    expect(searchIcon).toHaveClass("MuiSvgIcon-root")
  })

  test("renders 'No matches' heading", () => {
    render(<NoMatchDisplay />)

    const heading = screen.getByRole("heading", { name: mainText })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe("H2")
    expect(heading).toHaveClass("MuiTypography-h2")
  })

  test("renders help text", () => {
    render(<NoMatchDisplay />)

    const helpTextDisplay = screen.getByRole("heading", {
      name: helpText,
    })
    expect(helpTextDisplay).toBeInTheDocument()
    expect(helpTextDisplay.tagName).toBe("H4")
    expect(helpTextDisplay).toHaveClass("MuiTypography-h4")
  })

  test("renders grid container with proper layout", () => {
    render(<NoMatchDisplay />)

    const container = screen
      .getByRole("heading", { name: mainText })
      .closest(".MuiGrid-container")
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass("MuiGrid-direction-xs-column")
    expect(container).toHaveClass("MuiGrid-justify-content-xs-center")
    expect(container).toHaveClass("MuiGrid-align-items-xs-center")
  })

  test("renders all content in correct order", () => {
    const { container } = render(<NoMatchDisplay />)

    const searchIconItem = container
      .querySelector(".MuiSvgIcon-root")
      ?.closest(".MuiGrid-item")

    // Verify search icon comes first
    expect(searchIconItem).toBeInTheDocument()

    // Verify headings are in correct order
    const headings = screen.getAllByRole("heading")
    expect(headings[0]).toHaveTextContent(mainText)
    expect(headings[1]).toHaveTextContent(helpText)
  })

  test("has proper semantic structure", () => {
    render(<NoMatchDisplay />)

    // Check that we have exactly 2 headings with different levels
    const h2Heading = screen.getByRole("heading", { level: 2 })
    const h4Heading = screen.getByRole("heading", { level: 4 })

    expect(h2Heading).toHaveTextContent(mainText)
    expect(h4Heading).toHaveTextContent(helpText)
  })
})
