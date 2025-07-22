import { render, screen } from "@testing-library/react"
import { SummaryContainer } from "./SummaryContainer"

// Mock the Typography component from Material-UI
jest.mock("@material-ui/core/Typography", () => ({
  __esModule: true,
  default: ({ children, component }: any) => (
    <div data-testid="typography" data-component={component}>
      {children}
    </div>
  ),
}))

// Mock the query components
jest.mock("components/features/Summary/Panels/GeneralInfoQuery", () => ({
  GeneralInfoQuery: () => (
    <div data-testid="general-info-query">General Info Query</div>
  ),
}))

jest.mock("components/features/Summary/Panels/GoaQuery", () => ({
  GoaQuery: () => <div data-testid="goa-query">GOA Query</div>,
}))

jest.mock("components/features/Summary/Panels/ReferencesQuery", () => ({
  ReferencesQuery: () => (
    <div data-testid="references-query">References Query</div>
  ),
}))

describe("features/Summary/SummaryContainer", () => {
  it("should render all panel components", () => {
    render(<SummaryContainer />)

    // Check that Typography component was rendered
    expect(screen.getByTestId("typography")).toBeInTheDocument()

    // Check that Typography has correct component prop
    expect(screen.getByTestId("typography")).toHaveAttribute(
      "data-component",
      "div",
    )

    // Check that all query components are rendered
    expect(screen.getByTestId("general-info-query")).toBeInTheDocument()
    expect(screen.getByTestId("goa-query")).toBeInTheDocument()
    expect(screen.getByTestId("references-query")).toBeInTheDocument()

    // Check the order of the components (this is important for layout)
    const queryComponents = screen.getAllByTestId(/-query$/)
    expect(queryComponents[0]).toHaveTextContent("General Info Query")
    expect(queryComponents[1]).toHaveTextContent("GOA Query")
    expect(queryComponents[2]).toHaveTextContent("References Query")
  })
})
