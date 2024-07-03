import { vi, expect, describe, test } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MockedProvider } from "@apollo/client/testing"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import Create from "../pages/news/create"

const createRoute = "/news/create"

const routeConfiguration = [
  {
    path: createRoute,
    element: <Create />,
  },
  {
    path: "/news/editable",
    element: <> Editable News List Route </>,
  },
]

const { mockAuthorizedCreateContent } = vi.hoisted(() => ({
  mockAuthorizedCreateContent: vi.fn(),
}))

vi.mock("../common/hooks/useAuthorizedCreateContent", () => ({
  useAuthorizedCreateContent: () => mockAuthorizedCreateContent,
}))

describe("/news/create", () => {
  test('renders an element with the "textbox" role', () => {
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [createRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    const textbox = screen.getByRole("textbox")
    expect(textbox).toBeInTheDocument()
  })

  test('renders a button with the text "Cancel" that navigates to `/news/editable` when clicked', async () => {
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [createRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    const cancelButton = screen.getByText("Cancel")
    expect(cancelButton).toBeInTheDocument()

    await user.click(cancelButton)
    expect(screen.getByText("Editable News List Route")).toBeInTheDocument()
  })

  test('renders a button with the text "Save" that navigates to calls createContent mutation and navigates to `/news/editable` when clicked', async () => {
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [createRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    const saveButton = screen.getByText("Save")
    expect(saveButton).toBeInTheDocument()
    await user.click(saveButton)
    expect(mockAuthorizedCreateContent).toHaveBeenCalled()
    expect(screen.getByText("Editable News List Route")).toBeInTheDocument()
  })
})
