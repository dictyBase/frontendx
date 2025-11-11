import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { CreateItemDialog } from "./CreateItemDialog"

const TEST_ID = "DDB_G0123456"

vi.mock("common/hooks/useAuthorizedCreateGeneGeneralInfo", () => ({
  useAuthorizedCreateGeneGeneralInfo: () => vi.fn(),
}))

test("should not render when open is false", () => {
  const mockOnClose = vi.fn()

  render(
    <CreateItemDialog
      id={TEST_ID}
      label="Synonym"
      field="name_description"
      open={false}
      onClose={mockOnClose}
    />,
  )

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
})

test("should render dialog when open is true", () => {
  const mockOnClose = vi.fn()

  render(
    <CreateItemDialog
      id={TEST_ID}
      label="Synonym"
      field="name_description"
      open
      onClose={mockOnClose}
    />,
  )

  expect(screen.getByRole("dialog")).toBeInTheDocument()
})

test("should display correct dialog title with label", () => {
  const mockOnClose = vi.fn()

  render(
    <CreateItemDialog
      id={TEST_ID}
      label="Synonym"
      field="name_description"
      open
      onClose={mockOnClose}
    />,
  )

  expect(screen.getByText("Create Synonym")).toBeInTheDocument()
})

test("should render text field with correct label", () => {
  const mockOnClose = vi.fn()

  render(
    <CreateItemDialog
      id={TEST_ID}
      label="Synonym"
      field="name_description"
      open
      onClose={mockOnClose}
    />,
  )

  expect(screen.getByLabelText("Synonym")).toBeInTheDocument()
})

test("should render create and cancel buttons", () => {
  const mockOnClose = vi.fn()

  render(
    <CreateItemDialog
      id={TEST_ID}
      label="Synonym"
      field="name_description"
      open
      onClose={mockOnClose}
    />,
  )

  expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
})

test("should disable create button when input is empty", () => {
  const mockOnClose = vi.fn()

  render(
    <CreateItemDialog
      id={TEST_ID}
      label="Synonym"
      field="name_description"
      open
      onClose={mockOnClose}
    />,
  )

  const createButton = screen.getByRole("button", { name: /create/i })
  expect(createButton).toBeDisabled()
})

test("should enable create button when input has value", async () => {
  const user = userEvent.setup()
  const mockOnClose = vi.fn()

  render(
    <CreateItemDialog
      id={TEST_ID}
      label="Synonym"
      field="name_description"
      open
      onClose={mockOnClose}
    />,
  )

  const textField = screen.getByLabelText("Synonym")
  await user.type(textField, "test value")

  const createButton = screen.getByRole("button", { name: /create/i })
  expect(createButton).not.toBeDisabled()
})

test("should update input value when typing", async () => {
  const user = userEvent.setup()
  const mockOnClose = vi.fn()

  render(
    <CreateItemDialog
      id={TEST_ID}
      label="Synonym"
      field="name_description"
      open
      onClose={mockOnClose}
    />,
  )

  const textField = screen.getByLabelText("Synonym")
  await user.type(textField, "test value")

  expect(textField).toHaveValue("test value")
})

test("should call onClose when cancel button is clicked", async () => {
  const user = userEvent.setup()
  const mockOnClose = vi.fn()

  render(
    <CreateItemDialog
      id={TEST_ID}
      label="Synonym"
      field="name_description"
      open
      onClose={mockOnClose}
    />,
  )

  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  await user.click(cancelButton)

  expect(mockOnClose).toHaveBeenCalledTimes(1)
})
