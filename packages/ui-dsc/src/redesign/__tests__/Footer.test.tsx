import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { Footer } from "../Footer"

test("renders Footer with title", () => {
  render(<Footer title="Test Footer" />)
  expect(screen.getByText("Test Footer")).toBeInTheDocument()
})

test("renders Footer with subtitle", () => {
  render(<Footer title="Test Footer" subtitle="Test Subtitle" />)
  expect(screen.getByText("Test Subtitle")).toBeInTheDocument()
})

test("renders Footer without subtitle", () => {
  render(<Footer title="Test Footer" />)
  expect(screen.queryByText("Test Subtitle")).not.toBeInTheDocument()
})

test("renders as footer element", () => {
  const { container } = render(<Footer title="Test Footer" />)
  const footer = container.querySelector("footer")
  expect(footer).toBeInTheDocument()
})

test("applies custom sx styles", () => {
  const { container } = render(
    <Footer title="Test Footer" sx={{ backgroundColor: "blue" }} />,
  )
  const footer = container.querySelector("footer")
  expect(footer).toHaveStyle({ backgroundColor: "blue" })
})
