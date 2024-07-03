import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { ContentBySlugQuery } from "dicty-graphql-schema"
import { MockedProvider } from "@apollo/client/testing"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { describe, test, vi } from "vitest"
import Edit from "../pages/news/[id]/edit"

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

const editRoute = "/news/:id/edit"

const routeConfiguration = [
  {
    path: editRoute,
    element: <Edit />,
  },
  {
    path: "/news/:id/editable",
    element: <> Editable News Route </>,
  },
]

const {
  mockUseContentBySlugQuery,
  mockAuthorizedUpdateContent,
  mockContentPageErrorMatcher,
} = vi.hoisted(() => ({
  mockUseContentBySlugQuery: vi.fn(),
  mockAuthorizedUpdateContent: vi.fn(),
  mockContentPageErrorMatcher: vi.fn(() => <> intended error </>),
}))

vi.mock("dicty-graphql-schema", async (importOriginal) => {
  const originalModule =
    await importOriginal<typeof import("dicty-graphql-schema")>()
  return {
    ...originalModule,
    useContentBySlugQuery: mockUseContentBySlugQuery,
  }
})

vi.mock("@dictybase/ui-common", async (importOriginal) => {
  const module = await importOriginal<typeof import("@dictybase/ui-common")>()
  return {
    ...module,
    contentPageErrorMatcher: mockContentPageErrorMatcher,
  }
})

vi.mock("../common/hooks/useAuthorizedUpdateContent", () => ({
  useAuthorizedUpdateContent: () => mockAuthorizedUpdateContent,
}))

describe("/news/:id/editable", () => {
  test('renders an element with the testId "skeleton" when useContentBySlugQuery returns loading = true', () => {
    mockUseContentBySlugQuery.mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
    })

    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
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

    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
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
      initialEntries: [editRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    const textbox = screen.getByRole("textbox")
    expect(textbox).toBeInTheDocument()
  })
  test('renders a button with the text "Cancel" that navigates to `/news/:id/editable` when clicked', async () => {
    mockUseContentBySlugQuery.mockReturnValue({
      data: mockContentBySlugQueryData,
      loading: false,
      error: undefined,
    })
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })

    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    const cancelButton = screen.getByText("Cancel")
    expect(cancelButton).toBeInTheDocument()

    await user.click(cancelButton)
    expect(screen.getByText("Editable News Route")).toBeInTheDocument()
  })
  test('renders a button with the text "Save" that calls updateContent mutation and navigates to `/news/:id/editable` when clicked', async () => {
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    const saveButton = screen.getByText("Save")
    expect(saveButton).toBeInTheDocument()
    await user.click(saveButton)
    expect(mockAuthorizedUpdateContent).toHaveBeenCalled()
    expect(screen.getByText("Editable News Route")).toBeInTheDocument()
  })
})
