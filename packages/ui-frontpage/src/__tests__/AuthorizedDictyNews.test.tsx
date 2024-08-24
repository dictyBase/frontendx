import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { MockedProvider } from "@apollo/client/testing"
import { ListContentByNamespaceDocument } from "dicty-graphql-schema"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { AuthorizedDictyNews } from "../news/AuthorizedDictyNews"

const expectedText = "Rice & Beans"
const mockContent = {
  root: {
    children: [
      {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "font-size: 20px;",
                text: expectedText,
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "flex-layout",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
}
const mockData = {
  id: "1",
  name: "news1",
  slug: "news-1",
  namespace: "news",
  content: JSON.stringify(mockContent),
  created_at: "2024-08-22T00:00:00Z",
  updated_at: "2024-08-23T00:00:00Z",
  created_by: {
    id: "user1",
    email: "user1@example.com",
    first_name: "User",
    last_name: "One",
  },
  updated_by: {
    id: "user2",
    email: "user2@example.com",
    first_name: "User",
    last_name: "Two",
  },
}

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
            ...mockData,
          },
        ],
      },
    },
  },
]

describe("AuthorizedDictyNews", () => {
  it("renders authorized news list", async () => {
    const router = createMemoryRouter(
      [{ path: "/", element: <AuthorizedDictyNews /> }],
      {
        initialEntries: ["/"],
      },
    )

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    expect(
      await screen.findByText("Friday, August 23rd, 2024"),
    ).toBeInTheDocument()
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
})
