import { ApolloError } from "@apollo/client"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { vi } from "vitest"
import { ErrorPageWrapper } from "./ErrorPageWrapper"

// Mock the React Router
const mockNavigate = vi.fn()

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}))

// Mock window.location
Object.defineProperty(window, "location", {
  value: {
    href: "",
    reload: vi.fn(),
  },
  writable: true,
})

const errorMessage = "Test Error"

const mockError = {
  graphQLErrors: [{ message: errorMessage }],
} as unknown as ApolloError

test("Clicking on the `Return to Homepage` button navigates to the home page", async () => {
  const user = userEvent.setup()
  render(<ErrorPageWrapper error={mockError} />)
  await user.click(screen.getByRole("button", { name: /return to homepage/i }))
  expect(mockNavigate).toHaveBeenCalledWith(import.meta.env.VITE_FRONTPAGE_URL)
})

test("Clicking on the `Refresh` button reloads the page", async () => {
  const user = userEvent.setup()
  render(<ErrorPageWrapper error={mockError} />)

  await user.click(screen.getByRole("button", { name: /refresh/i }))
  expect(window.location.reload).toHaveBeenCalled()
})
