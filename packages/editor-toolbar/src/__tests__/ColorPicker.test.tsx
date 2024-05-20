import { describe, test, expect, beforeAll } from "vitest"
import { render, screen } from "@testing-library/react"
import { ColorPicker } from "../components/ColorPicker"
import { LexicalTestComposer } from "../utils/LexicalTestComposer"

const colorOptions = [
  "hsl(0, 0%, 0%)",
  "hsl(210, 100%, 25.1%)",
  "hsl(210, 100%, 45%)",
  "hsl(209, 100%, 75%)",
  "hsl(211, 100%, 95%)",
  "hsl(0, 0%, 100%)",
  "hsl(53, 100%, 60%)",
]

describe("ColorPicker", () => {
  beforeAll(() => {
    render(
      <LexicalTestComposer>
        <ColorPicker colorOptions={colorOptions} />
      </LexicalTestComposer>,
    )
  })
  test("Given an array of strings of length N, it renders N buttons", () => {
    const buttons = screen.getAllByRole("button")
    expect(buttons).toHaveLength(colorOptions.length)
  })
})
