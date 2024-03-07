import { render, screen } from "@testing-library/react"
import { QuerySection } from "./QuerySection"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module -- ESM not supported by default as of Jest 29
const useRouter = jest.spyOn(require("next/router"), "useRouter")

const gene = "sadA"
const pathname = `gene/${gene}/phenotypes`

jest.mock("dicty-graphql-schema", () => {
  const useGeneQuery = jest.fn()
  return { useGeneQuery }
})

describe("features/blast/Sections/QuerySection", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render QuerySection", async () => {
    useRouter.mockImplementation(() => ({
      query: { gene: "sadA" },
      pathname,
    }))
    render(<QuerySection />)

    expect(
      screen.getByText("Enter query sequence in FASTA format"),
    ).toBeInTheDocument()
    expect(screen.getByText("Query Sequence")).toBeInTheDocument()
  })
})
