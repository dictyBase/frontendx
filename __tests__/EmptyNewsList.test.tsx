import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { EmptyNewsList } from "../src/news/EmptyNewsList"

describe("EmptyNewsList", () => {
  it("renders the correct message", () => {
    render(<EmptyNewsList />)
    expect(screen.getByText("There are currently no news items")).toBeInTheDocument()
  })
})
