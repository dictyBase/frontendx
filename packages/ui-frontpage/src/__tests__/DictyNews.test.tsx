import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { DictyNews } from "../src/news/DictyNews"
import { MockedProvider } from "@apollo/client/testing"
import { ListContentByNamespaceDocument } from "dicty-graphql-schema"

const mocks = [
  {
    request: {
      query: ListContentByNamespaceDocument,
      variables: { namespace: "news" },
    },
    result: {
      data: {
        listContentByNamespace: [
          { name: "news1", content: "Content 1", updated_at: "2024-08-23T00:00:00Z" },
        ],
      },
    },
  },
]

describe("DictyNews", () => {
  it("renders news list", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DictyNews />
      </MockedProvider>
    )
    expect(await screen.findByText("August 23, 2024")).toBeInTheDocument()
    expect(screen.getByText("Content 1")).toBeInTheDocument()
  })
})
