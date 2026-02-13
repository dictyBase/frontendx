import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { Provider } from "jotai"
import { Dialog } from "@mui/material"
import { FormProvider } from "react-hook-form"
import { FileUploadDialog } from "../components/FileUploadDialog"
import { InsertUrl } from "../components/InsertUrl"
import { useValidateSuggestedFilename } from "../components/helpers/fileUploadHelpers"
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

test("calls handleClearForm when InsertUrl cancel is clicked", async () => {
  const user = userEvent.setup()
  const mockReset = vi.fn()

  vi.mocked(
    vi.fn(() => ({
      useUploadFileMutation: vi.fn(() => [
        vi.fn(),
        {
          data: { uploadFile: { url: "https://example.com/file.pdf" } },
          loading: false,
          reset: mockReset,
        },
      ]),
    })),
  )

  const FileUploadDialogWithData = () => {
    const methods = useValidateSuggestedFilename({
      defaultValues: { suggestedFilename: "test.pdf" },
    })

    return (
      <Provider>
        <LexicalTestComposer>
          <Dialog open>
            <FormProvider {...methods}>
              <InsertUrl
                handleClose={() => {}}
                handleClearForm={() => {
                  mockReset()
                  methods.reset()
                }}
                fileUrl="https://example.com/file.pdf"
              />
            </FormProvider>
          </Dialog>
        </LexicalTestComposer>
      </Provider>
    )
  }

  render(<FileUploadDialogWithData />)

  const cancelButton = screen.getByRole("button", { name: /cancel/i })
  await user.click(cancelButton)

  expect(mockReset).toHaveBeenCalled()
})
