import React from "react"
import { render, screen } from "@testing-library/react"
import LeftDisplay from "./LeftDisplay"

describe("components/panels/LeftDisplay", () => {
  const Child = () => <>child component</>

  it("should render children", () => {
    render(
      <LeftDisplay>
        <Child />
      </LeftDisplay>,
    )
    expect(screen.getByText(/child component/)).toBeInTheDocument()
  })
})
