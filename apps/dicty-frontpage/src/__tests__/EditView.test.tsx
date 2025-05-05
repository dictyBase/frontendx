import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test } from "vitest"
import { EditView } from "../features/EditablePages/EditView"
import { mockContentBySlugQueryData } from "../mocks/mockContent"

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
