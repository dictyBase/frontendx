import { render, screen } from "@testing-library/react"
import { mockGeneralInfoData } from "mocks/mockGeneralInfoData"
import { mockGeneralInfoPiaA } from "mocks/piaAMocks/mockGeneralInfoPiaA"
import { GeneralInfoPanel } from "./GeneralInfoPanel"

describe("features/Summary/Panels/GeneralInfoPanel", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render sadA", () => {
    render(<GeneralInfoPanel generalInformation={mockGeneralInfoData} />)

    // Name Description
    expect(screen.getByText(/Name Description/)).toBeInTheDocument()
    expect(screen.getByText("sadA = Substrate ADhesion")).toBeInTheDocument()

    // Gene Product
    expect(screen.getByText(/Gene Product/)).toBeInTheDocument()
    expect(screen.getByText("substrate adhesion molecule")).toBeInTheDocument()

    // Description
    expect(screen.getByText("Description")).toBeInTheDocument()
    expect(
      screen.getByText(
        "EGF repeat-containing 9 transmembrane molecule involved in substrate adhesion",
      ),
    ).toBeInTheDocument()
  })

  it("should render piaA", () => {
    render(<GeneralInfoPanel generalInformation={mockGeneralInfoPiaA} />)

    // Name Description
    expect(screen.getByText(/Name Description/)).toBeInTheDocument()

    // Alternate Gene Name
    // expect(screen.getByText(/Alternative Gene Names/)).toBeInTheDocument()
    // expect(screen.getByText(/DG1117/)).toBeInTheDocument()

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
})
