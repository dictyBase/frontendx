import { render, screen } from "@testing-library/react"
import Or from "./Or"
const useRouter = jest.spyOn(require("next/router"), "useRouter")
const gene = "sadA"
const pathname = `gene/${gene}/phenotypes`

jest.mock("dicty-graphql-schema", () => {
  const useGeneQuery = jest.fn()
  return { useGeneQuery }
})

describe("features/blast/Sections/Or", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render or", async () => {
    useRouter.mockImplementation(() => ({
      query: { gene: "sadA" },
      pathname: pathname,
    }))
    render(<Or />)

    expect(screen.getByText("OR")).toBeInTheDocument()
  })
})
