import React from "react"
import { render } from "@testing-library/react"
import { JournalDataItem } from "../components/JournalDataItem"

test("renders the title and content", () => {
  const { getByText } = render(
    <JournalDataItem
      title="dictyBase"
      url="https://example.com"
      content="123456"
    />,
  )

  expect(getByText(/dictyBase/)).toBeInTheDocument()
  expect(getByText("123456")).toBeInTheDocument()
})

test("does not render when content is missing", () => {
  const { container } = render(
    <JournalDataItem title="PMID" url="https://example.com" />,
  )

  expect(container).toBeEmptyDOMElement()
})
