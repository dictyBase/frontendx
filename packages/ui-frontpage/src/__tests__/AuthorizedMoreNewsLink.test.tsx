import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { AuthorizedMoreNewsLink } from "../src/news/AuthorizedMoreNewsLink"
import { BrowserRouter } from "react-router-dom"

describe("AuthorizedMoreNewsLink", () => {
  it("renders the Authorized More News link", () => {
    render(
      <BrowserRouter>
        <AuthorizedMoreNewsLink />
      </BrowserRouter>
    )
    expect(screen.getByText("More News")).toBeInTheDocument()
  })
})
