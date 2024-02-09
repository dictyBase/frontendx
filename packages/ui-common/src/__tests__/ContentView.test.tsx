import { render, screen } from "@testing-library/react"
import { test, expect } from "vitest"
import { ContentView } from "../EditablePages/ContentView"
import { contentBySlugData, contentText } from "../mocks/content"

test("renders the content data", () => {
  render(<ContentView data={contentBySlugData} />)
  expect(screen.getByText(contentText)).toBeInTheDocument()
})
