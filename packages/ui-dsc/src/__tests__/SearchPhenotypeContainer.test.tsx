import { vi, test, expect, beforeAll, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { InMemoryCache } from "@apollo/client"
import { MockedProvider, MockedResponse } from "@apollo/client/testing"
import { BrowserRouter } from "react-router-dom"
import {
  ListStrainsWithPhenotypeDocument,
  type ListStrainsWithPhenotypeQuery,
} from "dicty-graphql-schema"
import { listStrainsWithAnnotationPagination } from "@dictybase/hook-dsc"
import { SearchPhenotypeContainer } from "../catalog/SearchPhenotypeContainer"
import { first50, second50, lastItems } from "../mocks/mockSearchData"

type StrainWithAnnotation = NonNullable<
  ListStrainsWithPhenotypeQuery["listStrainsWithAnnotation"]
>["strains"][number]

const phenotypeName = "abolished protein phosphorylation"
const skeletonLoaderString = "skeleton-loader"

// mutable param so individual tests can override
let mockParameterName: string | undefined

vi.mock("react-router-dom", async () => {
  const originalModule =
    await vi.importActual<typeof import("react-router-dom")>("react-router-dom")
  return {
    ...originalModule,
    useParams: () => ({ name: mockParameterName }),
  }
})

const IntersectionObserverMock = vi.fn()
IntersectionObserverMock.prototype.observe = vi.fn()
IntersectionObserverMock.prototype.disconnect = vi.fn()

beforeAll(() => {
  IntersectionObserverMock.mockImplementation((callback) => {
    callback([{ isIntersecting: false }])
  })
})
beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock)
  mockParameterName = "abolished+protein+phosphorylation"
})
afterEach(() => {
  vi.unstubAllGlobals()
})

test("should render fetched data with small data set", async () => {
  const mocks = [
    {
      request: {
        query: ListStrainsWithPhenotypeDocument,
        variables: {
          cursor: 0,
          limit: 50,
          type: "phenotype",
          annotation: phenotypeName,
        },
      },
      result: {
        data: {
          listStrainsWithAnnotation: {
            totalCount: 10,
            nextCursor: 0,
            strains: first50.slice(0, 10),
          },
        },
      },
    },
  ]
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <SearchPhenotypeContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  // displays loading skeleton first
  expect(screen.getByTestId(skeletonLoaderString)).toBeInTheDocument()

  // wait for data to load...
  const firstRow = await screen.findByText(
    (first50[0] as StrainWithAnnotation).label,
  )
  expect(firstRow).toBeInTheDocument()
  const lastRow = await screen.findByText(
    (first50[9] as StrainWithAnnotation).label,
  )
  expect(lastRow).toBeInTheDocument()

  const row11 = screen.queryByText((first50[10] as StrainWithAnnotation).label)

  expect(row11).not.toBeInTheDocument()

  const listItems = await screen.findAllByRole("listitem")
  // should have 11 list items -> 10 rows of data + list header
  expect(listItems).toHaveLength(11)
  expect(screen.getByText(/Displaying 10 results/)).toBeInTheDocument()
})

test("should only render first 50 results when intersection observer is not visible", async () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          listStrainsWithAnnotation: listStrainsWithAnnotationPagination(),
        },
      },
    },
  })
  const mocks = [
    {
      request: {
        query: ListStrainsWithPhenotypeDocument,
        variables: {
          cursor: 0,
          limit: 50,
          type: "phenotype",
          annotation: phenotypeName,
        },
      },
      result: {
        data: {
          listStrainsWithAnnotation: {
            totalCount: 50,
            nextCursor: 123_456,
            strains: first50,
          },
        },
      },
    },
    {
      request: {
        query: ListStrainsWithPhenotypeDocument,
        variables: {
          cursor: 123_456,
          limit: 50,
          type: "phenotype",
          annotation: phenotypeName,
        },
      },
      result: {
        data: {
          listStrainsWithAnnotation: {
            totalCount: 50,
            nextCursor: 987_654,
            strains: second50,
          },
        },
      },
    },
    {
      request: {
        query: ListStrainsWithPhenotypeDocument,
        variables: {
          cursor: 987_654,
          limit: 50,
          type: "phenotype",
          annotation: phenotypeName,
        },
      },
      result: {
        data: {
          listStrainsWithAnnotation: {
            totalCount: 3,
            nextCursor: 0,
            strains: lastItems,
          },
        },
      },
    },
  ]
  render(
    <MockedProvider mocks={mocks} addTypename cache={cache}>
      <BrowserRouter>
        <SearchPhenotypeContainer />
      </BrowserRouter>
    </MockedProvider>,
  )

  // displays loading skeleton first
  expect(screen.getByTestId(skeletonLoaderString)).toBeInTheDocument()

  // wait for data to load...
  const firstRow = await screen.findByText((first50[0] as any).label)
  expect(firstRow).toBeInTheDocument()
  const lastRow = await screen.findByText((first50[49] as any).label)
  expect(lastRow).toBeInTheDocument()

  const row51 = screen.queryByText((second50[0] as any).label)
  expect(row51).not.toBeInTheDocument()

  const listItems = await screen.findAllByRole("listitem")
  // should have 51 list items -> 50 rows of data + list header
  expect(listItems).toHaveLength(51)

  expect(screen.getByText(/Displaying 50 results/)).toBeInTheDocument()
})

