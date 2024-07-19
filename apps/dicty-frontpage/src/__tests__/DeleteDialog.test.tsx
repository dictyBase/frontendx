import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { DeleteDialog } from "../common/components/DeleteDialog"

test("When open = false, the dialog should be closed", async () => {
  const router = createMemoryRouter([
    {
      index: true,
      element: <DeleteDialog open={false} onClose={() => {}} />,
    },
  ])
  render(
    <MockedProvider>
      <RouterProvider router={router} />
    </MockedProvider>,
  )

  expect(screen.queryByText(/are you sure/i)).toBeNull()
})

test("When open = true, the dialog should be closed", async () => {
  const router = createMemoryRouter([
    {
      index: true,
      element: <DeleteDialog open onClose={() => {}} />,
    },
  ])
  render(
    <MockedProvider>
      <RouterProvider router={router} />
    </MockedProvider>,
  )

  expect(screen.queryByText(/are you sure/i)).toBeInTheDocument()
})

test("Shows a delete button when open", async () => {
  const router = createMemoryRouter([
    {
      index: true,
      element: <DeleteDialog open onClose={() => {}} />,
    },
  ])
  render(
    <MockedProvider>
      <RouterProvider router={router} />
    </MockedProvider>,
  )

  expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument()
})

test("Shows a cancel button when open", async () => {
  const router = createMemoryRouter([
    {
      index: true,
      element: <DeleteDialog open onClose={() => {}} />,
    },
  ])
  render(
    <MockedProvider>
      <RouterProvider router={router} />
    </MockedProvider>,
  )

  expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
})
