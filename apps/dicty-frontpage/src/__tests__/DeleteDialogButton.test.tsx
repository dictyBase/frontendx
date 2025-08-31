import { test, expect } from "vitest"
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { MockedProvider } from "@apollo/client/testing"
import { userEvent } from "@testing-library/user-event"
import { DeleteDialogButton } from "../common/components/DeleteDialogButton"

test("DeleteDialogButton opens a dialog when it is clicked", async () => {
  const user = userEvent.setup()
  const router = createMemoryRouter([
    {
      index: true,
      element: <DeleteDialogButton />,
    },
  ])
  render(
    <MockedProvider>
      <RouterProvider router={router} />
    </MockedProvider>,
  )

  const deleteButton = screen.getByRole("button", { name: "Delete" })
  await user.click(deleteButton)

  expect(screen.getByText(/are you sure/i)).toBeInTheDocument()
})

test("DeleteDialogButton closes dialog when cancel is clicked", async () => {
  const user = userEvent.setup()
  const router = createMemoryRouter([
    {
      index: true,
      element: <DeleteDialogButton />,
    },
  ])
  render(
    <MockedProvider>
      <RouterProvider router={router} />
    </MockedProvider>,
  )

  // Open the dialog
  const deleteButton = screen.getByRole("button", { name: "Delete" })
  await user.click(deleteButton)
  expect(screen.getByText(/are you sure/i)).toBeInTheDocument()

  // Close the dialog
  const cancelButton = screen.getByRole("button", { name: "Cancel" })
  await user.click(cancelButton)

  // Wait for the dialog to close
  await waitForElementToBeRemoved(() => screen.queryByText(/are you sure/i))
})
