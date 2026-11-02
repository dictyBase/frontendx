import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DetailsListItem } from "../catalog/DetailsListItem"

test("renders the row title", () => {
  render(<DetailsListItem title="Strain Descriptor" content="AX4" />)
  expect(screen.getByText("Strain Descriptor")).toBeInTheDocument()
})

test("renders plain string content", () => {
  render(<DetailsListItem title="Strain Summary" content="Wild type strain" />)
  expect(screen.getByText("Wild type strain")).toBeInTheDocument()
})

test("renders format tags in the content as elements", () => {
  const { container } = render(
    <DetailsListItem title="Strain Descriptor" content="tgrB1<sup>-</sup>" />,
  )
  expect(container.querySelector("sup")).toHaveTextContent("-")
  expect(screen.queryByText(/&lt;sup&gt;/)).not.toBeInTheDocument()
})

test("renders non-string content untouched", () => {
  render(
    <DetailsListItem
      title="Parental Strain"
      content={<a href="/strains/DBS0001">AX4</a>}
    />,
  )
  expect(screen.getByRole("link", { name: "AX4" })).toHaveAttribute(
    "href",
    "/strains/DBS0001",
  )
})
