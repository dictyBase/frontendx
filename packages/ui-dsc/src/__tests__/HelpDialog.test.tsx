import { useState } from "react"
import { test, expect } from "vitest"
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { HelpDialog } from "../catalog/HelpDialog"

const HelpDialogWrapper = () => {
  const [helpDialogOpen, setHelpDialogOpen] = useState(true)
  return (
    <HelpDialog
      helpDialogOpen={helpDialogOpen}
      setHelpDialogOpen={setHelpDialogOpen}
    />
  )
}

test("renders help dialog content when dialog box is open", () => {
  render(<HelpDialogWrapper />)
  expect(
    screen.getByText(
      /The stock catalogs can be browsed by using the available dropdown menus/,
    ),
  ).toBeInTheDocument()
})

test("closes help dialog", async () => {
  render(<HelpDialogWrapper />)

  const closeButton = screen.getByRole("button", { name: /close/i })
  const dialogTitle = screen.getByText(/catalog page help/i)

  await userEvent.click(closeButton)
  await waitForElementToBeRemoved(dialogTitle)
  expect(screen.queryByText(/catalog page help/i)).toBeNull()
})
