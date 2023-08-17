import { vi, test, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { MenuIcon } from "../components/MenuIcon"

const mockOnClick = vi.fn()

const properties = {
  open: false,
  onClick: mockOnClick,
  theme: {
    text: "white",
  },
}

test("should fire its click handler when clicked", async () => {
  render(<MenuIcon {...properties} />)
  const { click } = userEvent.setup()
  await click(screen.getByRole("button", { hidden: true }))
  expect(mockOnClick).toHaveBeenCalledOnce()
})
