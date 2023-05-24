import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import listNewsContent from "../mockNews"
import NewsList from "../NewsList"

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
      <NewsList articles={listNewsContent} />
    </MemoryRouter>,
  )

  expect(screen.getAllByRole("link")).toHaveLength(listNewsContent.length)
})
