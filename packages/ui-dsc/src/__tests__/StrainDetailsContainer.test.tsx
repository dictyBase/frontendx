import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { BrowserRouter } from "react-router-dom"
import { StrainDocument } from "dicty-graphql-schema"
import { StrainDetailsContainer } from "../catalog/StrainDetailsContainer"
import { strainWithPhenotype } from "../mocks/mockStrain"

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

const mocks = [
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

test("displays expected data", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <StrainDetailsContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  // displays loading skeleton first
  expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  // wait for data to load...
  const strain = await screen.findByRole("heading", {
    name: strainWithPhenotype.label,
  })
  expect(strain).toBeInTheDocument()
  // shows depositor
  const { depositor } = strainWithPhenotype
  expect(
    screen.getByText(`${depositor.firstName} ${depositor.lastName}`),
  ).toBeInTheDocument()
})
