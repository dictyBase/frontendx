import { test, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { MockedProvider } from "@apollo/client/testing"
import { userEvent } from "@testing-library/user-event"
import { Provider as JotaiProvider } from "jotai"
import { DeleteButton } from "../common/components/DeleteButton"

// Mock the hooks
vi.mock("../common/hooks/useAuthorizedDeleteContent")

const mockAuthorizedDeleteContent = vi.fn()
const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock("../common/hooks/useAuthorizedDeleteContent", () => ({
  useAuthorizedDeleteContent: () => mockAuthorizedDeleteContent,
}))

beforeEach(() => {
  vi.clearAllMocks()
})

test("DeleteButton calls handleDelete and navigates when clicked", async () => {
  const user = userEvent.setup()
  mockAuthorizedDeleteContent.mockResolvedValue(undefined)

  const router = createMemoryRouter([
    {
      index: true,
      element: <DeleteButton />,
    },
  ])

  render(
    <MockedProvider>
      <JotaiProvider>
        <RouterProvider router={router} />
      </JotaiProvider>
    </MockedProvider>,
  )

  const deleteButton = screen.getByRole("button", { name: "Delete" })
  await user.click(deleteButton)

  expect(mockAuthorizedDeleteContent).toHaveBeenCalledOnce()
  expect(mockNavigate).toHaveBeenCalledWith("/news/editable", {
    relative: "path",
  })
})

test("DeleteButton handles delete function errors gracefully", async () => {
  const user = userEvent.setup()
  const error = new Error("Delete failed")
  mockAuthorizedDeleteContent.mockRejectedValue(error)

  const router = createMemoryRouter([
    {
      index: true,
      element: <DeleteButton />,
    },
  ])

  render(
    <MockedProvider>
      <JotaiProvider>
        <RouterProvider router={router} />
      </JotaiProvider>
    </MockedProvider>,
  )

  const deleteButton = screen.getByRole("button", { name: "Delete" })
  await user.click(deleteButton)

  expect(mockAuthorizedDeleteContent).toHaveBeenCalledOnce()
  // Navigation should not happen when delete fails
  expect(mockNavigate).not.toHaveBeenCalled()
})
