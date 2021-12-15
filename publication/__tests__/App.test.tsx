import React from "react"
import { render, screen } from "@testing-library/react"
import App from "../components/layout/App"
import MockAuthProvider from "./mocks/MockAuthProvider"

describe("components/layout/App", () => {
  it("should render h1 element", () => {
    render(
      <MockAuthProvider mocks={[]}>
        <App>
          <h1>Hello world</h1>
        </App>
      </MockAuthProvider>,
    )

    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })
})
