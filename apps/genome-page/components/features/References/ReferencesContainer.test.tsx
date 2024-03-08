import { render, screen } from "@testing-library/react"
import { GeneQuery } from "dicty-graphql-schema"
import { mockGene } from "mocks/mockGene"
import { ReferencesContainer } from "./ReferencesContainer"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module -- ESM not supported by default as of Jest 29
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
      pathname,
    }))
    render(<ReferencesContainer gene={mockGene as GeneQuery} />)

    // Renders skeleton loading
    expect(screen.getByText("Reference")).toBeInTheDocument()
    expect(screen.getByText(/Other Genes Mentioned/)).toBeInTheDocument()
    expect(screen.getByText("ctxA")).toBeInTheDocument()
  })
})
