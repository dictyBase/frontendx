import { describe, expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { BreadcrumbsLink } from "../components/BreadcrumbsLink"

describe("breadcrumb links", () => {
  test("renders link for strain catalog", () => {
    render(
      <MemoryRouter>
        <BreadcrumbsLink name="strains" />
      </MemoryRouter>,
    )
    expect(screen.getByRole("link")).toHaveTextContent("Strains")
  })

  test("renders link for plasmid catalog", () => {
    render(
      <MemoryRouter>
        <BreadcrumbsLink name="plasmids" />
      </MemoryRouter>,
    )
    expect(screen.getByRole("link")).toHaveTextContent("Plasmids")
  })

  test("renders link for information", () => {
    render(
      <MemoryRouter>
        <BreadcrumbsLink name="information" />
      </MemoryRouter>,
    )
    expect(screen.getByRole("link")).toHaveTextContent("Information")
  })
})
