import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { MockedProvider } from "@apollo/client/testing"
import { ListContentByNamespaceDocument } from "dicty-graphql-schema"
import { DictyNews } from "../news/DictyNews"
import { RouterProvider, createMemoryRouter } from "react-router-dom"

const mocks = [
  {
    request: {
      query: ListContentByNamespaceDocument,
      variables: { namespace: "news" },
    },
    result: {
      data: {
        listContentByNamespace: [
          {
            name: "news1",
            content: "Content 1",
            updated_at: "2024-08-23T00:00:00Z",
          },
        ],
      },
    },
  },
]

describe("DictyNews", () => {
  it("renders news list", async () => {
    const router = createMemoryRouter([{ path: "/", element: <DictyNews /> }], {
      initialEntries: ["/"],
    })

    render(
      <RouterProvider router={router}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <DictyNews />
      </MockedProvider>
      </RouterProvider>,
    )
    expect(await screen.findByText("August 23, 2024")).toBeInTheDocument()
    expect(screen.getByText("Content 1")).toBeInTheDocument()
  })
})
