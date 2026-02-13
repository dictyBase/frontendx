import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { none, some } from "fp-ts/Option"
import { FileSelect } from "../components/FileSelect"
import { overFileSizeLimitError } from "../components/helpers/fileUploadHelpers"

test("renders file upload button", () => {
  render(<FileSelect fileError={none} onFileChange={vi.fn()} />)
  expect(
    screen.getByRole("button", { name: /choose a file/i }),
  ).toBeInTheDocument()
})

test("renders file size limit help text", () => {
  render(<FileSelect fileError={none} onFileChange={vi.fn()} />)
  expect(screen.getByText(/file size may not exceed 10mb/i)).toBeInTheDocument()
})

test("renders title", () => {
  render(<FileSelect fileError={none} onFileChange={vi.fn()} />)
  expect(screen.getByText(/choose a file to upload/i)).toBeInTheDocument()
})

test("does not render error when fileError is none", () => {
  render(<FileSelect fileError={none} onFileChange={vi.fn()} />)
  expect(screen.queryByText(/too large/i)).not.toBeInTheDocument()
})

test("renders error message when fileError has value", () => {
  render(
    <FileSelect
      fileError={some(overFileSizeLimitError)}
      onFileChange={vi.fn()}
    />,
  )
  expect(screen.getByText(/too large/i)).toBeInTheDocument()
})

test("calls onFileChange when file is selected", async () => {
  const user = userEvent.setup()
  const onFileChange = vi.fn()
  render(<FileSelect fileError={none} onFileChange={onFileChange} />)

  const file = new File(["test"], "test.pdf", { type: "application/pdf" })
  const input = screen.getByLabelText(/choose a file/i, {
    selector: "input",
  }) as HTMLInputElement

  await user.upload(input, file)
  expect(onFileChange).toHaveBeenCalled()
})

test("has hidden file input", () => {
  const { container } = render(
    <FileSelect fileError={none} onFileChange={vi.fn()} />,
  )
  const input = container.querySelector(
    'input[type="file"]',
  ) as HTMLInputElement
  expect(input).toBeInTheDocument()
  expect(input).toHaveStyle({ display: "none" })
})
