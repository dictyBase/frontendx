import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { AuthorizedNewsList } from "../src/news/AuthorizedNewsList"
import { BrowserRouter } from "react-router-dom"

describe("AuthorizedNewsList", () => {
  it("renders authorized news items", () => {
    const contentList = [
      { name: "news1", content: "Content 1", updated_at: "2024-08-23T00:00:00Z" },
    ]
    render(
      <BrowserRouter>
        <AuthorizedNewsList contentList={contentList} />
      </BrowserRouter>
    )
    expect(screen.getByText("August 23, 2024")).toBeInTheDocument()
    expect(screen.getByText("Content 1")).toBeInTheDocument()
  })
})
