import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { LoadingConfirmationButton } from "./LoadingConfirmationButton"

test("should render check icon when not loading", () => {
  const mockOnClick = vi.fn()
  render(<LoadingConfirmationButton onClick={mockOnClick} loading={false} />)

  const button = screen.getByRole("button", { name: /save new tag/i })
  expect(button).toBeInTheDocument()
  expect(button).not.toBeDisabled()
  expect(screen.getByTestId("CheckIcon")).toBeInTheDocument()
})

test("should render circular progress when loading", () => {
  const mockOnClick = vi.fn()
  render(<LoadingConfirmationButton onClick={mockOnClick} loading />)

  const button = screen.getByRole("button", { name: /save new tag/i })
  expect(button).toBeInTheDocument()
  expect(button).toBeDisabled()
  expect(screen.getByRole("progressbar")).toBeInTheDocument()
})

test("should call onClick when button is clicked and not loading", async () => {
  const user = userEvent.setup()
  const mockOnClick = vi.fn()
  render(<LoadingConfirmationButton onClick={mockOnClick} loading={false} />)

  const button = screen.getByRole("button", { name: /save new tag/i })
  await user.click(button)

  expect(mockOnClick).toHaveBeenCalledTimes(1)
})

test("should not be clickable when loading", () => {
  const mockOnClick = vi.fn()
  render(<LoadingConfirmationButton onClick={mockOnClick} loading />)

  const button = screen.getByRole("button", { name: /save new tag/i })
  expect(button).toBeDisabled()
})
