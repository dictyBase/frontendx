import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { test, expect } from "vitest"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { EditableView } from "../EditablePages/EditableView"
import { contentBySlugData, contentText } from "../mocks/content"

const EditRoute = () => <> edit route </>

const routes = [
  { path: "/editable", element: <EditableView data={contentBySlugData} /> },
  { path: "/edit", element: <EditRoute /> },
]

test("renders the content data", () => {
  const router = createMemoryRouter(routes, { initialEntries: ["/editable"] })
  render(<RouterProvider router={router} />)
  expect(screen.getByText(contentText)).toBeInTheDocument()
})

test("renders an Edit button that navigates to the ../edit subpath", async () => {
  const { click } = userEvent.setup()
  const router = createMemoryRouter(routes, { initialEntries: ["/editable"] })
  render(<RouterProvider router={router} />)

  const editButton = screen.getByRole("button", { name: /edit/i })
  expect(editButton).toBeInTheDocument()
  await click(editButton)
  expect(screen.getByText(/edit route/i)).toBeInTheDocument()
})
