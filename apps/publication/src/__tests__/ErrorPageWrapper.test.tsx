import { ApolloError } from "@apollo/client"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { vi } from "vitest"
import { ErrorPageWrapper } from "../components/errors/ErrorPageWrapper"

// Mock the Next.js router
const mockPush = vi.fn()
const mockReload = vi.fn()

vi.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
    reload: mockReload,
  }),
}))

const errorMessage = "Test Error"

const mockError = {
  graphQLErrors: [{ message: errorMessage }],
} as unknown as ApolloError

test("Clicking on the `Return to Homepage` button navigates to the home page", async () => {
  const user = userEvent.setup()
  render(<ErrorPageWrapper error={mockError} />)

  await user.click(screen.getByRole("button", { name: /return to homepage/i }))
  expect(mockPush).toHaveBeenCalledWith(process.env.NEXT_PUBLIC_FRONTPAGE_URL)
})

test("Clicking on the `Refresh` button reloads the page", async () => {
  const user = userEvent.setup()
  render(<ErrorPageWrapper error={mockError} />)

  await user.click(screen.getByRole("button", { name: /refresh/i }))
  expect(mockReload).toHaveBeenCalled()
})
