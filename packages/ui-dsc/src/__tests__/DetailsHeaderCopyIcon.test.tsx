import { vi, test, expect, beforeAll } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DetailsHeaderCopyIcon } from "../catalog/DetailsHeaderCopyIcon"

const properties = {
  id: "DBS0351367",
}

const writeTextMock = vi.fn(() => Promise.resolve())
const navigatorMock = {
  clipboard: { writeText: writeTextMock },
}

beforeAll(() => {
  vi.stubGlobal("navigator", navigatorMock)
})

test("renders copy icon", () => {
  render(<DetailsHeaderCopyIcon {...properties} />)
  const button = screen.getByRole("button", { name: "copy icon" })
  expect(button).toBeInTheDocument()
})

test("should write to clipboard on click", async () => {
  render(<DetailsHeaderCopyIcon {...properties} />)
  const button = screen.getByRole("button", { name: "copy icon" })
  await userEvent.click(button)
  expect(writeTextMock).toHaveBeenCalledWith(properties.id)
})

test("it should display a `successfully copied` message on click ", async () => {
  render(<DetailsHeaderCopyIcon {...properties} />)
  const button = screen.getByRole("button", { name: "copy icon" })
  await userEvent.click(button)
  expect(screen.getByText(/copied to clipboard/)).toBeInTheDocument()
})
