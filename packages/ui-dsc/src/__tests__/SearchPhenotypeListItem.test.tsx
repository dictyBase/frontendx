import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { Gene, Publication } from "dicty-graphql-schema"
import { SearchPhenotypeListItem } from "../catalog/SearchPhenotypeListItem"
import { availableStrain, strainWithPhenotype } from "../mocks/mockStrain"

test("expects strain descriptor", () => {
  render(
    <BrowserRouter>
      <SearchPhenotypeListItem strain={availableStrain} />
    </BrowserRouter>,
  )
  const label = screen.getByText(availableStrain.label)
  expect(label).toBeInTheDocument()
})

const genes = availableStrain?.genes as Gene[]
test.each(genes)("Gene name is displayed", ({ name }) => {
  render(
    <BrowserRouter>
      <SearchPhenotypeListItem strain={availableStrain} />
    </BrowserRouter>,
  )
  expect(screen.getByText(name)).toBeInTheDocument()
})

test("renders publication link", () => {
  render(
    <BrowserRouter>
      <SearchPhenotypeListItem strain={availableStrain} />
    </BrowserRouter>,
  )
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
