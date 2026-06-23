import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { WarningBanner } from "../WarningBanner"

test("renders WarningBanner with text content", () => {
  render(<WarningBanner>Warning message</WarningBanner>)
  expect(screen.getByText("Warning message")).toBeInTheDocument()
})

test("renders WarningBanner with children elements", () => {
  render(
    <WarningBanner>
      <span>Important:</span>
      <p>This is a warning</p>
    </WarningBanner>,
  )
  expect(screen.getByText("Important:")).toBeInTheDocument()
  expect(screen.getByText("This is a warning")).toBeInTheDocument()
})

test("applies custom sx styles", () => {
  const { container } = render(
    <WarningBanner sx={{ padding: "50px" }}>Warning</WarningBanner>,
  )
  const banner = container.firstChild
  expect(banner).toHaveStyle({ padding: "50px" })
})

test("renders as a Box component", () => {
  const { container } = render(<WarningBanner>Warning</WarningBanner>)
  const banner = container.firstChild
  expect(banner).toHaveClass("MuiBox-root")
})
