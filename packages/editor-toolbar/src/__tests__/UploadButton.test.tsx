import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { UploadButton } from "../components/UploadButton"

test("renders upload button", () => {
  render(<UploadButton onSubmit={vi.fn()} isDisabled={false} />)
  expect(screen.getByRole("button", { name: /upload/i })).toBeInTheDocument()
})

test("calls onSubmit when clicked", async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()
  render(<UploadButton onSubmit={onSubmit} isDisabled={false} />)

  await user.click(screen.getByRole("button", { name: /upload/i }))
  expect(onSubmit).toHaveBeenCalledOnce()
})

test("is disabled when isDisabled is true", () => {
  render(<UploadButton onSubmit={vi.fn()} isDisabled />)
  expect(screen.getByRole("button", { name: /upload/i })).toBeDisabled()
})

test("is enabled when isDisabled is false", () => {
  render(<UploadButton onSubmit={vi.fn()} isDisabled={false} />)
  expect(screen.getByRole("button", { name: /upload/i })).toBeEnabled()
})

test("does not call onSubmit when disabled and clicked", async () => {
  const onSubmit = vi.fn()
  render(<UploadButton onSubmit={onSubmit} isDisabled />)

  expect(screen.getByRole("button", { name: /upload/i })).toBeDisabled()
})
