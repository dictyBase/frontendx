import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SubmitError } from "../order/SubmitError"

describe("features/OrderForm/Submit/SubmitError", () => {
  test("should render error", () => {
    render(<SubmitError />)
    expect(screen.getByText(/There was an error +?/)).toBeInTheDocument()
  })
})
