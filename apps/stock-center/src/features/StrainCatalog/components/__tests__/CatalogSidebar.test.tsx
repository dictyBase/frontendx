import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { CatalogSidebar } from "../CatalogSidebar"

const renderWithRouter = (component: React.ReactElement) =>
  render(<BrowserRouter>{component}</BrowserRouter>)

test("should render sidebar title", () => {
  renderWithRouter(<CatalogSidebar />)
  expect(screen.getByText(/strain type/i)).toBeInTheDocument()
})

test("should render all strain type options", () => {
  renderWithRouter(<CatalogSidebar />)
  expect(screen.getByText("Regular Strains")).toBeInTheDocument()
  expect(screen.getByText("Bacterial Strains")).toBeInTheDocument()
  expect(screen.getByText("GWDI Strains")).toBeInTheDocument()
  expect(screen.getByText("All Strains")).toBeInTheDocument()
})

test("should have Regular Strains selected by default", () => {
  renderWithRouter(<CatalogSidebar />)
  const regularRadio = screen.getByRole("radio", {
    name: /regular strains/i,
  }) as HTMLInputElement
  expect(regularRadio).toBeChecked()
})
