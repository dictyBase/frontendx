import { vi, describe, test, expect, beforeAll, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { InMemoryCache } from "@apollo/client"
import { MockedProvider, MockedResponse } from "@apollo/client/testing"
import { BrowserRouter } from "react-router-dom"
import {
  ListStrainsWithPhenotypeDocument,
  ListStrainsWithPhenotypeQuery,
} from "dicty-graphql-schema"
import { listStrainsWithAnnotationPagination } from "@dictybase/hook-dsc"
import { SearchPhenotypeContainer } from "../catalog/SearchPhenotypeContainer"
import { first50, second50, lastItems } from "../mocks/mockSearchData"
// import { MockAuthProvider } from "common/utils/testing"

type StrainWithAnnotation = NonNullable<
  ListStrainsWithPhenotypeQuery["listStrainsWithAnnotation"]
>["strains"][number]

const mockParameters = "abolished+protein+phosphorylation"
const annotationString = "abolished protein phosphorylation"
const skeletonLoaderString = "skeleton-loader"

// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual<
    typeof import("react-router-dom")
  >("react-router-dom")
  return {
    ...originalModule,
    useParams: () => ({
      name: mockParameters,
    }),
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
})

describe("features/Stocks/SearchResults/PhenotypeContainer", () => {
  describe("initial render with small data set", () => {
    const mocks = [
      {
        request: {
          query: ListStrainsWithPhenotypeDocument,
          variables: {
            cursor: 0,
            limit: 50,
            type: "phenotype",
            annotation: annotationString,
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
    test("should render fetched data", async () => {
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

      const row11 = screen.queryByText(
        (first50[10] as StrainWithAnnotation).label,
      )
      expect(row11).not.toBeInTheDocument()

      const listItems = await screen.findAllByRole("listitem")
      // should have 11 list items -> 10 rows of data + list header
      expect(listItems).toHaveLength(11)
      expect(screen.getByText(/Displaying 10 results/)).toBeInTheDocument()
    })
  })

  describe("initial render with large data set", () => {
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
            annotation: annotationString,
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
            annotation: annotationString,
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
            annotation: annotationString,
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
    test("should only render first 50 results when intersection observer is not visible", async () => {
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

    test("should render next 50 results when intersection observer is visible", async () => {
      IntersectionObserverMock.mockImplementation((callback) => {
        callback([{ isIntersecting: true }])
      })
      render(
        <MockedProvider mocks={mocks} addTypename cache={cache}>
          <BrowserRouter>
            <SearchPhenotypeContainer />
          </BrowserRouter>
        </MockedProvider>,
      )
      // next 50 results should be included since isIntersecting is true

      const firstRowSecondSet = await screen.findByText(
        (second50[0] as StrainWithAnnotation).label,
      )
      expect(firstRowSecondSet).toBeInTheDocument()
      const finalItem = await screen.findByText(
        (lastItems[2] as StrainWithAnnotation).label,
      )
      expect(finalItem).toBeInTheDocument()

      const listItems = await screen.findAllByRole("listitem")
      expect(listItems).toHaveLength(104) // 103 items + 1 header row
      expect(screen.getByText(/Displaying 103 results/)).toBeInTheDocument()
    }, 15_000)
  })

  describe("error handling", () => {
    const mocks = [
      {
        request: {
          query: ListStrainsWithPhenotypeDocument,
          variables: {
            cursor: 0,
            limit: 50,
            type: "phenotype",
            annotation: annotationString,
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
    test("displays error message", async () => {
      render(
        <MockedProvider
          mocks={mocks as unknown as ReadonlyArray<MockedResponse>}>
          <BrowserRouter>
            <SearchPhenotypeContainer />
          </BrowserRouter>
        </MockedProvider>,
      )
      // displays loading skeleton first
      expect(screen.getByTestId(skeletonLoaderString)).toBeInTheDocument()
      // wait for error message to load...
      const errorMessage = await screen.findByText(/Page Not Found/)
      expect(errorMessage).toBeInTheDocument()
    })
  })
  describe("fallback", () => {
    test("returns an empty JSX fragment if there loading, data, and error are undefined", () => {
      const mocks = [
        {
          request: {
            query: ListStrainsWithPhenotypeDocument,
            variables: {
              cursor: 0,
              limit: 50,
              type: "phenotype",
              annotation: annotationString,
            },
          },
          result: {
            data: undefined,
            error: undefined,
          },
        },
      ]
      render(
        <MockedProvider
          mocks={mocks as unknown as ReadonlyArray<MockedResponse>}>
          <BrowserRouter>
            <SearchPhenotypeContainer />
          </BrowserRouter>
        </MockedProvider>,
      )
    })
    expect(screen.queryByTestId(skeletonLoaderString)).toBeNull()
    expect(screen.queryByText(/Page Not Found/)).toBeNull()
    expect(screen.queryByRole("list")).toBeNull()
  })
})
