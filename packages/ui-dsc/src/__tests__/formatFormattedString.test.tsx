import type { ReactNode } from "react"
import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  formatFormattedString,
  isFormattableString,
} from "../utils/formatFormattedString"

/**
 * Helper that renders the formatted value inside a container so the resulting
 * markup can be inspected.
 *
 * @param content - The value to format and render.
 * @returns The Testing Library render result.
 */
const renderFormatted = (content: ReactNode) =>
  render(<div data-testid="formatted">{formatFormattedString(content)}</div>)

test("renders plain strings without modification", () => {
  renderFormatted("AX4 wild type")
  expect(screen.getByTestId("formatted")).toHaveTextContent("AX4 wild type")
})

test("renders sup format tags as elements instead of raw markup", () => {
  const { container } = renderFormatted("tgrB1<sup>-</sup>")
  expect(container.querySelector("sup")).toHaveTextContent("-")
  expect(screen.getByTestId("formatted")).toHaveTextContent("tgrB1-")
})

test("renders nested format tags as nested elements", () => {
  const { container } = renderFormatted("wild <b>type <i>bold</i></b> strain")
  expect(container.querySelector("b")).toBeInTheDocument()
  expect(container.querySelector("b i")).toHaveTextContent("bold")
})

test("renders symbol escape sequences that were double escaped", () => {
  const { container } = renderFormatted("spaA&lt;sup&gt;-&lt;/sup&gt;")
  expect(container.querySelector("sup")).toHaveTextContent("-")
})

test("converts numeric HTML entities into characters", () => {
  renderFormatted("&#946;-galactosidase")
  expect(screen.getByTestId("formatted")).toHaveTextContent("β-galactosidase")
})

test("converts named HTML entities into characters", () => {
  renderFormatted("&gamma;-tubulin")
  expect(screen.getByTestId("formatted")).toHaveTextContent("γ-tubulin")
})

test("returns non-string content untouched", () => {
  renderFormatted(<b>already an element</b>)
  expect(screen.getByTestId("formatted").querySelector("b")).toHaveTextContent(
    "already an element",
  )
})

test("returns numbers untouched", () => {
  renderFormatted(42)
  expect(screen.getByTestId("formatted")).toHaveTextContent("42")
})

test("isFormattableString reports true for a non-empty string", () => {
  expect(isFormattableString("AX4")).toBe(true)
})

test("isFormattableString reports false for an empty string", () => {
  expect(isFormattableString("")).toBe(false)
})

test("isFormattableString reports false for non-string content", () => {
  expect(isFormattableString(<b>bold</b>)).toBe(false)
})

test("returns empty strings untouched so blank cells stay empty", () => {
  expect(formatFormattedString("")).toBe("")
})
