import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FooterLink } from "../components/FooterLink"

test("it renders a link", () => {
  const url = "/testUrl"
  const label = "Test"

  render(<FooterLink url={url} label={label} />)

  const link = screen.getByRole("link", { name: label })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute("href", url)
})
