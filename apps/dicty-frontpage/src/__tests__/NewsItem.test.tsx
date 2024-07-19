import { describe, test, expect } from "vitest"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { NewsItem } from "../pages/news/show"

const CONTENT_STRING = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Annual International Dictyostelium Conference","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"International conferences dedicated to ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" started in  1977 with the meeting in Sardinia, and continued on a roughly 3-year  cycle into the 1980's. However, as the field became more active, more  local meetings sprang up to fill the gaps in the cycle. Notable amongst  these was an annual series in the UK, which gradually became more  international. By the late 1980's with the successive meetings at  Amsterdam, Oxford, Airlie and Cambridge, the current pattern of annual  meetings was established. Interestingly in the late 1990's as the field  expanded further, local meetings were re-started in several countries.     ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"flex-layout","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

const newsItemProperties = {
  name: "test-news",
  content: CONTENT_STRING,
  updated_at: "2022-01-01T00:00:00.000Z",
}

describe("NewsItem", () => {
  const renderNewsItem = () => {
    const router = createMemoryRouter([
      {
        index: true,
        element: <NewsItem {...newsItemProperties} />,
      },
    ])
    render(<RouterProvider router={router} />)
  }

  test("renders a link to `/news/:name/show`", () => {
    renderNewsItem()
    expect(screen.getByRole("link", { name: /read more/i })).toHaveAttribute(
      "href",
      `/news/${newsItemProperties.name}/show`,
    )
    expect(
      screen.getByText(/Annual International Dictyostelium Conference/),
    ).toBeInTheDocument()
  })
})
