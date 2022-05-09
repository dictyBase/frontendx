import React from "react"
import { render, screen } from "@testing-library/react"
import WikiContainer from "./WikiContainer"
const useRouter = jest.spyOn(require("next/router"), "useRouter")
const gene = "ada2"

describe("CommunityAnnotations/WikiContainer", () => {
  it("should render Markdown", () => {
    useRouter.mockImplementation(() => ({
      pathname: `gene/${gene}/communityannotations`,
      query: {
        id: gene,
      },
    }))
    render(<WikiContainer markdown={"Test"} />)

    // Should Render Tab
    expect(screen.getByText("Annotations")).toBeInTheDocument()

    // Should Render Markdown
    expect(screen.getByText("Test")).toBeInTheDocument()
  })

  it("should render WikiError", () => {
    useRouter.mockImplementation(() => ({
      pathname: `gene/${gene}/communityannotations`,
      query: {
        id: gene,
      },
    }))
    render(<WikiContainer />)

    // Should Render Tab
    expect(screen.getByText("Annotations")).toBeInTheDocument()

    // Should Render WikiError
    expect(screen.getByText(`Be the first to contribute`)).toBeInTheDocument()
  })
})
