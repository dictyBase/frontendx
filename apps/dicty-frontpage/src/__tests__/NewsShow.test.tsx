import { describe, test, expect } from "vitest"
import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import News from "../pages/news/show"
import { NEWS_NAMESPACE } from "../../common/constants/namespace"
import { useListContentByNamespaceQuery } from "dicty-graphql-schema"

const mocks = [
  {
    request: {
      query: useListContentByNamespaceQuery,
      variables: { namespace: NEWS_NAMESPACE },
    },
    result: {
      data: {
        listContentByNamespace: [
          {
            id: "1",
            name: "news-1",
            content: "Sample content",
            updated_at: "2022-01-01T00:00:00.000Z",
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
          query: useListContentByNamespaceQuery,
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

    expect(await screen.findByText(/this message should not appear/i)).toBeInTheDocument()
  })

  test("renders empty state", async () => {
    const emptyMocks = [
      {
        request: {
          query: useListContentByNamespaceQuery,
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

    expect(await screen.findByText(/there are currently no news items/i)).toBeInTheDocument()
  })

  test("renders news items", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <News />
      </MockedProvider>,
    )

    expect(await screen.findByText(/sample content/i)).toBeInTheDocument()
  })
})
