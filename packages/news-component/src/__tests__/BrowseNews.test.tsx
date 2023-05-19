import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import listNewsContent from "../mockNews"
import BrowseNews from "../BrowseNews"

vi.mock("dicty-graphql-schema", () => ({
  useListNewsContentQuery: () => ({
    data: {
      listContent: listNewsContent,
    },
  }),
}))

test("It renders a link for each news item from the query", async () => {
  render(
    <MemoryRouter>
      <BrowseNews />
    </MemoryRouter>,
  )

  expect(screen.getAllByRole("link")).toHaveLength(listNewsContent.length)
})

test("It renders a create button", () => {
  render(
    <MemoryRouter>
      <BrowseNews />
    </MemoryRouter>,
  )

  expect(screen.getByRole("button")).toBeInTheDocument()
  expect(screen.getByRole("button")).toHaveTextContent(/Create/)
})
