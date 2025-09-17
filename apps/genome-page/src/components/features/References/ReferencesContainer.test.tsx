import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { mockReferencesData } from "mocks/mockReferencesData"
import { ReferencesContainer } from "./ReferencesContainer"

const gene = "sadA"
const referencesPath = `/${gene}/references`

const router = createMemoryRouter(
  [
    {
      path: ":id/references",
      element: <ReferencesContainer publications={mockReferencesData} />,
    },
  ],
  { initialEntries: [referencesPath] },
)

test("should render data", () => {
  render(<RouterProvider router={router} />)

  // Renders skeleton loading
  expect(screen.getByText(/reference/i)).toBeInTheDocument()
  expect(screen.getByText("ctxA")).toBeInTheDocument()
})
