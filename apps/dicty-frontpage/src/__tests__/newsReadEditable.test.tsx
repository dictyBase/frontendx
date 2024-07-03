import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { ContentBySlugQuery } from "dicty-graphql-schema"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { describe, test, vi } from "vitest"
import Editable from "../pages/news/[id]/editable"

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

const editableRoute = "/news/:id/editable"

const routeConfiguration = [
  {
    path: editableRoute,
    element: <Editable />,
  },
  {
    path: "/news/:id/edit",
    element: <> Edit News Route </>,
  },
  {
    path: "/news/editable",
    element: <> Editable News List Route </>,
  },
]

const {
  mockAuthorizedDeleteContent,
  mockUseContentBySlugQuery,
  mockContentPageErrorMatcher,
} = vi.hoisted(() => ({
  mockUseContentBySlugQuery: vi.fn(),
  mockContentPageErrorMatcher: vi.fn(() => <> intended error </>),
  mockAuthorizedDeleteContent: vi.fn(() => ({ success: true })),
}))

vi.mock("../common/hooks/useAuthorizedDeleteContent", () => ({
  useAuthorizedDeleteContent: () => mockAuthorizedDeleteContent,
}))

vi.mock("dicty-graphql-schema", () => ({
  useContentBySlugQuery: mockUseContentBySlugQuery,
  useDeleteContentMutation: vi.fn(() => [() => ({ success: true })]),
}))

vi.mock("@dictybase/ui-common", async (importOriginal) => {
  const module = await importOriginal<typeof import("@dictybase/ui-common")>()
  return {
    ...module,
    contentPageErrorMatcher: mockContentPageErrorMatcher,
  }
})

describe("/news/:id/editable", () => {
  test('renders an element with the testId "skeleton" when useContentBySlugQuery returns loading = true', () => {
    mockUseContentBySlugQuery.mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
    })

    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editableRoute],
    })
    render(<RouterProvider router={router} />)
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

    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editableRoute],
    })
    render(<RouterProvider router={router} />)
    const errorComponent = screen.getByText("intended error")
    expect(errorComponent).toBeInTheDocument()
  })
  test('renders an element with a "textbox" role when useContentBySlugQuery returns valid data', () => {
    mockUseContentBySlugQuery.mockReturnValue({
      data: mockContentBySlugQueryData,
      loading: false,
      error: undefined,
    })

    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editableRoute],
    })
    render(<RouterProvider router={router} />)
    const textbox = screen.getByRole("textbox")
    expect(textbox).toBeInTheDocument()
  })

  test('renders a button with the text "Edit" that navigates to `/news/:id/edit` when clicked', async () => {
    mockUseContentBySlugQuery.mockReturnValue({
      data: mockContentBySlugQueryData,
      loading: false,
      error: undefined,
    })
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editableRoute],
    })

    render(<RouterProvider router={router} />)
    const editButton = screen.getByText("Edit")
    expect(editButton).toBeInTheDocument()

    await user.click(editButton)
    expect(screen.getByText("Edit News Route")).toBeInTheDocument()
  })
  test('renders a button with the text "Cancel" that navigates to `/news/editable` when clicked', async () => {
    mockUseContentBySlugQuery.mockReturnValue({
      data: mockContentBySlugQueryData,
      loading: false,
      error: undefined,
    })
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editableRoute],
    })

    render(<RouterProvider router={router} />)
    const allNewsButton = screen.getByText("All News")
    expect(allNewsButton).toBeInTheDocument()

    await user.click(allNewsButton)
    expect(screen.getByText("Editable News List Route")).toBeInTheDocument()
  })
  test('renders a button with the text "Delete" that calls deleteContent mutation and navigates to `/news/editable` when clicked', async () => {
    mockUseContentBySlugQuery.mockReturnValue({
      data: mockContentBySlugQueryData,
      loading: false,
      error: undefined,
    })
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editableRoute],
    })

    render(<RouterProvider router={router} />)
    const deleteButton = screen.getByText("Delete")
    expect(deleteButton).toBeInTheDocument()

    await user.click(deleteButton)
    expect(mockAuthorizedDeleteContent).toHaveBeenCalled()
    expect(screen.getByText("Editable News List Route")).toBeInTheDocument()
  })
})
