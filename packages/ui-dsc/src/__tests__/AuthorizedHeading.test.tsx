import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import { AuthorizedHeading } from "../home/AuthorizedHeading"

const Wrapper = () => {
  const router = createMemoryRouter(
    [
      { path: "/", element: <AuthorizedHeading /> },
      { path: "/information/intro/edit", element: <div>Edit Intro Page</div> },
    ],
    {
      initialEntries: ["/"],
    },
  )

  return <RouterProvider router={router} />
}

describe("AuthorizedHeading", () => {
  it("renders the heading text", async () => {
    render(<Wrapper />)
    expect(
      await screen.findByText("Welcome to Dicty Stock Center (DSC)"),
    ).toBeInTheDocument()
  })

  it("renders the edit icon", async () => {
    render(<Wrapper />)
    expect(
      await screen.findByRole("button", { name: "Edit DSC Intro" }),
    ).toBeInTheDocument()
  })

  it("navigates to the edit page when the edit icon is clicked", async () => {
    render(<Wrapper />)
    const editButton = await screen.findByRole("button", {
      name: "Edit DSC Intro",
    })
    await userEvent.click(editButton)
    expect(await screen.findByText("Edit Intro Page")).toBeInTheDocument()
  })
})
