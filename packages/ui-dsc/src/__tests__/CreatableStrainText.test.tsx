import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { CreatableStrainText } from "../catalog/CreatableStrainText"

test("should render create button with add icon", () => {
  const mockSetIsCreating = vi.fn()

  render(<CreatableStrainText setIsCreating={mockSetIsCreating} />)

  expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument()
  expect(screen.getByTestId("AddIcon")).toBeInTheDocument()
})

test("should call setIsCreating with true when create button is clicked", async () => {
  const user = userEvent.setup()
  const mockSetIsCreating = vi.fn()

  render(<CreatableStrainText setIsCreating={mockSetIsCreating} />)

  await user.click(screen.getByRole("button", { name: /create/i }))

  expect(mockSetIsCreating).toHaveBeenCalledWith(true)
  expect(mockSetIsCreating).toHaveBeenCalledTimes(1)
})
