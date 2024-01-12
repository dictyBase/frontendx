import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { CatalogLinks } from "../home/CatalogLinks"
import { additionalMaterial, additionalMaterialAuth } from "../linkLists"

test("If isAuthorized is false, CatalogLinks renders normal additionalMaterial link", () => {
  render(
    <MemoryRouter>
      <CatalogLinks isAuthorized={false} />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole("link", { name: additionalMaterial.name }),
  ).toHaveAttribute("href", additionalMaterial.to)
})

test("If isAuthorized is true, CatalogLinks renders additionalMaterialAuth link", () => {
  render(
    <MemoryRouter>
      <CatalogLinks isAuthorized />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole("link", { name: additionalMaterialAuth.name }),
  ).toHaveAttribute("href", additionalMaterialAuth.to)
})

test("If no authorization prop is passed, CatalogLinks renders normal additionalMaterial link", () => {
  render(
    <MemoryRouter>
      <CatalogLinks />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole("link", { name: additionalMaterial.name }),
  ).toHaveAttribute("href", additionalMaterial.to)
})
