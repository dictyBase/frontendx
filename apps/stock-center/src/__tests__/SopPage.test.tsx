import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Sop from "../pages/information/sop/show"
import { getPublicPath } from "../getPublicPath"

/** Title of the standard operating procedures page. */
const SOP_TITLE = "Standard Operating Procedures"

/** File name of the standard operating procedures document. */
const SOP_FILE_NAME = "DSC_SOP_OIM_Aug22.pdf"

test("renders the page heading", () => {
  render(<Sop />)
  expect(screen.getByRole("heading", { name: SOP_TITLE })).toBeInTheDocument()
})

test("embeds the SOP document from the public documents directory", () => {
  render(<Sop />)
  expect(screen.getByTitle(SOP_TITLE)).toHaveAttribute(
    "src",
    getPublicPath(`documents/${SOP_FILE_NAME}`),
  )
})

test("offers a download link for the SOP document", () => {
  render(<Sop />)
  expect(screen.getByRole("link", { name: /download pdf/i })).toHaveAttribute(
    "download",
    SOP_FILE_NAME,
  )
})
