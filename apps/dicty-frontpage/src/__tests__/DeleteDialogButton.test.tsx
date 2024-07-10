import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DeleteDialogButton } from "../common/components/DeleteDialogButton"

test("DeleteDialogButton opens a dialog when it is clicked", async () => {
  const user = userEvent.setup()
  render(<DeleteDialogButton />)

  const deleteButton = screen.getByRole("button", { name: "Delete" })
  await user.click(deleteButton)

  expect(screen.getByText(/are you sure/i)).toBeInTheDocument()
})
