/* eslint-disable unicorn/filename-case */
import { render, screen } from "@testing-library/react"
import { mockOtherError, mockUnavailableError } from "../mocks/mockGraphQLError"
import { GraphQLErrorPage } from "../Error/GraphQLErrorPage"

const errorFormat = (error: any) => ({
  message: "Error!",
  graphQLErrors: [error],
  // eslint-disable-next-line unicorn/no-null
  networkError: null,
  protocolErrors: [],
  extraInfo: undefined,
  name: "",
  clientErrors: [],
  cause: { message: "" },
})

describe("common/components/errors/GraphQlErrorPage", () => {
  it("should render other error", () => {
    render(<GraphQLErrorPage error={errorFormat(mockOtherError.errors[0])} />)

    const errorMessage = screen.getByText(/Error/)
    expect(errorMessage).toBeInTheDocument()
    expect(
      screen.getByRole("img", { name: "Sad Dicty -- HTTP Error" }),
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
