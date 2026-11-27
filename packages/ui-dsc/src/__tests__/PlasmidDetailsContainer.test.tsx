import { describe, test, expect } from "vitest"
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from "react-router-dom"
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
    render(
      <MemoryRouter>
        <PlasmidDetails plasmid={mockPlasmid} />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole("heading", { name: mockPlasmid.name }),
    ).toBeInTheDocument()
  })

  test("Renders Return to Catalog link pointing to /catalog by default", () => {
    render(
      <MemoryRouter initialEntries={[`/plasmids/${mockPlasmid.id}`]}>
        <PlasmidDetails plasmid={mockPlasmid} />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole("link", { name: /return to catalog/i }),
    ).toHaveAttribute("href", "/catalog")
  })

  test("Renders Return to Catalog link pointing to previous catalog search page when state.from is present", () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: `/plasmids/${mockPlasmid.id}`,
            state: { from: "/plasmids?group=regular" },
          },
        ]}>
        <PlasmidDetails plasmid={mockPlasmid} />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole("link", { name: /return to catalog/i }),
    ).toHaveAttribute("href", "/plasmids?group=regular")
  })
})
