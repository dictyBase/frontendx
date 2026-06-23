import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { SectionTitle } from "../home/SectionTitle"

test("renders SectionTitle with text", () => {
  render(<SectionTitle>Test Section</SectionTitle>)
  expect(screen.getByText("Test Section")).toBeInTheDocument()
})

test("renders with correct heading level", () => {
  render(<SectionTitle>Test Section</SectionTitle>)
  const heading = screen.getByRole("heading", { level: 2 })
  expect(heading).toHaveTextContent("Test Section")
})

test("renders with id when provided", () => {
  const { container } = render(
    <SectionTitle id="test-section">Test Section</SectionTitle>,
  )
  const sectionBox = container.querySelector("#test-section")
  expect(sectionBox).toBeInTheDocument()
})

test("renders without id when not provided", () => {
  const { container } = render(<SectionTitle>Test Section</SectionTitle>)
  const sectionBox = container.firstChild
  expect(sectionBox).not.toHaveAttribute("id")
})

test("applies custom sx styles", () => {
  const { container } = render(
    <SectionTitle sx={{ marginBottom: "50px" }}>Test Section</SectionTitle>,
  )
  const sectionBox = container.firstChild
  expect(sectionBox).toHaveStyle({ marginBottom: "50px" })
})
