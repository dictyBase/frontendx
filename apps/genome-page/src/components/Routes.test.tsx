import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { BrowserRouter } from "react-router-dom"
import { GeneDocument } from "dicty-graphql-schema"
import Routes from "components/Routes"
import mockGraphQLData from "mocks/mockGraphQLData"

const mockHistoryPush = jest.fn()

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")

  return {
    ...originalModule,
    useNavigate: (to: string) => mockHistoryPush,
  }
})

describe("components/routes/Routes", () => {
  const mocks = [
    {
      request: {
        query: GeneDocument,
        variables: {
          gene: "sadA",
        },
      },
      result: mockGraphQLData,
    },
  ]
  const App = () => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MockedProvider>
  )

  it("should load routes", () => {
    render(<App />)
    expect(screen.getByRole("loader")).toBeInTheDocument()
  })
})
