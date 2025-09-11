import React from "react"
import { render, screen } from "@testing-library/react"
import { AuthLoader } from "../components/auth/AuthLoader"

test("displays expected text", () => {
  render(<AuthLoader />)
  expect(screen.getByText(/Logging in/)).toBeInTheDocument()
})
