import { render, screen } from "@testing-library/react"
import { GeneQuery } from "dicty-graphql-schema"
import mockGene from "mocks/mockGene"
import ReferencesContainer from "./ReferencesContainer"
const useRouter = jest.spyOn(require("next/router"), "useRouter")
const gene = "sadA"
const pathname = `gene/${gene}/references`

jest.mock("dicty-graphql-schema", () => {
  const useGeneQuery = jest.fn()
  return { useGeneQuery }
})

describe("features/References/ReferencesContainer", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render data", () => {
    useRouter.mockImplementation(() => ({
      query: { id: gene },
      pathname: pathname,
    }))
    render(<ReferencesContainer gene={mockGene as GeneQuery} />)

    // Renders skeleton loading
    expect(screen.getByText("Reference")).toBeInTheDocument()
    expect(screen.getByText(/Other Genes Mentioned/)).toBeInTheDocument()
    expect(screen.getByText("ctxA")).toBeInTheDocument()
  })
})
