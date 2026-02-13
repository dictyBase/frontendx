import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SelectedFile } from "../components/SelectedFile"

test("renders filename", () => {
  render(<SelectedFile filename="test-document.pdf" />)
  expect(screen.getByText("test-document.pdf")).toBeInTheDocument()
})

test("renders file icon", () => {
  const { container } = render(<SelectedFile filename="report.docx" />)
  const icon = container.querySelector("svg")
  expect(icon).toBeInTheDocument()
})

test("renders with different filenames", () => {
  const { rerender } = render(<SelectedFile filename="first.txt" />)
  expect(screen.getByText("first.txt")).toBeInTheDocument()

  rerender(<SelectedFile filename="second.csv" />)
  expect(screen.getByText("second.csv")).toBeInTheDocument()
  expect(screen.queryByText("first.txt")).not.toBeInTheDocument()
})
