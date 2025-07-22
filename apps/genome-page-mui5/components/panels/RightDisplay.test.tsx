import React from "react"
import { render, screen } from "@testing-library/react"
import { RightDisplay } from "./RightDisplay"

const Child = () => <>child component</>
describe("components/panels/RightDisplay", () => {
  it("should render children", () => {
    render(
      <RightDisplay>
        <Child />
      </RightDisplay>,
    )
    expect(screen.getByText(/child component/)).toBeInTheDocument()
  })
})
