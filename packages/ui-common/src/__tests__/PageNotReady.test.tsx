import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PageNotReady } from "../PageNotReady"

test("should render sad dicty image", () => {
  render(<PageNotReady />)
  expect(
    screen.getByRole("img", { name: "Sad Dicty Logo" }),
  ).toBeInTheDocument()
})

test("should display header text", () => {
  render(<PageNotReady />)
  expect(screen.getByText(/Content Not Ready/)).toBeInTheDocument()
})