test("displays no results display for NotFound error", async () => {
  const mocks = [
    {
      request: {
        query: ListStrainsWithPhenotypeDocument,
        variables: {
          cursor: 0,
          limit: 50,
          type: "phenotype",
          annotation: phenotypeName,
        },
      },
      result: {
        errors: [
          {
            message: "Page Not Found",
            path: [],
            extensions: { code: "NotFound" },
            locations: undefined,
            nodes: undefined,
            source: undefined,
            positions: undefined,
            originalError: undefined,
            name: "",
          },
        ],
      },
    },
  ]
  render(
    <MockedProvider mocks={mocks as unknown as ReadonlyArray<MockedResponse>}>
      <BrowserRouter>
        <SearchPhenotypeContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  // displays loading skeleton first
  expect(screen.getByTestId(skeletonLoaderString)).toBeInTheDocument()
  // NotFound errors show the no-results display
  const noResults = await screen.findByText(/No strains found with phenotype/)
  expect(noResults).toBeInTheDocument()
})

test("displays error wrapper for non-NotFound errors", async () => {
  const mocks = [
    {
      request: {
        query: ListStrainsWithPhenotypeDocument,
        variables: {
          cursor: 0,
          limit: 50,
          type: "phenotype",
          annotation: phenotypeName,
        },
      },
      result: {
        errors: [
          {
            message: "Internal Server Error",
            path: [],
            extensions: { code: "INTERNAL_SERVER_ERROR" },
            locations: undefined,
            nodes: undefined,
            source: undefined,
            positions: undefined,
            originalError: undefined,
            name: "",
          },
        ],
      },
    },
  ]
  render(
    <MockedProvider mocks={mocks as unknown as ReadonlyArray<MockedResponse>}>
      <BrowserRouter>
        <SearchPhenotypeContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  // displays loading skeleton first
  expect(screen.getByTestId(skeletonLoaderString)).toBeInTheDocument()
  // wait for error display to appear
  const errorDisplay = await screen.findByText(/refresh the page/i)
  expect(errorDisplay).toBeInTheDocument()
})

test("displays no results message when search returns zero strains", async () => {
  const mocks = [
    {
      request: {
        query: ListStrainsWithPhenotypeDocument,
        variables: {
          cursor: 0,
          limit: 50,
          type: "phenotype",
          annotation: phenotypeName,
        },
      },
      result: {
        data: {
          listStrainsWithAnnotation: {
            totalCount: 0,
            nextCursor: 0,
            strains: [],
          },
        },
      },
    },
  ]
  render(
    <MockedProvider mocks={mocks as unknown as ReadonlyArray<MockedResponse>}>
      <BrowserRouter>
        <SearchPhenotypeContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  // displays loading skeleton first
  expect(screen.getByTestId(skeletonLoaderString)).toBeInTheDocument()
  // wait for the no-results message
  const noResults = await screen.findByText(/No strains found with phenotype/)
  expect(noResults).toBeInTheDocument()
})

test("displays prompt to enter a phenotype when no name param is present", async () => {
  mockParameterName = undefined
  render(
    <MockedProvider mocks={[]}>
      <BrowserRouter>
        <SearchPhenotypeContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  const promptMessage = await screen.findByText(
    /Enter a phenotype above to search for strains/,
  )

  expect(promptMessage).toBeInTheDocument()
})
