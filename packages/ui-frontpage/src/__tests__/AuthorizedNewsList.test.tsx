import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { BrowserRouter } from "react-router-dom"
import { AuthorizedNewsList } from "../news/AuthorizedNewsList"

const expectedText = "Rice & Beans"
const mockContent = {
  root: {
    children: [
      {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "font-size: 20px;",
                text: expectedText,
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "flex-layout",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
}

describe("AuthorizedNewsList", () => {
  it("renders authorized news items", () => {
    const contentList = [
      {
        name: "news1",
        content: JSON.stringify(mockContent),
        updated_at: "2024-08-23T00:00:00Z",
      },
    ]
    render(
      <BrowserRouter>
        <AuthorizedNewsList contentList={contentList} />
      </BrowserRouter>,
    )
    expect(screen.getByText("August 23rd, 2024")).toBeInTheDocument()
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
})
