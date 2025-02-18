import { render, screen } from "@testing-library/react"
import { ContentBySlugQueryHookResult } from "dicty-graphql-schema"
import { describe, it, expect } from "vitest"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { AuthorizedStockCenterInfo } from "../home/AuthorizedStockCenterInfo"
import { mockContent, sampleText } from "../mocks/mockContent"

const mockData = {
  data: {
    contentBySlug: {
      content: JSON.stringify(mockContent),
      slug: "mock-slug",
    },
  },
} as ContentBySlugQueryHookResult

const loadingData = {
  loading: true,
} as ContentBySlugQueryHookResult

const errorData = {
  error: new Error("Something went wrong"),
} as ContentBySlugQueryHookResult

describe("StockCenterInfo", () => {
  it("renders the mock content text when data is present", () => {
    const Wrapper = () => {
      const router = createMemoryRouter(
        [
          {
            path: "/",
            element: <AuthorizedStockCenterInfo queryResult={mockData} />,
          },
        ],
        {
          initialEntries: ["/"],
        },
      )

      return <RouterProvider router={router} />
    }

    render(<Wrapper />)
    expect(screen.getByText(sampleText)).toBeInTheDocument()
  })

  it("renders a loading display when loading is true", () => {
    render(<AuthorizedStockCenterInfo queryResult={loadingData} />)
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0)
  })

  it("renders an error message when there is an error", () => {
    render(<AuthorizedStockCenterInfo queryResult={errorData} />)
    expect(screen.getByText("Error")).toBeInTheDocument()
  })
})
