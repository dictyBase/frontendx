import { render, screen } from "@testing-library/react"
import { SubmitError } from "../order/SubmitError"

describe("features/OrderForm/Submit/SubmitError", () => {
  it("should render error", () => {
    render(<SubmitError />)
    expect(screen.getByText(/There was an error +?/)).toBeInTheDocument()
  })
})
