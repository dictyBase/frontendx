import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { BrowserRouter } from "react-router-dom"
import { MoreNewsLink } from "../news/MoreNewsLink"

describe("MoreNewsLink", () => {
  it("renders the More News link", () => {
    render(
      <BrowserRouter>
        <MoreNewsLink />
      </BrowserRouter>,
    )
    expect(screen.getByText("More News")).toBeInTheDocument()
  })
})
