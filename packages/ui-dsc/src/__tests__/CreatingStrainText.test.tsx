import { vi, test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright, left as TEleft } from "fp-ts/TaskEither"
import { CreatingStrainText } from "../catalog/CreatingStrainText"
import { StrainUpdateErrorType } from "../catalog/useAuthorizedUpdateStrain"

const TEST_ID = "DBS0236123"
const NEW_VALUE = "pSpaA-KO"
const mockUpdate = vi.fn()

vi.mock("../catalog/useAuthorizedUpdateStrain", async () => {
  const actual = await vi.importActual<
    typeof import("../catalog/useAuthorizedUpdateStrain")
  >("../catalog/useAuthorizedUpdateStrain")
  return {
    ...actual,
    useAuthorizedUpdateStrain: () => mockUpdate,
  }
})

beforeEach(() => {
  mockUpdate.mockClear()
})

test("should render empty autofocused text field with disabled save button", () => {
  mockUpdate.mockReturnValue(TEright({}))
  const mockSetIsCreating = vi.fn()

  render(
    <CreatingStrainText
      id={TEST_ID}
      field="plasmid"
      setIsCreating={mockSetIsCreating}
    />,
  )

  const textField = screen.getByRole("textbox")
  expect(textField).toHaveValue("")
  expect(textField).toHaveFocus()
  expect(screen.getByRole("button", { name: /save/i })).toBeDisabled()
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
})

test("should call update and exit creating mode when save is clicked", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(TEright({}))
  const mockSetIsCreating = vi.fn()

  render(
    <CreatingStrainText
      id={TEST_ID}
      field="plasmid"
      setIsCreating={mockSetIsCreating}
    />,
  )

  const textField = screen.getByRole("textbox")
  await user.type(textField, NEW_VALUE)

  const saveButton = screen.getByRole("button", { name: /save/i })
  expect(saveButton).not.toBeDisabled()
  await user.click(saveButton)

  expect(mockUpdate).toHaveBeenCalledWith(TEST_ID, { plasmid: NEW_VALUE })
  expect(mockSetIsCreating).toHaveBeenCalledWith(false)
})

test("should not call update and exit creating mode when cancel is clicked", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(TEright({}))
  const mockSetIsCreating = vi.fn()

  render(
    <CreatingStrainText
      id={TEST_ID}
      field="plasmid"
      setIsCreating={mockSetIsCreating}
    />,
  )

  await user.type(screen.getByRole("textbox"), NEW_VALUE)
  await user.click(screen.getByRole("button", { name: /cancel/i }))

  expect(mockUpdate).not.toHaveBeenCalled()
  expect(mockSetIsCreating).toHaveBeenCalledWith(false)
})

test("should show error alert when save fails", async () => {
  const user = userEvent.setup()
  const errorMessage = "Could not update strain data"
  mockUpdate.mockReturnValue(
    TEleft({
      errorType: StrainUpdateErrorType.UPDATE,
      message: errorMessage,
    }),
  )
  const mockSetIsCreating = vi.fn()

  render(
    <CreatingStrainText
      id={TEST_ID}
      field="plasmid"
      setIsCreating={mockSetIsCreating}
    />,
  )

  await user.type(screen.getByRole("textbox"), NEW_VALUE)
  await user.click(screen.getByRole("button", { name: /save/i }))

  expect(await screen.findByText(errorMessage)).toBeInTheDocument()
  expect(mockSetIsCreating).not.toHaveBeenCalled()
})
