import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { BrowserRouter } from "react-router-dom"
import { NewsList } from "../news/NewsList"

describe("NewsList", () => {
  it("renders news items", () => {
    const contentList = [
      {
        name: "news1",
        content: "Content 1",
        updated_at: "2024-08-23T00:00:00Z",
      },
    ]
    render(
      <BrowserRouter>
        <NewsList contentList={contentList} />
      </BrowserRouter>,
    )
    expect(screen.getByText("August 23, 2024")).toBeInTheDocument()
    expect(screen.getByText("Content 1")).toBeInTheDocument()
  })
})
