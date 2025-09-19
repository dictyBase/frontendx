import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { OtherError } from "components/errors/OtherError"

test("Displays an error message", () => {
  render(<OtherError />)
  expect(screen.getByText("Sorry, something went wrong.")).toBeVisible()
})
