import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { MockedProvider } from "@apollo/client/testing"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { describe, test, vi } from "vitest"
import Edit from "../pages/news/[id]/edit"
import { mockContentBySlugQueryData } from "../mocks/mockContent"

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
})
