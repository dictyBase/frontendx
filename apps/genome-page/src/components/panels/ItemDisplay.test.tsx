import React from "react"
import { render, screen } from "@testing-library/react"
import { ItemDisplay } from "./ItemDisplay"

const Child = () => <>child component</>
describe("components/panels/ItemDisplay", () => {
  it("should render children", () => {
    render(
      <ItemDisplay>
        <Child />
      </ItemDisplay>,
    )
    expect(screen.getByText(/child component/)).toBeInTheDocument()
  })
})
