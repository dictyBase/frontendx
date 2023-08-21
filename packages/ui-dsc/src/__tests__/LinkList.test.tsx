import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { LinkList } from "../home/LinkList"
import { downloadLinks } from "../linkLists"

test("displays Download header", () => {
  render(<LinkList list={downloadLinks} bgColor="gray" />)
  expect(screen.getByRole("heading")).toHaveTextContent("Download / View")
})
test("displays correct number of list items", () => {
  render(<LinkList list={downloadLinks} bgColor="gray" />)
  expect(screen.getAllByRole("listitem")).toHaveLength(4)
})
