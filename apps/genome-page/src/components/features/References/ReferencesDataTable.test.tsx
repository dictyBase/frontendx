import { render, screen } from "@testing-library/react"
import { mockReferencesData } from "mocks/mockReferencesData"
import { ReferencesDataTable } from "./ReferencesDataTable"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module -- ESM not supported by default as of Jest 29
const useRouter = vi.spyOn(require("next/router"), "useRouter")

const gene = "sadA"
const pathname = `gene/${gene}/references`

describe("features/References/ReferencesDataTable", () => {
  test("Displays text 'Reference' when there is only a single publication item", () => {
    useRouter.mockImplementation(() => ({
      query: { id: gene },
      pathname,
    }))
    render(
      <ReferencesDataTable publications={mockReferencesData.slice(0, 1)} />,
    )

    // Renders skeleton loading
    expect(screen.getByText(/1 Reference/)).toBeInTheDocument()
  })
  test("Displays text 'References' when there are mulitple publication items", () => {
    useRouter.mockImplementation(() => ({
      query: { id: gene },
      pathname,
    }))
    render(<ReferencesDataTable publications={mockReferencesData} />)

    // Renders skeleton loading
    expect(screen.getByText(/14 References/)).toBeInTheDocument()
  })
})
