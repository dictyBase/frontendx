import { make as PublicationHeader } from "../components/PublicationHeader.bs"
import { render, screen } from "@testing-library/react"

describe("componets/PublicationHeader", () => {
  it("should show header", () => {
    render(<PublicationHeader />)
    expect(screen.getByText("dictyBase Literature")).toBeInTheDocument()
  })
})
