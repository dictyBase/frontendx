import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { MockedProvider } from "@apollo/client/testing"
import { expect, test, vi } from "vitest"
import { StrainDetailsContainer } from "../StrainDetailsContainer"

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useParams: () => ({ id: "DBS0001234" }),
  }
})

const mockStrainData = {
  id: "DBS0001234",
  label: "Test Strain",
  phenotypes: ["phenotype1", "phenotype2"],
}

const mockStrainWithoutPhenotypes = {
  id: "DBS0001235",
  label: "Test Strain No Pheno",
  phenotypes: undefined,
}

const mockStrainQuerySuccess = {
  request: {
    query: expect.anything(),
    variables: { id: "DBS0001234" },
  },
  result: {
    data: {
      strain: mockStrainData,
    },
  },
}

const mockStrainQueryNoPhenotypes = {
  request: {
    query: expect.anything(),
    variables: { id: "DBS0001234" },
  },
  result: {
    data: {
      strain: mockStrainWithoutPhenotypes,
    },
  },
}

const mockStrainQueryLoading = {
  request: {
    query: expect.anything(),
    variables: { id: "DBS0001234" },
  },
  result: {
    data: undefined,
  },
  delay: 1000,
}

const mockStrainQueryError = {
  request: {
    query: expect.anything(),
    variables: { id: "DBS0001234" },
  },
  error: new Error("Network error"),
}

test("renders loading state", () => {
  render(
    <MockedProvider mocks={[mockStrainQueryLoading]} addTypename={false}>
      <MemoryRouter>
        <StrainDetailsContainer />
      </MemoryRouter>
    </MockedProvider>,
  )
  expect(screen.getByRole("progressbar")).toBeInTheDocument()
})

test("renders strain details on successful data fetch", async () => {
  render(
    <MockedProvider mocks={[mockStrainQuerySuccess]} addTypename={false}>
      <MemoryRouter>
        <StrainDetailsContainer />
      </MemoryRouter>
    </MockedProvider>,
  )
  const header = await screen.findByText(/test strain/i)
  expect(header).toBeInTheDocument()
})

test("renders strain details without phenotypes", async () => {
  render(
    <MockedProvider mocks={[mockStrainQueryNoPhenotypes]} addTypename={false}>
      <MemoryRouter>
        <StrainDetailsContainer />
      </MemoryRouter>
    </MockedProvider>,
  )
  const header = await screen.findByText(/test strain no pheno/i)
  expect(header).toBeInTheDocument()
})

test("renders error state on query error", async () => {
  render(
    <MockedProvider mocks={[mockStrainQueryError]} addTypename={false}>
      <MemoryRouter>
        <StrainDetailsContainer />
      </MemoryRouter>
    </MockedProvider>,
  )
  const errorMessage = await screen.findByText(/error/i)
  expect(errorMessage).toBeInTheDocument()
})
