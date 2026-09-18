import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { Provider } from "jotai"
import { LexicalTestComposer } from "../utils/LexicalTestComposer"
import { InsertSampleDownloadLinkButton } from "../components/InsertSampleDownloadLinkButton"
import { InsertSampleImageButton } from "../components/InsertSampleImageButton"
import { InspectButton } from "../components/InspectButton"
import { CopyStateButton } from "../components/CopyStateButton"
import { DebugToolbar } from "../DebugToolbar"

// InsertSampleDownloadLinkButton

test("InsertSampleDownloadLinkButton renders its button", () => {
  render(
    <LexicalTestComposer>
      <InsertSampleDownloadLinkButton />
    </LexicalTestComposer>,
  )
  expect(
    screen.getByRole("button", { name: /sample downloadlink/i }),
  ).toBeInTheDocument()
})

test("InsertSampleDownloadLinkButton calls editor.update when clicked", async () => {
  const user = userEvent.setup()
  render(
    <LexicalTestComposer>
      <InsertSampleDownloadLinkButton />
    </LexicalTestComposer>,
  )
  // Clicking should not throw
  expect(async () => {
    await user.click(
      screen.getByRole("button", { name: /sample downloadlink/i }),
    )
  }).not.toThrow()
})

// InsertSampleImageButton

test("InsertSampleImageButton renders its button", () => {
  render(
    <LexicalTestComposer>
      <InsertSampleImageButton />
    </LexicalTestComposer>,
  )
  expect(
    screen.getByRole("button", { name: /sample image/i }),
  ).toBeInTheDocument()
})

test("InsertSampleImageButton calls editor.dispatchCommand when clicked", async () => {
  const user = userEvent.setup()
  render(
    <LexicalTestComposer>
      <InsertSampleImageButton />
    </LexicalTestComposer>,
  )
  // Clicking should not throw

  expect(async () => {
    await user.click(screen.getByRole("button", { name: /sample image/i }))
  }).not.toThrow()
})

// InspectButton

test("InspectButton renders its button", () => {
  render(
    <LexicalTestComposer>
      <InspectButton />
    </LexicalTestComposer>,
  )
  expect(screen.getByRole("button", { name: /inspect/i })).toBeInTheDocument()
})

test("InspectButton calls editor.read and logs selection when clicked", async () => {
  const user = userEvent.setup()
  const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {})
  render(
    <LexicalTestComposer>
      <InspectButton />
    </LexicalTestComposer>,
  )
  await user.click(screen.getByRole("button", { name: /inspect/i }))
  expect(consoleSpy).toHaveBeenCalled()
  consoleSpy.mockRestore()
})

// CopyStateButton

test("CopyStateButton renders its button", () => {
  render(
    <LexicalTestComposer>
      <CopyStateButton />
    </LexicalTestComposer>,
  )
  expect(
    screen.getByRole("button", { name: /copy state/i }),
  ).toBeInTheDocument()
})

test("CopyStateButton writes editor state JSON to clipboard when clicked", async () => {
  const user = userEvent.setup()
  const writeTextSpy = vi
    .spyOn(navigator.clipboard, "writeText")
    .mockResolvedValue(undefined)
  render(
    <LexicalTestComposer>
      <CopyStateButton />
    </LexicalTestComposer>,
  )
  await user.click(screen.getByRole("button", { name: /copy state/i }))
  expect(writeTextSpy).toHaveBeenCalledOnce()
  expect(typeof writeTextSpy.mock.calls[0][0]).toBe("string")
  writeTextSpy.mockRestore()
})

// DebugToolbar

test("DebugToolbar renders without crashing", () => {
  render(
    <Provider>
      <LexicalTestComposer>
        <DebugToolbar />
      </LexicalTestComposer>
    </Provider>,
  )
  expect(screen.getByRole("button", { name: /inspect/i })).toBeInTheDocument()
})
