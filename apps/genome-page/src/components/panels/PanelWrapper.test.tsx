import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { PanelWrapper } from "./PanelWrapper"

const Child = () => <>child component</>
describe("components/panels/PanelWrapper", () => {
  const renderComponent = () => {
    render(
      <MemoryRouter>
        <PanelWrapper title="GO Annotations">
          <Child />
        </PanelWrapper>
      </MemoryRouter>,
    )
  }

  test("should render children", () => {
    renderComponent()
    expect(screen.getByText(/child component/)).toBeInTheDocument()
  })

  test("should display title", () => {
    renderComponent()
    expect(screen.getByText(/GO Annotations/)).toBeInTheDocument()
  })

  test("should display link when passed a route", () => {
    const route = "/genes/sadA/goannotations"
    render(
      <MemoryRouter>
        <PanelWrapper title="GO Annotations" route={route}>
          <Child />
        </PanelWrapper>
      </MemoryRouter>,
    )

    expect(screen.getByText(/View All/)).toBeInTheDocument()
    expect(screen.getByRole("link")).toHaveAttribute("href", route)
  })

  test("should not display link when not passed a route", () => {
    renderComponent()
    expect(screen.queryByText(/View All/)).not.toBeInTheDocument()
    expect(screen.queryByRole("link")).not.toBeInTheDocument()
  })
})
