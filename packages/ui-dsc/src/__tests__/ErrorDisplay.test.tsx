import { test, expect } from "vitest"
import { ApolloError } from "@apollo/client"
import { render, screen } from "@testing-library/react"
import { ErrorDisplay } from "../ErrorDisplay"

const errorMessage = "Test Error"

const mockError = {
  graphQLErrors: [{ message: errorMessage }],
} as unknown as ApolloError

test("renders an error message", () => {
  render(<ErrorDisplay refetch={() => {}} error={mockError} />)

  expect(
    screen.getByText("An unexpected error has occurred."),
  ).toBeInTheDocument()
})
