import { test, expect, vi } from "vitest"
import { ApolloError } from "@apollo/client"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { ErrorDisplay } from "../ErrorDisplay"

const errorMessage = "Test Error"
const mockRefetch = vi.fn()

const mockError = {
  graphQLErrors: [{ message: errorMessage }],
} as unknown as ApolloError

test("renders an error message", () => {
  render(<ErrorDisplay refetch={() => {}} error={mockError} />)

  expect(
    screen.getByText("An unexpected error has occurred."),
  ).toBeInTheDocument()
})

test("Clicking the retry button calls the passed `refetch` function", async () => {
  userEvent.setup()
  render(<ErrorDisplay refetch={mockRefetch} error={mockError} />)
  await userEvent.click(screen.getByRole("button", { name: "Retry" }))
  expect(mockRefetch).toHaveBeenCalledOnce()
})
