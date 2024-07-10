import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DeleteDialog } from "../common/components/DeleteDialog"

test("When open = false, the dialog should be closed", async () => {
  render(<DeleteDialog open={false} onClose={() => {}} />)

  expect(screen.queryByText(/are you sure/i)).toBeNull()
})

test("When open = true, the dialog should be closed", async () => {
  render(<DeleteDialog open={true} onClose={() => {}} />)

  expect(screen.queryByText(/are you sure/i)).toBeInTheDocument()
})

test("Shows a delete button when open", async () => {
  render(<DeleteDialog open={true} onClose={() => {}} />)

  expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument()
})

test("Shows a cancel button when open", async () => {
  render(<DeleteDialog open={true} onClose={() => {}} />)
 
  expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
})
