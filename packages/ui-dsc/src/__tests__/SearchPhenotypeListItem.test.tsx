import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { Gene, Publication } from "dicty-graphql-schema"
import { SearchPhenotypeListItem } from "../catalog/SearchPhenotypeListItem"
import { availableStrain, strainWithPhenotype } from "../mocks/mockStrain"

test("includes expected list items", () => {
  render(
    <BrowserRouter>
      <SearchPhenotypeListItem strain={availableStrain} />
    </BrowserRouter>,
  )
  // find strain descriptor
  const label = screen.getByText(availableStrain.label)
  expect(label).toBeInTheDocument()
  // find associated genes
  const genes = availableStrain?.genes as Gene[]
  test.each(genes)("Gene name is displayed", ({ name }) => {
    expect(screen.getByText(name)).toBeInTheDocument()
  })
  // find pub link
  const links = screen.getAllByRole("link")
  const pubLink = links[2]
  const pub = availableStrain?.publications as Array<Publication>
  expect(pubLink).toHaveAttribute(
    "href",
    `/publication/${(pub[0] as Publication).id}`,
  )
})

test("should not include publications when not passed as prop", () => {
  render(
    <BrowserRouter>
      <SearchPhenotypeListItem strain={strainWithPhenotype} />
    </BrowserRouter>,
  )
  const pubDisplay = screen.queryByTestId("publication-display")
  expect(pubDisplay).not.toBeInTheDocument()
})
