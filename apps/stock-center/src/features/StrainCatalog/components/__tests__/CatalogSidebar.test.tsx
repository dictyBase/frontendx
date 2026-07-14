import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { BrowserRouter, MemoryRouter } from "react-router-dom"
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

test("should update selected type when a different option is clicked", async () => {
  const user = userEvent.setup()
  renderWithRouter(<CatalogSidebar />)

  await user.click(screen.getByRole("radio", { name: /bacterial strains/i }))

  const bacterialRadio = screen.getByRole("radio", {
    name: /bacterial strains/i,
  }) as HTMLInputElement
  expect(bacterialRadio).toBeChecked()
})

test("should deselect previously selected option when a new one is chosen", async () => {
  const user = userEvent.setup()
  renderWithRouter(<CatalogSidebar />)

  await user.click(screen.getByRole("radio", { name: /gwdi strains/i }))

  const regularRadio = screen.getByRole("radio", {
    name: /regular strains/i,
  }) as HTMLInputElement
  expect(regularRadio).not.toBeChecked()
})

test("should reflect the initial type from the URL group search parameter", () => {
  render(
    <MemoryRouter initialEntries={["/?group=bacterial"]}>
      <CatalogSidebar />
    </MemoryRouter>,
  )
  const bacterialRadio = screen.getByRole("radio", {
    name: /bacterial strains/i,
  }) as HTMLInputElement
  expect(bacterialRadio).toBeChecked()
})

test("should fall back to Regular Strains when the group parameter is absent", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <CatalogSidebar />
    </MemoryRouter>,
  )
  const regularRadio = screen.getByRole("radio", {
    name: /regular strains/i,
  }) as HTMLInputElement
  expect(regularRadio).toBeChecked()
})
