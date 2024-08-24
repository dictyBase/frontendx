import { render, screen } from "@testing-library/react"
import { ListContentByNamespaceQuery } from "dicty-graphql-schema"
import { describe, it, expect } from "vitest"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
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

const contentList = [
  {
    name: "news1",
    content: JSON.stringify(mockContent),
    updated_at: "2024-08-23T00:00:00Z",
  },
]

const routes = [
  {
    path: "/",
    element: (
      <AuthorizedNewsList
        contentList={
          contentList as ListContentByNamespaceQuery["listContentByNamespace"]
        }
      />
    ),
  },
  {
    path: "/news/:id/editable",
    element: <div>Mock News Editable Page</div>,
  },
]

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
})

describe("AuthorizedNewsList", () => {
  it("renders news items and navigates on link click", async () => {
    const user = userEvent.setup()
    render(<RouterProvider router={router} />)
    expect(screen.getByText("Friday, August 23rd, 2024")).toBeInTheDocument()
    expect(screen.getByText(expectedText)).toBeInTheDocument()

    const link = screen.getByRole("link", {
      name: /friday, august 23rd, 2024/i,
    })
    expect(link).toBeInTheDocument()

    await user.click(link)
    expect(screen.getByText("Mock News Editable Page")).toBeInTheDocument()
  })
})
