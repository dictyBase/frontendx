import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { vi, test, expect, beforeEach } from "vitest"
import { ApolloError } from "@apollo/client"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ErrorPageWrapper } from "../ErrorPageWrapper"

vi.stubEnv("VITE_APP_FRONTPAGE_URL", "/")
const errorMessage = "Test Error"

const mockError = {
  graphQLErrors: [{ message: errorMessage }],
} as unknown as ApolloError

const router = createMemoryRouter(
  [
    { path: "/", element: <>home route</> },
    { path: "/error", element: <ErrorPageWrapper error={mockError} /> },
  ],
  {
    initialEntries: ["/error"],
  },
)

beforeEach(() => {
  router.navigate("/error")
})

test("Clicking on the `Return to Homepage` button navigates to the home page", async () => {
  const user = userEvent.setup()
  render(<RouterProvider router={router} />)

  await user.click(screen.getByRole("button", { name: /return to homepage/i }))
  expect(screen.getByText(/home route/)).toBeInTheDocument()
})

test("Clicking on the `Refresh` button navigates to the home page", async () => {
  const user = userEvent.setup()
  render(<RouterProvider router={router} />)

  await user.click(screen.getByRole("button", { name: /refresh/i }))
  expect(screen.getByText(/Sorry, something went wrong./)).toBeInTheDocument()
})
