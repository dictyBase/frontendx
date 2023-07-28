import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DialogTitleDisplay } from "../catalog/DialogTitleDisplay"

const handleCloseSpy = vi.fn()
const properties = {
  title: "Strain Details",
  handleClose: handleCloseSpy,
}

test("renders one button", () => {
  render(<DialogTitleDisplay {...properties} />)
  expect(screen.getByRole("button")).toBeInTheDocument()
})

test("renders correct title", () => {
  render(<DialogTitleDisplay {...properties} />)
  expect(screen.getByRole("heading")).toHaveTextContent(properties.title)
})

test("calls handleClose on button click", async () => {
  render(<DialogTitleDisplay {...properties} />)
  const button = screen.getByRole("button")
  await userEvent.click(button)
  expect(handleCloseSpy).toHaveBeenCalledTimes(1)
})
