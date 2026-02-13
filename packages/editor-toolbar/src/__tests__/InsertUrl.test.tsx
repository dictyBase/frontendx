import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { FormProvider } from "react-hook-form"
import { InsertUrl } from "../components/InsertUrl"
import { useValidateSuggestedFilename } from "../components/helpers/fileUploadHelpers"
import { LexicalTestComposer } from "../utils/LexicalTestComposer"

const mockHandleClose = vi.fn()
const mockHandleClearForm = vi.fn()

type InsertUrlWrapperProperties = {
  fileUrl?: string
}

const InsertUrlWrapper = ({
  fileUrl = "https://example.com/file.pdf",
}: InsertUrlWrapperProperties) => {
  const methods = useValidateSuggestedFilename({
    suggestedFilename: "test-file.pdf",
  })

  return (
    <LexicalTestComposer>
      <FormProvider {...methods}>
        <InsertUrl
          fileUrl={fileUrl}
          handleClose={mockHandleClose}
          handleClearForm={mockHandleClearForm}
        />
      </FormProvider>
    </LexicalTestComposer>
  )
}

test("renders dialog title", () => {
  render(<InsertUrlWrapper />)
  expect(
    screen.getByRole("heading", { name: /link text/i }),
  ).toBeInTheDocument()
})

test("renders link text field", () => {
  render(<InsertUrlWrapper />)
  expect(screen.getByLabelText(/link text/i)).toBeInTheDocument()
})

test("renders save as field", () => {
  render(<InsertUrlWrapper />)
  expect(screen.getByLabelText(/file name/i)).toBeInTheDocument()
})

test("renders cancel button", () => {
  render(<InsertUrlWrapper />)
  expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument()
})

test("renders insert link button", () => {
  render(<InsertUrlWrapper />)
  expect(
    screen.getByRole("button", { name: /insert link/i }),
  ).toBeInTheDocument()
})

test("link text field has initial value from form", () => {
  render(<InsertUrlWrapper />)
  const input = screen.getByLabelText(/link text/i) as HTMLInputElement
  expect(input.value).toBe("test-file.pdf")
})

test("updates link text when user types", async () => {
  const user = userEvent.setup()
  render(<InsertUrlWrapper />)

  const input = screen.getByLabelText(/link text/i) as HTMLInputElement
  await user.clear(input)
  await user.type(input, "Click here to download")

  expect(input.value).toBe("Click here to download")
})

test("calls handleClearForm when cancel is clicked", async () => {
  const user = userEvent.setup()
  render(<InsertUrlWrapper />)

  await user.click(screen.getByRole("button", { name: /cancel/i }))
  expect(mockHandleClearForm).toHaveBeenCalledOnce()
})

test("insert link button is enabled when no validation errors", () => {
  render(<InsertUrlWrapper />)
  expect(screen.getByRole("button", { name: /insert link/i })).toBeEnabled()
})

test("insert link button is disabled when validation error exists", async () => {
  const user = userEvent.setup()
  render(<InsertUrlWrapper />)

  const filenameInput = screen.getByLabelText(/file name/i)
  await user.clear(filenameInput)

  expect(
    await screen.findByRole("button", { name: /insert link/i }),
  ).toBeDisabled()
})

test("calls handleClose and handleClearForm when insert link is clicked", async () => {
  const user = userEvent.setup()
  render(<InsertUrlWrapper />)

  await user.click(screen.getByRole("button", { name: /insert link/i }))

  expect(mockHandleClearForm).toHaveBeenCalled()
  expect(mockHandleClose).toHaveBeenCalled()
})
