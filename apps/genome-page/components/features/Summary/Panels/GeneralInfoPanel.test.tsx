import { render, screen } from "@testing-library/react"
import { mockGeneralInfoData } from "mocks/mockGeneralInfoData"
import { mockGeneralInfoPiaA } from "mocks/piaAMocks/mockGeneralInfoPiaA"
import { GeneralInfoPanel } from "./GeneralInfoPanel"

// Mock the ItemDisplay component
jest.mock("components/panels/ItemDisplay", () => ({
  ItemDisplay: ({ children }: any) => (
    <div data-testid="item-display">{children}</div>
  ),
}))

// Mock the LeftDisplay component
jest.mock("components/panels/LeftDisplay", () => ({
  LeftDisplay: ({ children }: any) => (
    <div data-testid="left-display">{children}</div>
  ),
}))

// Mock the RightDisplay component
jest.mock("components/panels/RightDisplay", () => ({
  RightDisplay: ({ children }: any) => (
    <div data-testid="right-display">{children}</div>
  ),
}))

describe("features/Summary/Panels/GeneralInfoPanel", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render sadA general information", () => {
    render(<GeneralInfoPanel generalInformation={mockGeneralInfoData} />)

    // Check that the correct number of ItemDisplay components are rendered
    expect(screen.getAllByTestId("item-display")).toHaveLength(5)

    // Name Description
    expect(screen.getByText(/Name Description/)).toBeInTheDocument()
    expect(screen.getByText("sadA = Substrate ADhesion")).toBeInTheDocument()

    // dictyBase ID
    expect(screen.getByText("dictyBase ID")).toBeInTheDocument()
    expect(screen.getByText("DDB_G0288511")).toBeInTheDocument()

    // Gene Product
    expect(screen.getByText(/Gene Product/)).toBeInTheDocument()
    expect(screen.getByText("substrate adhesion molecule")).toBeInTheDocument()

    // Alternative Protein Names - sadA doesn't have any, but section should still exist
    expect(screen.getByText(/Alternative Protein Names/)).toBeInTheDocument()

    // Description
    expect(screen.getByText("Description")).toBeInTheDocument()
    expect(
      screen.getByText(
        "EGF repeat-containing 9 transmembrane molecule involved in substrate adhesion",
      ),
    ).toBeInTheDocument()
  })

  it("should render piaA with multiple name descriptions and alternative protein names", () => {
    render(<GeneralInfoPanel generalInformation={mockGeneralInfoPiaA} />)

    // Name Description - piaA has multiple name descriptions
    expect(screen.getByText(/Name Description/)).toBeInTheDocument()
    expect(screen.getByText(/pia = pianissimo/i)).toBeInTheDocument()
    expect(
      screen.getByText(/rictor = rapamycin-insensitive companion of mtor/i),
    ).toBeInTheDocument()

    // dictyBase ID
    expect(screen.getByText("dictyBase ID")).toBeInTheDocument()
    expect(screen.getByText("DDB_G0277399")).toBeInTheDocument()

    // Gene Product
    expect(screen.getByText(/Gene Product/)).toBeInTheDocument()
    expect(
      screen.getByText("cytosolic regulator of adenylyl cyclase PiaA"),
    ).toBeInTheDocument()

    // Alternative Protein Names
    expect(screen.getByText(/Alternative Protein Names/)).toBeInTheDocument()
    expect(
      screen.getByText(/Pianissimo, cytosolic regulator of adenylate cyclase/),
    ).toBeInTheDocument()

    // Description
    expect(screen.getByText("Description")).toBeInTheDocument()
    expect(
      screen.getByText(
        "required for receptor-mediated activation of adenylyl cyclase; component of the TORC2 (Tor complex 2) with Tor, Lst8, and Rip3 that plays a role in regulation of adenylate cyclase (ACA) and protein kinase B (PKB) activation during aggregation",
      ),
    ).toBeInTheDocument()
  })

  it("should handle missing or null values in the data", () => {
    // Create a mock with some undefined values
    const mockWithMissingData = {
      ...mockGeneralInfoData,
      gene_product: undefined, // Test undefined gene product
      description: undefined, // Test undefined description
    }

    render(<GeneralInfoPanel generalInformation={mockWithMissingData} />)

    // Gene Product - should render empty string for null value
    expect(screen.getByText(/Gene Product/)).toBeInTheDocument()

    // Description - should render empty string for null value
    expect(screen.getByText("Description")).toBeInTheDocument()

    // All sections should still be present
    expect(screen.getAllByTestId("item-display")).toHaveLength(5)
  })
})
