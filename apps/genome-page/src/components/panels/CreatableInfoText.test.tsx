import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { CreatableInfoText } from "./CreatableInfoText"

test("should render create button with icon", () => {
  const mockSetIsCreating = vi.fn()

  render(<CreatableInfoText setIsCreating={mockSetIsCreating} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  expect(createButton).toBeInTheDocument()
  expect(screen.getByTestId("AddIcon")).toBeInTheDocument()
})

test("should call setIsCreating with true when create button is clicked", async () => {
  const user = userEvent.setup()
  const mockSetIsCreating = vi.fn()

  render(<CreatableInfoText setIsCreating={mockSetIsCreating} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  await user.click(createButton)

  expect(mockSetIsCreating).toHaveBeenCalledWith(true)
  expect(mockSetIsCreating).toHaveBeenCalledTimes(1)
})

test("should have correct styling attributes", () => {
  const mockSetIsCreating = vi.fn()

  render(<CreatableInfoText setIsCreating={mockSetIsCreating} />)

  const createButton = screen.getByRole("button", { name: /create/i })
  expect(createButton).toHaveStyle({ borderRadius: "9999px" })
})
