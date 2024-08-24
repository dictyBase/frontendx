import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { MoreNewsLink } from "../news/MoreNewsLink"

const routes = [
  {
    path: "/",
    element: <MoreNewsLink />,
  },
  {
    path: "/news/show",
    element: <div>Mock News Show Page</div>,
  },
]

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
})

describe("MoreNewsLink", () => {
  it("renders the More News link", () => {
    render(<RouterProvider router={router} />)
    expect(screen.getByText("More News")).toBeInTheDocument()
  })
})
