import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { expect, test } from "vitest"
import { ArrowLink } from "../home/ArrowLink"

test("renders ArrowLink with correct text", () => {
  render(
    <MemoryRouter>
      <ArrowLink href="/test">Click me</ArrowLink>
    </MemoryRouter>,
  )
  expect(screen.getByText("Click me")).toBeInTheDocument()
})

test("renders ArrowLink with correct href", () => {
  render(
    <MemoryRouter>
      <ArrowLink href="/test-path">Navigate</ArrowLink>
    </MemoryRouter>,
  )
  const link = screen.getByRole("link")
  expect(link).toHaveAttribute("href", "/test-path")
})

test("applies custom sx styles", () => {
  render(
    <MemoryRouter>
      <ArrowLink href="/test" sx={{ fontSize: "2rem" }}>
        Styled Link
      </ArrowLink>
    </MemoryRouter>,
  )
  const typography = screen.getByText("Styled Link").parentElement
  expect(typography).toHaveStyle({ fontSize: "2rem" })
})
