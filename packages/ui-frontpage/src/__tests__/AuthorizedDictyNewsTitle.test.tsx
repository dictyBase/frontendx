import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { AuthorizedDictyNewsTitle } from "../news/AuthorizedDictyNewsTitle"

const routes = [
  {
    path: "/",
    element: <AuthorizedDictyNewsTitle />,
  },
  {
    path: "/news/create",
    element: <div>Mock News Create Page</div>,
  },
]

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
})

describe("AuthorizedDictyNewsTitle", () => {
  it("renders the DCR News title", () => {
    render(<RouterProvider router={router} />)
    expect(screen.getByText("DCR News")).toBeInTheDocument()
  })

  it("renders the Write News Article button", () => {
    render(<RouterProvider router={router} />)
    const button = screen.getByRole("button", { name: /write news article/i })
    expect(button).toBeInTheDocument()
  })

  it("navigates to /news/create when Write News Article button is clicked", async () => {
    const user = userEvent.setup()
    render(<RouterProvider router={router} />)
    const button = screen.getByRole("button", { name: /write news article/i })

    await user.click(button)
    expect(screen.getByText("Mock News Create Page")).toBeInTheDocument()
  })
})
