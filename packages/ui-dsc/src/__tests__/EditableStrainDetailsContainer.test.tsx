import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MockedProvider } from "@apollo/client/testing"
import { BrowserRouter } from "react-router-dom"
import { StrainDocument, UpdateStrainDocument } from "dicty-graphql-schema"
import { EditableStrainDetailsContainer } from "../catalog/EditableStrainDetailsContainer"
import { strainWithPhenotype, availableStrain } from "../mocks/mockStrain"

const mockID = "DBS0350966"

vi.mock("@logto/react", () => ({
  useLogto: () => ({
    getAccessToken: async () => "mock-token",
    fetchUserInfo: async () => ({ email: "curator@dictybase.org" }),
  }),
}))

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
        <EditableStrainDetailsContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
})

test("displays expected data with phenotypes", async () => {
  render(
    <MockedProvider mocks={successMocks} addTypename={false}>
      <BrowserRouter>
        <EditableStrainDetailsContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  const strain = await screen.findByRole("heading", {
    name: strainWithPhenotype.label,
  })
  expect(strain).toBeInTheDocument()
  const { depositor } = strainWithPhenotype
  expect(
    screen.getByText(`${depositor.first_name} ${depositor.last_name}`),
  ).toBeInTheDocument()
})

test("displays strain data with empty phenotypes array", async () => {
  render(
    <MockedProvider mocks={strainWithEmptyPhenotypesMocks} addTypename={false}>
      <BrowserRouter>
        <EditableStrainDetailsContainer />
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
        <EditableStrainDetailsContainer />
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
        <EditableStrainDetailsContainer />
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
        <EditableStrainDetailsContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  const fallbackMessage = await screen.findByText(
    /this message should not appear/i,
  )
  expect(fallbackMessage).toBeInTheDocument()
})

test("saves edited strain field and refreshes displayed strain details", async () => {
  const user = userEvent.setup()
  const updatedLabel = "spaA-edited"
  const updateAndRefetchMocks = [
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
    {
      request: {
        query: UpdateStrainDocument,
        variables: {
          id: mockID,
          input: {
            label: updatedLabel,
            updated_by: "curator@dictybase.org",
          },
        },
      },
      result: {
        data: {
          updateStrain: {
            id: mockID,
            updated_by: { id: "1" },
          },
        },
      },
    },
    {
      request: {
        query: StrainDocument,
        variables: { id: mockID },
      },
      result: {
        data: {
          strain: {
            ...strainWithPhenotype,
            label: updatedLabel,
          },
        },
      },
    },
  ]

  render(
    <MockedProvider mocks={updateAndRefetchMocks} addTypename={false}>
      <BrowserRouter>
        <EditableStrainDetailsContainer />
      </BrowserRouter>
    </MockedProvider>,
  )

  await screen.findByRole("heading", {
    name: strainWithPhenotype.label,
  })

  const editButtons = screen.getAllByRole("button", { name: /^edit$/i })
  await user.click(editButtons[0])

  const input = screen.getByDisplayValue(strainWithPhenotype.label)
  await user.clear(input)
  await user.type(input, updatedLabel)

  await user.click(screen.getByRole("button", { name: /^save$/i }))

  expect(
    await screen.findByRole("heading", { name: updatedLabel }),
  ).toBeInTheDocument()
})
