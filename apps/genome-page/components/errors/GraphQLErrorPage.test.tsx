/* eslint-disable unicorn/filename-case */
import React from "react"
import { render, screen } from "@testing-library/react"
import { ApolloError } from "@apollo/client"
import { GraphQLErrorPage } from "./GraphQLErrorPage"
import {
  mockNotFoundError,
  mockOtherError,
  mockUnavailableError,
} from "../features/Authentication/mockGraphQLError"

const errorFormat = (error: any): ApolloError => ({
  message: "Error!",
  graphQLErrors: [error],
  // eslint-disable-next-line unicorn/no-null
  networkError: null,
  protocolErrors: [],
  extraInfo: undefined,
  name: "",
  clientErrors: [],
})

describe("components/errors/GraphQLErrorPage", () => {
  it("should render not found error", () => {
    render(
      <GraphQLErrorPage error={errorFormat(mockNotFoundError.errors[0])} />,
    )

    const errorMessage = screen.getByText(/Could not find gene with ID banana/)
    expect(errorMessage).toBeInTheDocument()
  })

  it("should render other error", () => {
    render(<GraphQLErrorPage error={errorFormat(mockOtherError.errors[0])} />)

    const errorMessage = screen.getByText(/Error/)
    expect(errorMessage).toBeInTheDocument()
    expect(
      screen.getByRole("img", { name: "Sad Dicty Logo" }),
    ).toBeInTheDocument()
  })

  it("should render server error", () => {
    render(
      <GraphQLErrorPage error={errorFormat(mockUnavailableError.errors[0])} />,
    )

    const errorMessage = screen.getByText(/Sorry! There was a server error./)
    expect(errorMessage).toBeInTheDocument()
  })
})
