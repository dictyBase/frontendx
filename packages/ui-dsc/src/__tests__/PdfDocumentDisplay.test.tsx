import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import {
  PdfDocumentDisplay,
  DEFAULT_VIEWER_HEIGHT,
} from "../documents/PdfDocumentDisplay"

const mockProperties = {
  src: "/stockcenter/documents/DSC_SOP_OIM_Aug22.pdf",
  fileName: "DSC_SOP_OIM_Aug22.pdf",
  title: "Standard Operating Procedures",
}

test("renders the document title as a heading", () => {
  render(<PdfDocumentDisplay {...mockProperties} />)
  expect(
    screen.getByRole("heading", { name: mockProperties.title }),
  ).toBeInTheDocument()
})

test("embeds the document in a titled iframe", () => {
  render(<PdfDocumentDisplay {...mockProperties} />)
  const viewer = screen.getByTitle(mockProperties.title)
  expect(viewer.tagName).toBe("IFRAME")
  expect(viewer).toHaveAttribute("src", mockProperties.src)
})

test("uses the default viewer height when none is given", () => {
  render(<PdfDocumentDisplay {...mockProperties} />)
  expect(screen.getByTitle(mockProperties.title)).toHaveAttribute(
    "height",
    `${DEFAULT_VIEWER_HEIGHT}`,
  )
})

test("applies a custom viewer height", () => {
  render(<PdfDocumentDisplay {...mockProperties} height={400} />)
  expect(screen.getByTitle(mockProperties.title)).toHaveAttribute(
    "height",
    "400",
  )
})

test("provides a download link pointing at the document", () => {
  render(<PdfDocumentDisplay {...mockProperties} />)
  const download = screen.getByRole("link", { name: /download pdf/i })
  expect(download).toHaveAttribute("href", mockProperties.src)
})

test("suggests the file name when downloading", () => {
  render(<PdfDocumentDisplay {...mockProperties} />)
  expect(screen.getByRole("link", { name: /download pdf/i })).toHaveAttribute(
    "download",
    mockProperties.fileName,
  )
})

test("does not sandbox the viewer so the browser pdf viewer can render it", () => {
  render(<PdfDocumentDisplay {...mockProperties} />)
  // Chrome's built-in PDF viewer refuses to run in a sandboxed frame, so the
  // iframe must stay sandboxless (see PdfDocumentDisplay.tsx).
  expect(screen.getByTitle(mockProperties.title)).not.toHaveAttribute("sandbox")
})
