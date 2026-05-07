import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { EmptyCatalog } from "../catalog/EmptyCatalog"

test("Displays `message` prop", () => {
  const testMessage = "No mangoes found"
  render(<EmptyCatalog message={testMessage} />)
  expect(screen.getByText(testMessage)).toBeInTheDocument()
})
