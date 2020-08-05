import React from "react"
import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import OntologyContainer from "./OntologyContainer"
import { GET_GENE } from "common/graphql/query"
import mockData from "features/Summary/mockData"
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
          <OntologyContainer />
        </BrowserRouter>
      </MockedProvider>,
    )
    // displays loading skeleton first
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()

    // wait for data to load...
    const innerTab = await screen.findByText(/All GO/)
    expect(innerTab).toBeInTheDocument()
    const molecularPanel = await screen.findByText(/Molecular Function/)
    expect(molecularPanel).toBeInTheDocument()
    const biologicalPanel = await screen.findByText(/Biological Process/)
    expect(biologicalPanel).toBeInTheDocument()
    const cellularPanel = await screen.findByText(/Cellular Composition/)
    expect(cellularPanel).toBeInTheDocument()
  })

  it("should render error page", async () => {
    const mocks = [
      {
        request: {
          query: GET_GENE,
          variables: {
            gene: "sadA",
          },
        },
        result: {
          errors: [
            {
              message: "could not find gene with ID banana",
              path: ["gene"],
              extensions: { code: "NotFound" },
              locations: undefined,
              nodes: undefined,
              source: undefined,
              positions: undefined,
              originalError: undefined,
              name: "",
            },
          ],
        },
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
