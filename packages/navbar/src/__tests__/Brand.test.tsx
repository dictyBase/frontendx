import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { type Theme } from "@material-ui/core"
import { Brand } from "../components/Brand"

const properties = {
  title: "Test",
  href: "google.com",
  theme: {} as Theme,
}

test("should render its title", () => {
  render(<Brand {...properties} />)
  expect(screen.getByText(/test/i)).toBeInTheDocument()
})
test("should have the correct href", () => {
  render(<Brand {...properties} />)
  expect(screen.getByRole("link")).toHaveAttribute("href", "google.com")
})
