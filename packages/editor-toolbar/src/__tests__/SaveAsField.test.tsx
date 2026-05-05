import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { FormProvider } from "react-hook-form"
import { SaveAsField } from "../components/SaveAsField"
import { useValidateSuggestedFilename } from "../components/helpers/fileUploadHelpers"

const VALID_FILENAME = "valid-filename.pdf"
const VALID_FILENAME_WITH_SPACE = "valid filename.pdf"

const SaveAsFieldWrapper = () => {
  const methods = useValidateSuggestedFilename()
  return (
    <FormProvider {...methods}>
      <SaveAsField />
    </FormProvider>
  )
}

test("renders file name field", () => {
  render(<SaveAsFieldWrapper />)
  expect(screen.getByLabelText(/file name/i)).toBeInTheDocument()
})

test("shows initial helper text", () => {
  render(<SaveAsFieldWrapper />)
  expect(
    screen.getByText(/the name that the file will be saved as/i),
  ).toBeInTheDocument()
})

test("accepts valid filename input", async () => {
  const user = userEvent.setup()
  render(<SaveAsFieldWrapper />)

  const input = screen.getByLabelText(/file name/i)
  await user.type(input, VALID_FILENAME)

  expect(input).toHaveValue(VALID_FILENAME)
})

test("accepts filename inpiut with spaces", async () => {
  const user = userEvent.setup()
  render(<SaveAsFieldWrapper />)

  const input = screen.getByLabelText(/file name/i)
  await user.type(input, VALID_FILENAME_WITH_SPACE)

  expect(input).toHaveValue(VALID_FILENAME_WITH_SPACE)
})

test("accepts filename with allowed special characters", async () => {
  const user = userEvent.setup()
  render(<SaveAsFieldWrapper />)

  const input = screen.getByLabelText(/file name/i)
  await user.type(input, "valid_file-name.pdf")

  expect(input).toHaveValue("valid_file-name.pdf")
  expect(
    screen.queryByText(/may only use alphanumeric characters/i),
  ).not.toBeInTheDocument()
})

test("shows error for filename exceeding 50 characters", async () => {
  const user = userEvent.setup()
  render(<SaveAsFieldWrapper />)

  const input = screen.getByLabelText(/file name/i)
  const longName = "a".repeat(51)
  await user.type(input, longName)

  expect(
    await screen.findByText(/may not exceed 50 characters/i),
  ).toBeInTheDocument()
})

test("shows error for filename with invalid characters", async () => {
  const user = userEvent.setup()
  render(<SaveAsFieldWrapper />)

  const input = screen.getByLabelText(/file name/i)
  await user.type(input, "file@name#.pdf")

  expect(
    await screen.findByText(/may only use alphanumeric characters/i),
  ).toBeInTheDocument()
})

test("shows error when field is empty after typing", async () => {
  const user = userEvent.setup()
  render(<SaveAsFieldWrapper />)

  const input = screen.getByLabelText(/file name/i)
  await user.type(input, "test")
  await user.clear(input)

  expect(
    await screen.findByText(/filename name may not be empty/i),
  ).toBeInTheDocument()
})
