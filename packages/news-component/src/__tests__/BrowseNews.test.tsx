import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import BrowseNews from "../BrowseNews"

// vi.mock("dicty-graphql-schema", () => {
//   return {
//     useListNewsContentQuery: () => {},
//   }
// })

const data = {
  id: "45",
  name: "Test News",
  updatedAt: "2021-10-29",
  slug: "test-news",
  content: "This is a test news article.",
}

test.todo("It renders news data ", async () => {
  render(<BrowseNews data={data} />)

  expect(screen.getByText(data.name)).toBeInTheDocument()
})
