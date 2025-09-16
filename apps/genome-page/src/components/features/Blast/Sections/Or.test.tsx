import { render, screen } from "@testing-library/react"
import { Or } from "./Or"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module -- ESM not supported by default as of Jest 29
const useRouter = vi.spyOn(require("next/router"), "useRouter")

const gene = "sadA"
const pathname = `gene/${gene}/phenotypes`

vi.mock("dicty-graphql-schema", () => {
  const useGeneQuery = vi.fn()
  return { useGeneQuery }
})

describe("features/blast/Sections/Or", () => {
  beforeEach(() => vi.clearAllMocks())

  it("should render or", async () => {
    useRouter.mockImplementation(() => ({
      query: { gene: "sadA" },
      pathname,
    }))
    render(<Or />)

    expect(screen.getByText("OR")).toBeInTheDocument()
  })
})
