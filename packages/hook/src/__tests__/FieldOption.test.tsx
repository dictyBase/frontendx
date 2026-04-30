import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FieldOption } from "../FieldOption"

test("it renders the text provided to the label prop", () => {
  const inputText = "textString"

  render(<FieldOption label={inputText} />)
  expect(screen.getByText(inputText, { exact: false })).toBeInTheDocument()
})
