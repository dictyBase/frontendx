import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { ReferencesSearchBox, defaultLabel } from "./ReferenceSearchBox"

const searchFields = ["author", "title", "gene"]

test("should render search input with default label", () => {
  render(
    <MemoryRouter>
      <ReferencesSearchBox fields={searchFields} />
    </MemoryRouter>,
  )
  expect(screen.getByLabelText(defaultLabel)).toBeInTheDocument()
})

test("should render search input with custom label", () => {
  const customLabel = "Custom Reference Search"
  render(
    <MemoryRouter>
      <ReferencesSearchBox fields={searchFields} label={customLabel} />
    </MemoryRouter>,
  )
  expect(screen.getByLabelText(customLabel)).toBeInTheDocument()
})

test("should render field options when input is focused", async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter>
      <ReferencesSearchBox fields={searchFields} />
    </MemoryRouter>,
  )
  const input = screen.getByLabelText(defaultLabel)
  await user.click(input)

  expect(screen.getByRole("option", { name: "Author" })).toBeInTheDocument()
  expect(screen.getByRole("option", { name: "Title" })).toBeInTheDocument()
  expect(screen.getByRole("option", { name: "Gene" })).toBeInTheDocument()
})
