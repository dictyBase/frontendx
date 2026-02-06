import { render, screen } from "@testing-library/react"
import { Slideshow } from "../Slideshow"

test("should render images in Carousel", () => {
  render(<Slideshow />)
  expect(screen.getAllByAltText("Dicty Life Cycle")[0]).toBeInTheDocument()
  expect(screen.getAllByAltText("D. discoideum slug")[0]).toBeInTheDocument()
  expect(
    screen.getAllByAltText(
      "Triple stained and fixed Dictyostelium cells: alpha-tubulin (green), centrosome (red, appears yellow due to colocalization with tubulin), nuclei (blue)",
    )[0],
  ).toBeInTheDocument()
})
