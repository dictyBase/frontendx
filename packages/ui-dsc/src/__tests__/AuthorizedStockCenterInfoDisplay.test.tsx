import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { AuthorizedStockCenterInfoDisplay } from "../home/AuthorizedStockCenterInfoDisplay"
import { mockContent, sampleText } from "../mocks/mockContent"

const Wrapper = () => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: (
          <AuthorizedStockCenterInfoDisplay
            content={JSON.stringify(mockContent)}
            slug="mock-slug"
          />
        ),
      },
      { path: "/information/intro/edit", element: <div>Edit Intro Page</div> },
    ],
    {
      initialEntries: ["/"],
    },
  )

  return <RouterProvider router={router} />
}

describe("AuthorizedStockCenterInfoDisplay", () => {
  it("renders the mock content text", () => {
    render(<Wrapper />)
    expect(screen.getByText(sampleText)).toBeInTheDocument()
  })

  it("renders the heading text", () => {
    render(<Wrapper />)
    expect(
      screen.getByText("Welcome to Dicty Stock Center (DSC)"),
    ).toBeInTheDocument()
  })

  it("renders the edit icon", async () => {
    render(<Wrapper />)
    expect(
      await screen.findByRole("button", { name: "Edit DSC Intro" }),
    ).toBeInTheDocument()
  })
})
