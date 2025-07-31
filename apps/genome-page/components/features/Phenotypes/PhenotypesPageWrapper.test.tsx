import { render, screen } from "@testing-library/react"
import { PhenotypesPageWrapper } from "./PhenotypesPageWrapper"

// Constants to avoid duplicated strings
const GRAPHQL_SCHEMA_MODULE = "dicty-graphql-schema"
const TEST_GENE = "sadA"

// Mock GraphQL document to avoid importing from dicty-graphql-schema
jest.mock("dicty-graphql-schema", () => ({
  GeneGeneralInformationSummaryDocument: {},
  useListStrainsWithGeneQuery: jest.fn(),
}))

jest.mock("next/router", () => ({
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
  const { useListStrainsWithGeneQuery } = jest.requireMock(
    GRAPHQL_SCHEMA_MODULE,
  )
  render(<PhenotypesPageWrapper />)

  expect(useListStrainsWithGeneQuery).toHaveBeenCalledWith({
    variables: {
      gene: TEST_GENE,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
    errorPolicy: "all",
  })
})

test("Renders an error display if listStrainsWithGene is null or undefined and an error is present", () => {})
test("Renders an empty display if listStrainsWithGene.phenotypes is null or undefined and an error is present", () => {})

test("Renders an empty display if listStrainsWithGene is null or undefined and there is no error", () => {})
test("Renders an empty display if listStrainsWithGene.phenotypes is null or undefined and there is no error", () => {})

test("Renders an empty display if listStrainsWithGene is empty", () => {})
test("Renders an empty display if listStrainsWithGene.phenotypes is empty", () => {})

test("Renders a list of phenotypes if listStrainsWithGene.phenotypes contains at least 1 phenotype", () => {})
