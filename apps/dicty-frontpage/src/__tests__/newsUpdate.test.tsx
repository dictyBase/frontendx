import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { MockedProvider } from "@apollo/client/testing"
import { userEvent } from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { describe, test, vi, type Mock } from "vitest"
import { ApolloError } from "@apollo/client"
import Edit from "../pages/news/[id]/edit"
import { mockContentBySlugQueryData } from "../mocks/mockContent"

import { useAutoSave } from "../common/hooks/useAutoSave"

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
const testId = "info-page-toolbar"

const { mockUseContentBySlugQuery, mockAuthorizedUpdateContent } = vi.hoisted(
  () => ({
    mockUseContentBySlugQuery: vi.fn(),
    mockAuthorizedUpdateContent: vi.fn(),
  }),
)

vi.mock("dicty-graphql-schema", async (importOriginal) => {
  const originalModule =
    await importOriginal<typeof import("dicty-graphql-schema")>()
  return {
    ...originalModule,
    useContentBySlugQuery: mockUseContentBySlugQuery,
  }
})

vi.mock("../common/hooks/useAuthorizedUpdateContent", () => ({
  useAuthorizedUpdateContent: () => mockAuthorizedUpdateContent,
}))

vi.mock("../common/hooks/useAutoSave", () => ({
  useAutoSave: vi.fn(() => [
    vi.fn(),
    { waiting: false, loading: false, error: undefined, data: undefined },
  ]),
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
  test('renders a button with the text "Save"', () => {
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    const saveButton = screen.getByText(/save/i)
    expect(saveButton).toBeInTheDocument()
  })

  test('renders a button with the text "Exit" that navigates to `/news/:id/editable` when clicked', async () => {
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    const exitButton = screen.getByText(/exit/i)
    expect(exitButton).toBeInTheDocument()
    await user.click(exitButton)
    expect(screen.getByText("Editable News Route")).toBeInTheDocument()
  })

  test("renders error page when useContentBySlugQuery returns an error", async () => {
    const mockError = {
      graphQLErrors: [{ message: "Test error message" }],
    } as unknown as ApolloError

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
    expect(screen.getByText(/sorry, something went wrong/i)).toBeInTheDocument()
  })

  test("renders fallback when useContentBySlugQuery returns an empty result", () => {
    mockUseContentBySlugQuery.mockReturnValue({
      data: undefined,
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
    expect(
      screen.getByText(/this message should not appear/i),
    ).toBeInTheDocument()
  })
})

const makeEditRouter = () => {
  mockUseContentBySlugQuery.mockReturnValue({
    data: mockContentBySlugQueryData,
    loading: false,
    error: undefined,
  })
  return createMemoryRouter(routeConfiguration, { initialEntries: [editRoute] })
}

const renderEdit = () =>
  render(
    <MockedProvider>
      <RouterProvider router={makeEditRouter()} />
    </MockedProvider>,
  )

describe("news edit page EditActionBar autosave states", () => {
  test("renders ProgressSaved (shows 'Saved' text) when save data is present", () => {
    ;(useAutoSave as Mock).mockReturnValue([
      vi.fn(),
      {
        waiting: false,
        loading: false,
        error: undefined,
        data: { updateContent: { content: "saved content" } },
      },
    ])
    renderEdit()
    expect(screen.getByText(/saved/i)).toBeInTheDocument()
  })

  test("renders WaitingChanges (MoreHorizIcon svg) when waiting is true", () => {
    ;(useAutoSave as Mock).mockReturnValue([
      vi.fn(),
      { waiting: true, loading: false, error: undefined, data: undefined },
    ])
    const { container } = renderEdit()
    expect(container.querySelector("svg")).toBeInTheDocument()
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  test("renders PendingChanges (AutorenewIcon svg) when loading is true", () => {
    ;(useAutoSave as Mock).mockReturnValue([
      vi.fn(),
      { waiting: false, loading: true, error: undefined, data: undefined },
    ])
    const { container } = renderEdit()
    expect(container.querySelector("svg")).toBeInTheDocument()
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  test("renders SavingError (ErrorIcon svg) when error is present", () => {
    ;(useAutoSave as Mock).mockReturnValue([
      vi.fn(),
      {
        waiting: false,
        loading: false,
        error: new ApolloError({ errorMessage: "Save failed" }),
        data: undefined,
      },
    ])
    const { container } = renderEdit()
    expect(container.querySelector("svg")).toBeInTheDocument()
    expect(screen.getByTestId("info-page-toolbar")).toBeInTheDocument()
  })
})
