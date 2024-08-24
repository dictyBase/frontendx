import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { BrowserRouter } from "react-router-dom"
import { NewsList } from "../news/NewsList"

import { ListContentByNamespaceQuery } from "dicty-graphql-schema"

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

describe("NewsList", () => {
  it("renders news items", () => {
    const contentList: ListContentByNamespaceQuery["listContentByNamespace"] = [
      {
        name: "news1",
        content: JSON.stringify(mockContent),
        updated_at: "2024-08-23T00:00:00Z",
      },
    ]
    render(
      <BrowserRouter>
        <NewsList contentList={contentList} />
      </BrowserRouter>,
    )
    expect(screen.getByText("Friday, August 23rd, 2024")).toBeInTheDocument()
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
})
