import { describe, test, expect } from "vitest"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { makeBy as AmakeBy } from "fp-ts/Array"
import { NewsView } from "../pages/news/show"
import { superuserProperties } from "../common/data/superuser"

const testText = "test content"
const contentString = `{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${testText}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"flex-layout","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`
const listLength = 5
const contentList = AmakeBy(listLength, (index) => ({
  id: `${index}`,
  name: `${index}`,
  slug: `news-${index}`,
  content: contentString,
  created_at: `2022-01-0${index + 1}T00:00:00.000Z`,
  updated_at: `2022-01-0${index + 1}T00:00:00.000Z`,
  created_by: superuserProperties,
  updated_by: superuserProperties,
}))

describe("NewsView", () => {
  test("renders a link to `/news/:name/show`", () => {
    const router = createMemoryRouter([
      {
        index: true,
        element: <NewsView contentList={contentList} />,
      },
    ])
    render(<RouterProvider router={router} />)
    expect(screen.getAllByRole("link", { name: /read more/i })).toHaveLength(
      listLength,
    )
    expect(screen.getAllByText(new RegExp(testText))).toHaveLength(listLength)
  })
})
