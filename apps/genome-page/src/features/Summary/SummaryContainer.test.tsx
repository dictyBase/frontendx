import React from "react"
import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import SummaryContainer from "./SummaryContainer"
import { GET_GENE } from "common/graphql/query"
import mockData from "./mockData"
import { BrowserRouter } from "react-router-dom"

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")
  return {
    ...originalModule,
    useLocation: () => ({
      pathname: "testdb.dictybase.org/gene/sadA",
    }),
    useParams: () => ({
      gene: "sadA",
    }),
  }
})

describe("features/Summary/SummaryContainer", () => {
  it("should render fetched data", async () => {
    const mocks = [
      {
        request: {
          query: GET_GENE,
          variables: {
            gene: "sadA",
          },
        },
        result: mockData,
      },
    ]
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <SummaryContainer />
        </BrowserRouter>
      </MockedProvider>,
    )
    // displays loading skeleton first
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()

    // wait for data to load...
    const panelHeader = await screen.findByText(
      /Latest Gene Ontology Annotations/,
    )
    expect(panelHeader).toBeInTheDocument()
    expect(screen.getByText(/Molecular Function/)).toBeInTheDocument()
    expect(screen.getByText(/Biological Process/)).toBeInTheDocument()
    expect(screen.getByText(/Cellular Component/)).toBeInTheDocument()
  })
})
