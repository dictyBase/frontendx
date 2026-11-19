import { expect, test } from "vitest"
import { render } from "@testing-library/react"
import { Title } from "../home/Title"

test("should render the Dicty Stock Center title and description meta tag", () => {
  render(<Title />)
  expect(document.querySelector("title")).toHaveTextContent(
    "Dicty Stock Center",
  )
  expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
    "content",
    expect.stringContaining("The Dicty Stock Center is a rapidly growing"),
  )
})
