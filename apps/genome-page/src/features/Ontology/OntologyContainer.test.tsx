import React from "react"
import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import OntologyContainer from "./OntologyContainer"
import { GeneDocument } from "dicty-graphql-schema"
import mockGraphQLData from "common/mocks/mockGraphQLData"
import { mockNotFoundError } from "common/mocks/mockGraphQLError"
import { BrowserRouter } from "react-router-dom"

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")
  return {
    ...originalModule,
    useLocation: () => ({
      pathname: "testdb.dictybase.org/gene/sadA/goannotations",
    }),
    useParams: () => ({
      gene: "sadA",
    }),
  }
})

describe("features/Ontology/OntologyContainer", () => {
  it("should render fetched data", async () => {
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
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <OntologyContainer />
        </BrowserRouter>
      </MockedProvider>,
    )
    // displays loading skeleton first
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()

    // wait for data to load...
    const molecularPanel = await screen.findByText(/Molecular Function/)
    expect(molecularPanel).toBeInTheDocument()
    const biologicalPanel = await screen.findByText(/Biological Process/)
    expect(biologicalPanel).toBeInTheDocument()
    const cellularPanel = await screen.findByText(/Cellular Component/)
    expect(cellularPanel).toBeInTheDocument()
    const innerTab = screen.getByText(/All GO/)
    expect(innerTab).toBeInTheDocument()
  })

  it("should render error page", async () => {
    const mocks = [
      {
        request: {
          query: GeneDocument,
          variables: {
            gene: "sadA",
          },
        },
        result: mockNotFoundError,
      },
    ]
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <OntologyContainer />
        </BrowserRouter>
      </MockedProvider>,
    )
    // displays loading skeleton first
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()

    // wait for data to load...
    const errorMsg = await screen.findByText(
      /Could not find gene with ID banana/,
    )
    expect(errorMsg).toBeInTheDocument()
  })
})
