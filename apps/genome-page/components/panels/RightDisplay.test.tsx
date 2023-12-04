import React from "react"
import { render, screen } from "@testing-library/react"
import RightDisplay from "./RightDisplay"

describe("components/panels/RightDisplay", () => {
  const Child = () => <React.Fragment>child component</React.Fragment>

  it("should render children", () => {
    render(
      <RightDisplay>
        <Child />
      </RightDisplay>,
    )
    expect(screen.getByText(/child component/)).toBeInTheDocument()
  })
})
