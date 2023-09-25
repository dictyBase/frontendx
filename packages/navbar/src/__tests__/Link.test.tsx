import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Theme } from "@material-ui/core"
import { Link } from "../components/Link"

const properties = {
  title: "Test",
  href: "google.com",
  theme: { text: "white" } as unknown as Theme,
}
test("should render its title", () => {
  render(<Link {...properties} />)
  expect(screen.getByText(/test/i)).toBeInTheDocument()
})
test("should have the correct href", () => {
  render(<Link {...properties} />)
  expect(screen.getByRole("link")).toHaveAttribute("href", "google.com")
})
