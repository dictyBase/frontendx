import React from "react"
import { render, screen } from "@testing-library/react"
import PanelWrapper from "./PanelWrapper"
import { BrowserRouter } from "react-router-dom"

describe("components/panels/PanelWrapper", () => {
  const Child = () => <React.Fragment>child component</React.Fragment>
  const renderComponent = () => {
    render(
      <PanelWrapper title="GO Annotations">
        <Child />
      </PanelWrapper>,
    )
  }

  it("should render children", () => {
    renderComponent()
    expect(screen.getByText(/child component/)).toBeInTheDocument()
  })

  it("should display title", () => {
    renderComponent()
    expect(screen.getByText(/GO Annotations/)).toBeInTheDocument()
  })

  it("should display link when passed a route", () => {
    const route = "/goannotations"
    render(
      <BrowserRouter>
        <PanelWrapper title="GO Annotations" route={route}>
          <Child />
        </PanelWrapper>
      </BrowserRouter>,
    )

    expect(screen.getByText(/View All/)).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("href", route)
  })

  it("should not display link when not passed a route", () => {
    renderComponent()
    expect(screen.queryByText(/View All/)).not.toBeInTheDocument()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })
})
