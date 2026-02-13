import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { none, some } from "fp-ts/Option"
import { Upload } from "../components/Upload"
import { overFileSizeLimitError } from "../components/helpers/fileUploadHelpers"

vi.mock("@logto/react", () => ({
  useLogto: vi.fn(() => ({
    getAccessToken: vi.fn().mockResolvedValue("mock-token"),
  })),
}))

const createMockFile = (size: number, name = "test.pdf"): File =>
  new File(["a".repeat(size)], name, { type: "application/pdf" })

const mockMutationFunction = vi.fn()
const mockSetFileError = vi.fn()
const mockOnFileChange = vi.fn()

const defaultProperties = {
  loading: false,
  mutationFunction: mockMutationFunction,
  selectedFile: createMockFile(1024, "test-file.pdf"),
  fileError: none,
  setFileError: mockSetFileError,
  onFileChange: mockOnFileChange,
}

test("renders dialog title", () => {
  render(<Upload {...defaultProperties} />)
  expect(screen.getByText(/choose a file to upload/i)).toBeInTheDocument()
})

test("renders selected filename", () => {
  render(<Upload {...defaultProperties} />)
  expect(screen.getByText("test-file.pdf")).toBeInTheDocument()
})

test("renders file size help text", () => {
  render(<Upload {...defaultProperties} />)
  expect(screen.getByText(/file size may not exceed 10mb/i)).toBeInTheDocument()
})

test("renders choose different file button", () => {
  render(<Upload {...defaultProperties} />)
  expect(
    screen.getByRole("button", { name: /choose a different file/i }),
  ).toBeInTheDocument()
})

test("renders upload button", () => {
  render(<Upload {...defaultProperties} />)
  expect(screen.getByRole("button", { name: /upload/i })).toBeInTheDocument()
})

test("upload button is disabled for oversized file", () => {
  const largeFile = createMockFile(15 * 1024 * 1024, "large.pdf")
  render(<Upload {...defaultProperties} selectedFile={largeFile} />)
  expect(screen.getByRole("button", { name: /upload/i })).toBeDisabled()
})

test("upload button is enabled for valid file", () => {
  render(<Upload {...defaultProperties} />)
  expect(screen.getByRole("button", { name: /upload/i })).toBeEnabled()
})

test("shows loading indicator when loading is true", () => {
  render(<Upload {...defaultProperties} loading />)
  expect(screen.getByRole("progressbar")).toBeInTheDocument()
})

test("does not show loading indicator when loading is false", () => {
  render(<Upload {...defaultProperties} loading={false} />)
  expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
})

test("displays error message when fileError has value", () => {
  render(
    <Upload {...defaultProperties} fileError={some(overFileSizeLimitError)} />,
  )
  expect(screen.getByText(/too large/i)).toBeInTheDocument()
})

test("does not display error when fileError is none", () => {
  render(<Upload {...defaultProperties} fileError={none} />)
  expect(screen.queryByText(/too large/i)).not.toBeInTheDocument()
})

test("calls onFileChange when choosing different file", async () => {
  const user = userEvent.setup()
  render(<Upload {...defaultProperties} />)

  const newFile = createMockFile(2048, "new-file.pdf")
  const input = screen.getByLabelText(/choose a different file/i, {
    selector: "input",
  }) as HTMLInputElement

  await user.upload(input, newFile)
  expect(mockOnFileChange).toHaveBeenCalled()
})
