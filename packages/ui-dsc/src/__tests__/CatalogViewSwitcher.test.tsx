import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { CatalogViewSwitcher } from "../catalog/CatalogViewSwitcher"

test("renders list and table view toggle buttons", () => {
  render(<CatalogViewSwitcher view="list" onChange={vi.fn()} />)
  expect(screen.getByRole("button", { name: /list view/i })).toBeInTheDocument()
  expect(
    screen.getByRole("button", { name: /table view/i }),
  ).toBeInTheDocument()
})

test("marks the active view button as pressed", () => {
  render(<CatalogViewSwitcher view="table" onChange={vi.fn()} />)
  expect(screen.getByRole("button", { name: /table view/i })).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  expect(screen.getByRole("button", { name: /list view/i })).toHaveAttribute(
    "aria-pressed",
    "false",
  )
})

test("calls onChange when the unselected view button is clicked", async () => {
  const onChange = vi.fn()
  render(<CatalogViewSwitcher view="list" onChange={onChange} />)
  await userEvent.click(screen.getByRole("button", { name: /table view/i }))
  expect(onChange).toHaveBeenCalledWith("table")
})

test("does not call onChange when clicking the already selected view button", async () => {
  const onChange = vi.fn()
  render(<CatalogViewSwitcher view="list" onChange={onChange} />)
  await userEvent.click(screen.getByRole("button", { name: /list view/i }))
  expect(onChange).not.toHaveBeenCalled()
})
