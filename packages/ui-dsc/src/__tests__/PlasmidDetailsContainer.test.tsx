import { describe, test, expect } from "vitest"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import { PlasmidDocument } from "dicty-graphql-schema"
import {
  PlasmidDetails,
  PlasmidDetailsContainer,
} from "../catalog/PlasmidDetailsContainer"
import { mockPlasmid } from "../mocks/mockPlasmid"

const routes = [
  {
    path: "/plasmids/:id",
    element: <PlasmidDetailsContainer />,
  },
]

const router = createMemoryRouter(routes, {
  initialEntries: [`/plasmids/${mockPlasmid.id}`],
})

const mocks = [
  {
    request: {
      query: PlasmidDocument,
      variables: { id: mockPlasmid.id },
    },
    result: {
      data: {
        plasmid: mockPlasmid,
      },
    },
  },
]

describe("PlasmidDetailsContainer", () => {
  test("Renders plasmid details if data is present", async () => {
    render(
      <MockedProvider mocks={mocks}>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    expect(await screen.findByText(mockPlasmid.summary)).toBeVisible()
  })
})

describe("PlasmidDetails", () => {
  test("Renders heading with name of plasmid", () => {
    render(<PlasmidDetails plasmid={mockPlasmid} />)
    expect(
      screen.getByRole("heading", { name: mockPlasmid.name }),
    ).toBeInTheDocument()
  })
})
