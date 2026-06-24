import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { BrowserRouter } from "react-router-dom"
import { StrainDocument } from "dicty-graphql-schema"
import { StrainDetailsContainer } from "../catalog/StrainDetailsContainer"
import { strainWithPhenotype, availableStrain } from "../mocks/mockStrain"

const mockID = "DBS0350966"

// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
vi.mock("react-router-dom", async () => {
  const originalModule = (await vi.importActual(
    "react-router-dom",
  )) as typeof import("react-router-dom")

  return {
    ...originalModule,
    useParams: () => ({
      id: mockID,
    }),
  }
})

const successMocks = [
  {
    request: {
      query: StrainDocument,
      variables: { id: mockID },
    },
    result: {
      data: {
        strain: strainWithPhenotype,
      },
    },
  },
]

const strainWithEmptyPhenotypesMocks = [
  {
    request: {
      query: StrainDocument,
      variables: { id: mockID },
    },
    result: {
      data: {
        strain: availableStrain,
      },
    },
  },
]

const strainWithNullPhenotypesMocks = [
  {
    request: {
      query: StrainDocument,
      variables: { id: mockID },
    },
    result: {
      data: {
        strain: { ...availableStrain, phenotypes: undefined },
      },
    },
  },
]

const errorMocks = [
  {
    request: {
      query: StrainDocument,
      variables: { id: mockID },
    },
    error: new Error("Network error"),
  },
]

const otherwiseMocks = [
  {
    request: {
      query: StrainDocument,
      variables: { id: mockID },
    },
    result: {
      data: {
        strain: undefined,
      },
    },
  },
]

test("displays loading state", () => {
  render(
    <MockedProvider mocks={successMocks} addTypename={false}>
      <BrowserRouter>
        <StrainDetailsContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
})

test("displays expected data with phenotypes", async () => {
  render(
    <MockedProvider mocks={successMocks} addTypename={false}>
      <BrowserRouter>
        <StrainDetailsContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  // wait for data to load...
  const strain = await screen.findByRole("heading", {
    name: strainWithPhenotype.label,
  })
  expect(strain).toBeInTheDocument()
  // shows depositor
  const { depositor } = strainWithPhenotype
  expect(
    screen.getByText(`${depositor.first_name} ${depositor.last_name}`),
  ).toBeInTheDocument()
})

test("displays strain data with empty phenotypes array", async () => {
  render(
    <MockedProvider mocks={strainWithEmptyPhenotypesMocks} addTypename={false}>
      <BrowserRouter>
        <StrainDetailsContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  const strain = await screen.findByRole("heading", {
    name: availableStrain.label,
  })
  expect(strain).toBeInTheDocument()
})

test("displays strain data with null phenotypes", async () => {
  render(
    <MockedProvider mocks={strainWithNullPhenotypesMocks} addTypename={false}>
      <BrowserRouter>
        <StrainDetailsContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  const strain = await screen.findByRole("heading", {
    name: availableStrain.label,
  })
  expect(strain).toBeInTheDocument()
})

test("displays error state on query error", async () => {
  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <BrowserRouter>
        <StrainDetailsContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  const errorMessage = await screen.findByText(/sorry, something went wrong/i)
  expect(errorMessage).toBeInTheDocument()
})

test("displays otherwise fallback message when strain data is null", async () => {
  render(
    <MockedProvider mocks={otherwiseMocks} addTypename={false}>
      <BrowserRouter>
        <StrainDetailsContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  const fallbackMessage = await screen.findByText(
    /this message should not appear/i,
  )
  expect(fallbackMessage).toBeInTheDocument()
})
