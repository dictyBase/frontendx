import React from "react"
import { render, screen } from "@testing-library/react"
import { LeftDisplay } from "./LeftDisplay"

const Child = () => <>child component</>
describe("components/panels/LeftDisplay", () => {
  it("should render children", () => {
    render(
      <LeftDisplay>
        <Child />
      </LeftDisplay>,
    )
    expect(screen.getByText(/child component/)).toBeInTheDocument()
  })
})
