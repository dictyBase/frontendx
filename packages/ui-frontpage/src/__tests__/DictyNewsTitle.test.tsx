import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { DictyNewsTitle } from "../src/news/DictyNewsTitle"

describe("DictyNewsTitle", () => {
  it("renders the Dicty News title", () => {
    render(<DictyNewsTitle />)
    expect(screen.getByText("Dicty News")).toBeInTheDocument()
  })
})
