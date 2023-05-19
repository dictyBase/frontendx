import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import NewsPreview from "../NewsPreview"

const CONTENT_STRING = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Annual International Dictyostelium Conference","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"International conferences dedicated to ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" started in  1977 with the meeting in Sardinia, and continued on a roughly 3-year  cycle into the 1980's. However, as the field became more active, more  local meetings sprang up to fill the gaps in the cycle. Notable amongst  these was an annual series in the UK, which gradually became more  international. By the late 1980's with the successive meetings at  Amsterdam, Oxford, Airlie and Cambridge, the current pattern of annual  meetings was established. Interestingly in the late 1990's as the field  expanded further, local meetings were re-started in several countries.     ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"flex-layout","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

const article = {
  id: "45",
  name: "Test News",
  updatedAt: "2021-10-29",
  content: CONTENT_STRING,
}

test("It renders a preview of the news data ", async () => {
  render(<NewsPreview article={article} />)

  expect(screen.getByText(article.name)).toBeInTheDocument()
  expect(screen.getByText(article.updatedAt)).toBeInTheDocument()
  expect(
    screen.getByText("Annual International Dictyostelium Conference"),
  ).toBeInTheDocument()
})
