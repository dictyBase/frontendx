import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { MockedProvider } from "@apollo/client/testing"
import { ApolloError } from "@apollo/client"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, test, vi, type Mock } from "vitest"
import { EditView } from "../features/EditablePages/EditView"
import { mockContentBySlugQueryData } from "../mocks/mockContent"

// Import after mock declaration so vi.mock hoisting works

import { useAutoSave } from "../common/hooks/useAutoSave"

vi.mock("../common/hooks/useAutoSave", () => ({
  useAutoSave: vi.fn(() => [
    vi.fn(),
    { waiting: false, loading: false, error: undefined, data: undefined },
  ]),
}))

const editRoute = "/:section/:name/edit"

const routeConfiguration = [
  {
    path: editRoute,
    element: <EditView data={mockContentBySlugQueryData.contentBySlug!} />,
  },
  {
    path: "/:section/:name/editable",
    element: <> Editable News Route </>,
  },
]

describe("Edit View", () => {
  test('renders an element with a "textbox" role when useContentBySlugQuery returns valid data', () => {
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
    const editButton = screen.getByText(/save/i)
    expect(editButton).toBeInTheDocument()
  })

  test('renders a button with the text "Exit" that navigates to `/editable` when clicked', async () => {
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

const makeRouter = () =>
  createMemoryRouter(routeConfiguration, { initialEntries: [editRoute] })

const renderEditView = () =>
  render(
    <MockedProvider>
      <RouterProvider router={makeRouter()} />
    </MockedProvider>,
  )

const testId = "info-page-toolbar"

describe("EditActionBar autosave states", () => {
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
    renderEditView()
    expect(screen.getByText(/saved/i)).toBeInTheDocument()
  })

  test("renders WaitingChanges (MoreHorizIcon) when waiting is true", () => {
    ;(useAutoSave as Mock).mockReturnValue([
      vi.fn(),
      { waiting: true, loading: false, error: undefined, data: undefined },
    ])
    const { container } = renderEditView()
    // WaitingChanges renders MoreHorizIcon which is an SVG
    expect(container.querySelector("svg")).toBeInTheDocument()
    // The toolbar area should be rendered
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  test("renders PendingChanges (AutorenewIcon) when loading is true", () => {
    ;(useAutoSave as Mock).mockReturnValue([
      vi.fn(),
      { waiting: false, loading: true, error: undefined, data: undefined },
    ])
    const { container } = renderEditView()
    expect(container.querySelector("svg")).toBeInTheDocument()
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  test("renders SavingError (ErrorIcon) when error is present", () => {
    ;(useAutoSave as Mock).mockReturnValue([
      vi.fn(),
      {
        waiting: false,
        loading: false,
        error: new ApolloError({ errorMessage: "Save failed" }),
        data: undefined,
      },
    ])
    const { container } = renderEditView()
    expect(container.querySelector("svg")).toBeInTheDocument()
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })
})
