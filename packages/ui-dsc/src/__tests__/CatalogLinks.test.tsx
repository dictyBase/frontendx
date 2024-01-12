import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { CatalogLinks } from "../home/CatalogLinks"
import { additionalMaterial, additionalMaterialAuth } from "../linkLists"

test("If the user is unauthorized, CatalogLinks renders normal additionalMaterial link", () => {
  render(
    <MemoryRouter>
      <CatalogLinks isAuthorized={false} />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole("link", { name: additionalMaterial.name }),
  ).toHaveAttribute("href", additionalMaterial.to)
})

test("If the user is unauthorized, CatalogLinks renders additionalMaterialAuth link", () => {
  render(
    <MemoryRouter>
      <CatalogLinks isAuthorized />
    </MemoryRouter>,
  )

  expect(
    screen.getByRole("link", { name: additionalMaterialAuth.name }),
  ).toHaveAttribute("href", additionalMaterialAuth.to)
})
