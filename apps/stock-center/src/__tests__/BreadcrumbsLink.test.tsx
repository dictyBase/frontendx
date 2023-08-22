import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { BreadcrumbsLink } from "../components/BreadcrumbsLink"

describe("non-clickable breadcrumbs", () => {
  test("renders plain text for phenotypes", () => {
    render(<BreadcrumbsLink pathname="phenotypes" />)
    expect(screen.getByTestId("breadcrumbs-text")).toHaveTextContent(
      "Phenotypes",
    )
  })
})

describe("breadcrumb links", () => {
  test("renders link for strain catalog", () => {
    render(
      <MemoryRouter>
        <BreadcrumbsLink pathname="strains" />
      </MemoryRouter>,
    )
    expect(screen.getByRole("link")).toHaveTextContent("Strains")
  })

  test("renders link for plasmid catalog", () => {
    render(
      <MemoryRouter>
        <BreadcrumbsLink pathname="plasmids" />
      </MemoryRouter>,
    )
    expect(screen.getByRole("link")).toHaveTextContent("Plasmids")
  })

  test("renders link for information", () => {
    render(
      <MemoryRouter>
        <BreadcrumbsLink pathname="information" />
      </MemoryRouter>,
    )
    expect(screen.getByRole("link")).toHaveTextContent("Information")
  })

  test("renders empty link for non-existent routes", () => {
    render(
      <MemoryRouter>
        <BreadcrumbsLink pathname="bananas" />
      </MemoryRouter>,
    )
    expect(screen.getByRole("link")).toHaveTextContent("")
  })
})
