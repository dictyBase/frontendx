import { MemoryRouter } from "react-router-dom"
import { ContentBySlugQuery } from "dicty-graphql-schema"
import { render, screen } from "@testing-library/react"
import { describe, test, vi } from "vitest"
import Show from "../pages/news/[id]/show"

const CONTENT_STRING = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Annual International Dictyostelium Conference","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"International conferences dedicated to ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" started in  1977 with the meeting in Sardinia, and continued on a roughly 3-year  cycle into the 1980's. However, as the field became more active, more  local meetings sprang up to fill the gaps in the cycle. Notable amongst  these was an annual series in the UK, which gradually became more  international. By the late 1980's with the successive meetings at  Amsterdam, Oxford, Airlie and Cambridge, the current pattern of annual  meetings was established. Interestingly in the late 1990's as the field  expanded further, local meetings were re-started in several countries.     ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"flex-layout","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

const mockContentBySlugQueryData: ContentBySlugQuery = {
  __typename: "Query",
  contentBySlug: {
    __typename: "Content",
    id: "1",
    content: CONTENT_STRING,
    name: "Mock Content Name",
    slug: "mock-content-slug",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: {
      __typename: "User",
      id: "1",
      email: "creator@example.com",
      first_name: "John",
      last_name: "Doe",
    },
    updated_by: {
      __typename: "User",
      id: "2",
      email: "updater@example.com",
      first_name: "Jane",
      last_name: "Smith",
    },
  },
}

const { mockUseContentBySlugQuery, mockContentPageErrorMatcher } = vi.hoisted(
  () => ({
    mockUseContentBySlugQuery: vi.fn(),
    mockContentPageErrorMatcher: vi.fn().mockImplementation(() => <> error </>),
  }),
)

vi.mock("dicty-graphql-schema", () => ({
  useContentBySlugQuery: mockUseContentBySlugQuery,
}))

vi.mock("@dictybase/ui-common", async (importOriginal) => {
  const module = await importOriginal<typeof import("@dictybase/ui-common")>()
  return {
    ...module,
    contentPageErrorMatcher: mockContentPageErrorMatcher,
  }
})

describe("Show Component", () => {
  test('renders an element with a "textbox" role when useContentBySlugQuery returns valid data', () => {
    mockUseContentBySlugQuery.mockReturnValue({
      data: mockContentBySlugQueryData,
      loading: false,
      error: undefined,
    })

    render(
      <MemoryRouter>
        <Show />
      </MemoryRouter>,
    )
    const textbox = screen.getByRole("textbox")
    expect(textbox).toBeInTheDocument()
  })

  test('renders an element with the testId "skeleton" when useContentBySlugQuery returns loading = true', () => {
    mockUseContentBySlugQuery.mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
    })

    render(
      <MemoryRouter>
        <Show />
      </MemoryRouter>,
    )
    const skeleton = screen.getAllByTestId("skeleton")
    expect(skeleton.length).toBeGreaterThan(0)
  })
  test("calls contentPageErrorMatcher when useContentBySlugQuery returns an error", () => {
    const mockError = new Error("Test error")
    mockUseContentBySlugQuery.mockReturnValue({
      data: undefined,
      loading: false,
      error: mockError,
    })

    render(
      <MemoryRouter>
        <Show />
      </MemoryRouter>,
    )
    const errorComponent = screen.getByText(/error/)
    expect(errorComponent).toBeInTheDocument()
  })
})
