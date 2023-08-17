import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AppBarHelp } from "../catalog/AppBarHelp"

const mockSetHelpDialogOpen = vi.fn()

vi.mock("react", async () => {
  const originalModule = await vi.importActual<typeof import("react")>("react")
  return {
    ...originalModule,
    useState: () => [false, mockSetHelpDialogOpen],
  }
})

const buttonTitle = "Catalog Help"

test("should render button", () => {
  render(<AppBarHelp />)
  expect(screen.getByTitle(buttonTitle)).toBeInTheDocument()
})

test("should handle click", async () => {
  render(<AppBarHelp />)
  const { click } = userEvent.setup()
  const button = screen.getByTitle(buttonTitle)
  await click(button)
  expect(mockSetHelpDialogOpen).toHaveBeenCalledOnce()
})
