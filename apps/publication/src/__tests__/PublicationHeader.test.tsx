import { render, screen } from "@testing-library/react"
import { PublicationHeader } from "../components/PublicationHeader"

describe("componets/PublicationHeader", () => {
  it("should show header", () => {
    render(<PublicationHeader />)
    expect(screen.getByText("dictyBase Literature")).toBeInTheDocument()
  })
})
