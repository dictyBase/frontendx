import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FormProvider } from "react-hook-form"
import { SelectAndUpload } from "../components/SelectAndUpload"
import { useValidateSuggestedFilename } from "../components/helpers/fileUploadHelpers"

const mockMutationFunction = vi.fn()

const SelectAndUploadWrapper = () => {
  const methods = useValidateSuggestedFilename()
  return (
    <FormProvider {...methods}>
      <SelectAndUpload
        loading={false}
        mutationFunction={mockMutationFunction}
      />
    </FormProvider>
  )
}

const createMockFile = (size: number, name = "test.pdf"): File =>
  new File(["a".repeat(size)], name, { type: "application/pdf" })

test("initially renders FileSelect component", () => {
  render(<SelectAndUploadWrapper />)
  expect(
    screen.getByRole("button", { name: /choose a file/i }),
  ).toBeInTheDocument()
})

test("switches to Upload component after file selection", async () => {
  const user = userEvent.setup()
  render(<SelectAndUploadWrapper />)

  const file = createMockFile(1024, "document.pdf")
  const input = screen.getByLabelText(/choose a file/i, {
    selector: "input",
  }) as HTMLInputElement

  await user.upload(input, file)

  expect(screen.getByText("document.pdf")).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /upload/i })).toBeInTheDocument()
})

test("shows error for oversized file", async () => {
  const user = userEvent.setup()
  render(<SelectAndUploadWrapper />)

  const largeFile = createMockFile(15 * 1024 * 1024, "large.pdf")
  const input = screen.getByLabelText(/choose a file/i, {
    selector: "input",
  }) as HTMLInputElement

  await user.upload(input, largeFile)

  expect(await screen.findByText(/too large/i)).toBeInTheDocument()
})

test("allows changing file after selection", async () => {
  const user = userEvent.setup()
  render(<SelectAndUploadWrapper />)

  const firstFile = createMockFile(1024, "first.pdf")
  const input = screen.getByLabelText(/choose a file/i, {
    selector: "input",
  }) as HTMLInputElement

  await user.upload(input, firstFile)
  expect(screen.getByText("first.pdf")).toBeInTheDocument()

  const secondFile = createMockFile(2048, "second.pdf")
  const changeInput = screen.getByLabelText(/choose a different file/i, {
    selector: "input",
  }) as HTMLInputElement

  await user.upload(changeInput, secondFile)
  expect(screen.getByText("second.pdf")).toBeInTheDocument()
  expect(screen.queryByText("first.pdf")).not.toBeInTheDocument()
})

test("passes loading state to Upload component", async () => {
  const user = userEvent.setup()
  const methods = useValidateSuggestedFilename()

  const { rerender } = render(
    <FormProvider {...methods}>
      <SelectAndUpload
        loading={false}
        mutationFunction={mockMutationFunction}
      />
    </FormProvider>,
  )

  const file = createMockFile(1024, "test.pdf")
  const input = screen.getByLabelText(/choose a file/i, {
    selector: "input",
  }) as HTMLInputElement

  await user.upload(input, file)

  rerender(
    <FormProvider {...methods}>
      <SelectAndUpload loading mutationFunction={mockMutationFunction} />
    </FormProvider>,
  )

  expect(screen.getByRole("progressbar")).toBeInTheDocument()
})
