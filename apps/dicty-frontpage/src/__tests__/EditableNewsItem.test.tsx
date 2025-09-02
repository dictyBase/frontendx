import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { EditableNewsItem } from "../common/components/EditableNewsItem"

// Mock the external dependencies
vi.mock("@dictybase/editor", () => ({
  parseContentToText: vi.fn((content) => `Parsed: ${content}`),
}))

test("renders news item with correct content and link", () => {
  const properties = {
    name: "test-news-item",
    content: '{"test": "content"}',
    updated_at: "2023-05-15T12:00:00Z",
  }

  render(
    <MemoryRouter>
      <EditableNewsItem {...properties} />
    </MemoryRouter>
  )

  // Check if the formatted date appears
  expect(screen.getByText(/Monday, May 15th, 2023/)).toBeInTheDocument()
  
  // Check if the parsed and truncated content appears
  expect(screen.getByText(/Parsed: {"test": "content"}/)).toBeInTheDocument()

  // Check if the link has correct href
  const link = screen.getByRole("link")
  expect(link).toHaveAttribute("href", "/news/test-news-item/editable")
})

test("truncates long content", () => {
  const longContent = "a".repeat(500)
  const properties = {
    name: "long-content",
    content: longContent,
    updated_at: "2023-01-01T00:00:00Z",
  }

  render(
    <MemoryRouter>
      <EditableNewsItem {...properties} />
    </MemoryRouter>
  )

  // The content should be truncated (mocked parseContentToText adds "Parsed: " prefix)
  const displayedText = screen.getByText(/Parsed:/)
  expect(displayedText.textContent).toHaveLength(407) // 400 + "Parsed: " length
})