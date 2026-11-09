import { render, screen } from "@testing-library/react"
import { expect, test } from "vitest"
import { SlideshowContainer } from "../features/NewHome/SlideshowContainer"

test("renders the Mutant Phenotypes heading", () => {
  render(<SlideshowContainer />)
  expect(
    screen.getByRole("heading", { name: /mutant phenotypes/i }),
  ).toBeInTheDocument()
})

test("renders the mutant strains description", () => {
  render(<SlideshowContainer />)
  expect(
    screen.getByText(/micrographs of/i, { exact: false }),
  ).toBeInTheDocument()
  expect(screen.getByText(/dictyostelium discoideum/i)).toBeInTheDocument()
  expect(
    screen.getByText(
      /mutant strains illustrating distinct developmental phenotypes/i,
    ),
  ).toBeInTheDocument()
})

test("renders the slideshow images", () => {
  render(<SlideshowContainer />)
  expect(screen.getAllByAltText("ctr9-mutant-DG1071").length).toBeGreaterThan(0)
})
