import { render, screen } from "@testing-library/react"
import { BlastOptionsRow } from "./BlastOptionsRow"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module -- ESM not supported by default as of Jest 29
const useRouter = jest.spyOn(require("next/router"), "useRouter")

const gene = "sadA"
const pathname = `gene/${gene}/phenotypes`

jest.mock("dicty-graphql-schema", () => {
  const useGeneQuery = jest.fn()
  return { useGeneQuery }
})

describe("features/blast/Sections/BlastOptionsRow", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render blast options row", async () => {
    useRouter.mockImplementation(() => ({
      query: { gene: "sadA" },
      pathname,
    }))
    render(<BlastOptionsRow />)

    expect(screen.getByText("Options")).toBeInTheDocument()
    expect(screen.getByText("E-value")).toBeInTheDocument()
    expect(screen.getByText("Number of alignments to show")).toBeInTheDocument()
    expect(screen.getByText("Word Size")).toBeInTheDocument()
    expect(screen.getByText("Matrix")).toBeInTheDocument()
    expect(screen.getByText("Gapped alignment")).toBeInTheDocument()
    expect(
      screen.getByText("DUST filter for BLASTN, SEG filter for all others."),
    ).toBeInTheDocument()
  })
})
