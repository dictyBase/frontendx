import { vi, test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright, left as TEleft } from "fp-ts/TaskEither"
import {
  EditingStrainText,
  buildStrainTextUpdateInput,
} from "../catalog/EditingStrainText"
import { StrainUpdateErrorType } from "../catalog/useAuthorizedUpdateStrain"

const TEST_ID = "DBS0236123"
const INITIAL_TEXT = "Initial summary"
const UPDATED_TEXT = "Updated summary"
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

test("buildStrainTextUpdateInput maps genotypes to array and scalar fields to string", () => {
  expect(buildStrainTextUpdateInput("label", "aarA-")).toEqual({
    label: "aarA-",
  })
  expect(buildStrainTextUpdateInput("genotypes", "axeA2,bsR")).toEqual({
    genotypes: ["axeA2,bsR"],
  })
  expect(buildStrainTextUpdateInput("genotypes", "")).toEqual({
    genotypes: [],
  })
})

test("should render autofocused text field with initial text and save/cancel buttons", () => {
  mockUpdate.mockReturnValue(TEright({}))
  const mockSetIsEditing = vi.fn()

  render(
    <EditingStrainText
      id={TEST_ID}
      field="summary"
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  const textField = screen.getByDisplayValue(INITIAL_TEXT)
  expect(textField).toBeInTheDocument()
  expect(textField).toHaveFocus()
  expect(screen.getByRole("button", { name: /save/i })).toBeDisabled()
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
})

test("should call update and exit editing mode when save is clicked", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(TEright({}))
  const mockSetIsEditing = vi.fn()

  render(
    <EditingStrainText
      id={TEST_ID}
      field="summary"
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  const textField = screen.getByDisplayValue(INITIAL_TEXT)
  await user.clear(textField)
  await user.type(textField, UPDATED_TEXT)

  const saveButton = screen.getByRole("button", { name: /save/i })
  expect(saveButton).not.toBeDisabled()
  await user.click(saveButton)

  expect(mockUpdate).toHaveBeenCalledWith(TEST_ID, {
    summary: UPDATED_TEXT,
  })
  expect(mockSetIsEditing).toHaveBeenCalledWith(false)
})

test("should not call update and exit editing mode when cancel is clicked", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(TEright({}))
  const mockSetIsEditing = vi.fn()

  render(
    <EditingStrainText
      id={TEST_ID}
      field="summary"
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  const textField = screen.getByDisplayValue(INITIAL_TEXT)
  await user.clear(textField)
  await user.type(textField, UPDATED_TEXT)

  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  await user.click(cancelButton)

  expect(mockUpdate).not.toHaveBeenCalled()
  expect(mockSetIsEditing).toHaveBeenCalledWith(false)
})

test("should display error alert and stay in editing mode when save fails", async () => {
  const user = userEvent.setup()
  const errorMessage = "Could not update strain data"
  mockUpdate.mockReturnValue(
    TEleft({
      errorType: StrainUpdateErrorType.UPDATE,
      message: errorMessage,
    }),
  )
  const mockSetIsEditing = vi.fn()

  render(
    <EditingStrainText
      id={TEST_ID}
      field="summary"
      initialText={INITIAL_TEXT}
      setIsEditing={mockSetIsEditing}
    />,
  )

  const textField = screen.getByDisplayValue(INITIAL_TEXT)
  await user.clear(textField)
  await user.type(textField, UPDATED_TEXT)

  const saveButton = screen.getByRole("button", { name: /save/i })
  await user.click(saveButton)

  expect(await screen.findByText(errorMessage)).toBeInTheDocument()
  expect(mockSetIsEditing).not.toHaveBeenCalled()
})
