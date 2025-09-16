import { render, screen } from "@testing-library/react"
import { singlePhenotype } from "mocks/mockSinglePhenotype"
import { PhenotypesPageWrapper } from "./PhenotypesPageWrapper"

// Constants to avoid duplicated strings
const TEST_GENE = "sadA"

// Mock GraphQL document to avoid importing from dicty-graphql-schema
const mockUseListStrainsWithGeneQuery = vi.hoisted(() => vi.fn())

vi.mock("dicty-graphql-schema", () => ({
  GeneGeneralInformationSummaryDocument: {},
  useListStrainsWithGeneQuery: mockUseListStrainsWithGeneQuery,
}))

vi.mock("next/router", () => ({
  useRouter: () => ({
    query: { id: TEST_GENE },
  }),
}))

/* type ListStrainsWithGeneQuery = {
 *   __typename?: "Query"
 *   listStrainsWithGene?: Array<{
 *     __typename?: "Strain"
 *     id: string
 *     label: string
 *     characteristics?: Array<string> | null
 *     in_stock: boolean
 *     phenotypes?: Array<{
 *       __typename?: "Phenotype"
 *       phenotype: string
 *       publication?: {
 *         __typename?: "Publication"
 *         id: string
 *         title: string
 *         journal: string
 *         pages?: string | null
 *         volume?: string | null
 *         pub_date?: string | null
 *         authors: Array<{
 *           __typename?: "Author"
 *           last_name: string
 *           rank?: string | null
 *         }>
 *       } | null
 *     }> | null
 *   }> | null
 * }
 */

test("should query with the gene id in the provided in the route parameters", () => {
  render(<PhenotypesPageWrapper />)

  expect(mockUseListStrainsWithGeneQuery).toHaveBeenCalledWith({
    variables: {
      gene: TEST_GENE,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
    errorPolicy: "all",
  })
})

test("Renders loading state initially", async () => {
  // Mock the hook implementation for this test
  mockUseListStrainsWithGeneQuery.mockReturnValue({ loading: true })

  render(<PhenotypesPageWrapper />)

  // Should show title
  expect(screen.getByText(`Phenotypes for ${TEST_GENE}`)).toBeInTheDocument()
  // Should show loader
  expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
})

test("Renders an error display if listStrainsWithGene is null or undefined and an error is present", () => {
  // Mock the hook implementation for this test
  mockUseListStrainsWithGeneQuery.mockReturnValue({
    loading: false,
    error: { cause: { message: "test error" } },
    listStrainsWithGene: undefined,
  })
  render(<PhenotypesPageWrapper />)
  expect(screen.getByText("Error Details")).toBeInTheDocument()
})

test("Renders an empty display if listStrainsWithGene is null or undefined and there is no error", () => {
  // Mock the hook implementation for this test
  mockUseListStrainsWithGeneQuery.mockReturnValue({
    loading: false,
    error: undefined,
    data: { listStrainsWithGene: undefined },
  })
  render(<PhenotypesPageWrapper />)
  expect(screen.getByText(`No Phenotypes for ${TEST_GENE}`)).toBeInTheDocument()
})

test("Renders an empty display if all listStrainsWithGene.phenotypes is null or undefined and an error is present", () => {
  // Mock the hook implementation for this test
  mockUseListStrainsWithGeneQuery.mockReturnValue({
    loading: false,
    error: { cause: { message: "test error" } },
    data: { listStrainsWithGene: [{ phenotypes: undefined }] },
  })
  render(<PhenotypesPageWrapper />)
  expect(screen.getByText(`No Phenotypes for ${TEST_GENE}`)).toBeInTheDocument()
})

test("Renders an empty display if all listStrainsWithGene.phenotypes is null or undefined and there is no error", () => {
  // Mock the hook implementation for this test
  mockUseListStrainsWithGeneQuery.mockReturnValue({
    loading: false,
    data: { listStrainsWithGene: [{ phenotypes: undefined }] },
  })
  render(<PhenotypesPageWrapper />)
  expect(screen.getByText(`No Phenotypes for ${TEST_GENE}`)).toBeInTheDocument()
})

test("Renders an empty display if listStrainsWithGene is empty", () => {
  // Mock the hook implementation for this test
  mockUseListStrainsWithGeneQuery.mockReturnValue({
    loading: false,
    data: { listStrainsWithGene: [] },
  })
  render(<PhenotypesPageWrapper />)
  expect(screen.getByText(`No Phenotypes for ${TEST_GENE}`)).toBeInTheDocument()
})
test("Renders an empty display if all listStrainsWithGene.phenotypes is empty", () => {
  // Mock the hook implementation for this test
  mockUseListStrainsWithGeneQuery.mockReturnValue({
    loading: false,
    data: { listStrainsWithGene: [{ phenotypes: [] }] },
  })
  render(<PhenotypesPageWrapper />)
  expect(screen.getByText(`No Phenotypes for ${TEST_GENE}`)).toBeInTheDocument()
})

test("Renders a list of phenotypes if any listStrainsWithGene.phenotypes contains at least 1 phenotype", () => {
  // Mock the hook implementation for this test
  mockUseListStrainsWithGeneQuery.mockReturnValue({
    loading: false,
    data: {
      listStrainsWithGene: [
        {
          id: "1",
          label: "test1",
          characteristics: [],
          phenotypes: [singlePhenotype],
        },
        {
          id: "2",
          label: "test2",
          characteristics: [],
          phenotypes: [],
        },
      ],
    },
  })
  render(<PhenotypesPageWrapper />)
  // Expect the page to render two rows: 1 for the table header, and 1 for the phenotype
  expect(
    screen.getByText("aberrant actin filament organization"),
  ).toBeInTheDocument()
  expect(screen.getAllByRole("row")).toHaveLength(2)
})
