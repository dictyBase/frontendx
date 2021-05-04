import React from "react"
import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { BrowserRouter } from "react-router-dom"
import PublicationContainer from "./PublicationContainer"
import { PublicationDocument } from "dicty-graphql-schema"
import { data } from "common/mocks/mockdata"
import { mockNotFoundError } from "common/mocks/mockGraphQLError"

const mockID = data.publication.id

// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")

  return {
    ...originalModule,
    useParams: () => ({
      id: mockID,
    }),
  }
})

describe("features/Publication/PublicationContainer", () => {
  const MockComponent = ({ mocks }: any) => {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <PublicationContainer />
        </BrowserRouter>
      </MockedProvider>
    )
  }

  describe("initial render", () => {
    const mocks = [
      {
        request: {
          query: PublicationDocument,
          variables: { id: mockID },
        },
        result: {
          data,
        },
      },
    ]

    it("displays expected data", async () => {
      render(<MockComponent mocks={mocks} />)
      // displays loading skeleton first
      expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
      // wait for data to load...
      const title = await screen.findByText(data.publication.title)
      expect(title).toBeInTheDocument()
      // shows depositor
      const { abstract } = data.publication
      expect(screen.getByText(abstract)).toBeInTheDocument()
    })
  })

  describe("error handling", () => {
    const mocks = [
      {
        request: {
          query: PublicationDocument,
          variables: { id: mockID },
        },
        result: mockNotFoundError,
      },
    ]

    it("displays error message", async () => {
      render(<MockComponent mocks={mocks} filter="all" />)
      // displays spinner first
      expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()

      // wait for error message to load...
      const errorMsg = await screen.findByText(/Error/)
      expect(errorMsg).toBeInTheDocument()
    })
  })
})
