import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Provider } from "jotai"
import { FileUploadDialog } from "../components/FileUploadDialog"
import { LexicalTestComposer } from "../utils/LexicalTestComposer"

vi.mock("dicty-graphql-schema", () => ({
  useUploadFileMutation: vi.fn(() => [
    vi.fn(),
    { data: undefined, loading: false, reset: vi.fn() },
  ]),
}))

vi.mock("@logto/react", () => ({
  useLogto: vi.fn(() => ({
    getAccessToken: vi.fn().mockResolvedValue("mock-token"),
  })),
}))

type FileUploadDialogWrapperProperties = {
  open?: boolean
}

const FileUploadDialogWrapper = ({
  open = true,
}: FileUploadDialogWrapperProperties) => (
  <Provider>
    <LexicalTestComposer>
      <FileUploadDialog open={open} />
    </LexicalTestComposer>
  </Provider>
)

test("renders dialog when open is true", () => {
  render(<FileUploadDialogWrapper open />)
  expect(screen.getByText(/choose a file to upload/i)).toBeInTheDocument()
})

test("does not render dialog content when open is false", () => {
  render(<FileUploadDialogWrapper open={false} />)
  expect(screen.queryByText(/choose a file to upload/i)).not.toBeInTheDocument()
})

test("initially shows FileSelect component", () => {
  render(<FileUploadDialogWrapper />)
  expect(
    screen.getByRole("button", { name: /choose a file/i }),
  ).toBeInTheDocument()
})
