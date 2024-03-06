import React from "react"
import { render, screen } from "@testing-library/react"
import ItemDisplay from "./ItemDisplay"

describe("components/panels/ItemDisplay", () => {
  const Child = () => <>child component</>

  it("should render children", () => {
    render(
      <ItemDisplay>
        <Child />
      </ItemDisplay>,
    )
    expect(screen.getByText(/child component/)).toBeInTheDocument()
  })
})
