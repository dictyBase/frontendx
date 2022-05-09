import React from "react"
import { render, screen } from "@testing-library/react"
import WikiError from "./WikiError"
const useRouter = jest.spyOn(require("next/router"), "useRouter")
const gene = "sadA"

describe("CommunityAnnotations/WikiError", () => {
  it("should render error screen", () => {
    useRouter.mockImplementation(() => ({
      pathname: `gene/${gene}/communityannotations`,
    }))
    render(<WikiError error={"Mock Error"} />)

    // Image should load
    expect(screen.getByAltText("Sad Dicty Logo")).toBeInTheDocument()

    // Contribute should load
    expect(screen.getByText("Be the first to contribute")).toBeInTheDocument()

    // Here link should load
    expect(screen.getByText("here")).toBeInTheDocument()
  })
})
