import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { MockedProvider } from "@apollo/client/testing"
import { ListContentByNamespaceDocument } from "dicty-graphql-schema"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { DictyNews } from "../news/DictyNews"

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
            content: JSON.stringify(mockContent),
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
