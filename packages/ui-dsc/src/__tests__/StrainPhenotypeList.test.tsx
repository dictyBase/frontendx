import { test, expect, describe } from "vitest"
import { render, screen } from "@testing-library/react"
import { Phenotype } from "dicty-graphql-schema"
import { MemoryRouter } from "react-router-dom"
import { StrainPhenotypeList } from "../catalog/StrainPhenotypeList"

describe("renders phenotype links in alphabetical order", () => {
  const phenotypes = [
    { phenotype: "phenotype B" },
    { phenotype: "phenotype Z" },
    { phenotype: "phenotype A" },
    { phenotype: "phenotype C" },
    { phenotype: "phenotype Y" },
    { phenotype: "phenotype X" },
  ] as Array<Phenotype>

  const testCases: Array<[string, number]> = [
    ["phenotype A", 0],
    ["phenotype B", 1],
    ["phenotype C", 2],
    ["phenotype X", 3],
    ["phenotype Y", 4],
    ["phenotype Z", 5],
  ]

  test.each(testCases)(
    "Phenotype Link %s should be at index %i",
    (phenotype, index) => {
      render(
        <MemoryRouter>
          <StrainPhenotypeList phenotypes={phenotypes} />
        </MemoryRouter>,
      )
      const phenotypeLinks = screen.getAllByRole("link")
      const phenotypeLink = screen.getByRole("link", { name: phenotype })
      expect(phenotypeLink).toEqual(phenotypeLinks.at(index) as HTMLElement)
    },
  )
})
