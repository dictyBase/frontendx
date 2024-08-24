import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { AuthorizedMoreNewsLink } from "../news/AuthorizedMoreNewsLink"

const routes = [
  {
    path: "/",
    element: <AuthorizedMoreNewsLink />,
  },
  {
    path: "/news/editable",
    element: <div>Mock News Editable Page</div>,
  },
]

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
})

describe("AuthorizedMoreNewsLink", () => {
  it("renders the More News link and navigates on click", async () => {
    const user = userEvent.setup()
    render(<RouterProvider router={router} />)
    const link = screen.getByRole("link", { name: /more news/i })
    expect(link).toBeInTheDocument()

    await user.click(link)
    expect(screen.getByText("Mock News Editable Page")).toBeInTheDocument()
  })
})
