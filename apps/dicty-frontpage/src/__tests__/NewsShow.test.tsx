import { describe, test, expect } from "vitest"
import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import { ListContentByNamespaceDocument } from "dicty-graphql-schema"
import News from "../pages/news/show"
import { NEWS_NAMESPACE } from "../common/constants/namespace"

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
      variables: { namespace: NEWS_NAMESPACE },
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

describe("News Component", () => {
  test("renders loading state initially", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <News />
      </MockedProvider>,
    )
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  test("renders error state", async () => {
    const errorMocks = [
      {
        request: {
          query: ListContentByNamespaceDocument,
          variables: { namespace: NEWS_NAMESPACE },
        },
        error: new Error("An error occurred"),
      },
    ]

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <News />
      </MockedProvider>,
    )

    expect(
      await screen.findByText(/this message should not appear/i),
    ).toBeInTheDocument()
  })

  test("renders empty state", async () => {
    const emptyMocks = [
      {
        request: {
          query: ListContentByNamespaceDocument,
          variables: { namespace: NEWS_NAMESPACE },
        },
        result: {
          data: {
            listContentByNamespace: [],
          },
        },
      },
    ]

    render(
      <MockedProvider mocks={emptyMocks} addTypename={false}>
        <News />
      </MockedProvider>,
    )

    expect(
      await screen.findByText(/there are currently no news items/i),
    ).toBeInTheDocument()
  })

  test("renders news items", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <News />
      </MockedProvider>,
    )

    expect(await screen.findByText(expectedText)).toBeInTheDocument()
  })
})
