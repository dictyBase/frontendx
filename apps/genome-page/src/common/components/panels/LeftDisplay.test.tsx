import React from "react"
import { render, screen } from "@testing-library/react"
import LeftDisplay from "./LeftDisplay"

describe("common/components/panels/LeftDisplay", () => {
  const Child = () => <React.Fragment>child component</React.Fragment>

  it("should render children", () => {
    render(
      <LeftDisplay>
        <Child />
      </LeftDisplay>,
    )
    expect(screen.getByText(/child component/)).toBeInTheDocument()
  })
})
