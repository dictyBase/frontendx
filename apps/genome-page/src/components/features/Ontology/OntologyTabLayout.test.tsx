import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { mockCorAOntologyData } from "mocks/mockOntologyData"
import { pipe } from "fp-ts/function"
import { Eq } from "fp-ts/string"
import { difference } from "fp-ts/Array"
import { OntologyTabLayout } from "./OntologyTabLayout"

test("renders fetched data", () => {
  render(<OntologyTabLayout goas={mockCorAOntologyData} />)

  // wait for data to load...
  const molecularPanel = screen.getByText(/Molecular Function/)
  expect(molecularPanel).toBeInTheDocument()
  const biologicalPanel = screen.getByText(/Biological Process/)
  expect(biologicalPanel).toBeInTheDocument()
  const cellularPanel = screen.getByText(/Cellular Component/)
  expect(cellularPanel).toBeInTheDocument()
  const innerTab = screen.getByText(/All GO/)
  expect(innerTab).toBeInTheDocument()
})

const ALL = [
  "IMP",
  "IGI",
  "TAS",
  "IEP",
  "HEP",
  "IEA",
  "IPI",
  "IBA",
  "IDA",
  "HDA",
]

const EXPERIMENTAL = ["IMP", "IGI", "IEP", "HEP", "IPI", "IDA", "HDA"]

const MANUAL_GO = [
  "IMP",
  "IGI",
  "TAS",
  "IEP",
  "HEP",
  "IPI",
  "IBA",
  "IDA",
  "HDA",
]

test.each(ALL)(
  "`All GO` tab renders all categories of GO annotation: %s",
  (evidenceCode) => {
    render(<OntologyTabLayout goas={mockCorAOntologyData} />)
    expect(screen.getAllByText(evidenceCode)).toBeDefined()
  },
)

test.each(EXPERIMENTAL)(
  "`Experimental GO` tab renders experimental GO annotations: %s",
  async (evidenceCode) => {
    const user = userEvent.setup()
    render(<OntologyTabLayout goas={mockCorAOntologyData} />)

    await user.click(screen.getByText("Experimental GO"))
    expect(screen.getAllByText(evidenceCode)).toBeDefined()
  },
)

test.each(pipe(ALL, difference(Eq)(EXPERIMENTAL)))(
  "`Experimental GO` tab does not render non-experimental GO annotations: %s",
  async (evidenceCode) => {
    const user = userEvent.setup()
    render(<OntologyTabLayout goas={mockCorAOntologyData} />)

    await user.click(screen.getByText("Experimental GO"))
    expect(screen.queryByText(evidenceCode)).toBeNull()
  },
)

test.each(MANUAL_GO)(
  "`Manual GO` tab renders Manual GO annotations: %s",
  async (evidenceCode) => {
    const user = userEvent.setup()
    render(<OntologyTabLayout goas={mockCorAOntologyData} />)

    await user.click(screen.getByText("Manual GO"))
    expect(screen.getAllByText(evidenceCode)).toBeDefined()
  },
)

test("`Manual GO` tab does not render electronic GO annotations: IEA", async () => {
  const user = userEvent.setup()
  render(<OntologyTabLayout goas={mockCorAOntologyData} />)

  await user.click(screen.getByText("Manual GO"))
  expect(screen.queryByText("IEA")).toBeNull()
})

test("`Electronic GO` tab renders electronic GO annotations: IEA", async () => {
  const user = userEvent.setup()
  render(<OntologyTabLayout goas={mockCorAOntologyData} />)

  await user.click(screen.getByText("Electronic GO"))
  expect(screen.getAllByText("IEA")).toBeDefined()
})

test.each(MANUAL_GO)(
  "`Electronic GO` tab does not render Manual GO annotations: %s",
  async (evidenceCode) => {
    const user = userEvent.setup()
    render(<OntologyTabLayout goas={mockCorAOntologyData} />)

    await user.click(screen.getByText("Electronic GO"))
    expect(screen.queryByText(evidenceCode)).toBeNull()
  },
)
