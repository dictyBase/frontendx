import { render, screen } from "@testing-library/react"
import BlastButtonsRow from "./BlastButtonsRow"
const useRouter = jest.spyOn(require("next/router"), "useRouter")
const gene = "sadA"
const pathname = `gene/${gene}/phenotypes`

jest.mock("dicty-graphql-schema", () => {
  const useGeneQuery = jest.fn()
  return { useGeneQuery }
})

describe("features/blast/Sections/BlastButtonsRow", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render blast buttons row", async () => {
    useRouter.mockImplementation(() => ({
      query: { gene: "sadA" },
      pathname: pathname,
    }))
    render(<BlastButtonsRow />)

    expect(screen.getByText("BLAST")).toBeInTheDocument()
    expect(screen.getByText("Reset")).toBeInTheDocument()
    expect(screen.getByText("BLAST at NCBI")).toBeInTheDocument()
  })
})
