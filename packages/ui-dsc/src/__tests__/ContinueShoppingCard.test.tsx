import { test, expect } from "vitest"
import { Routes, Route, MemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ContinueShoppingCard } from "../cart/ContinueShoppingCard"

const App = () => (
  <MemoryRouter>
    <Routes>
      <Route path="/strains" element={<> Strain Catalog </>} />
      <Route path="/plasmids" element={<> Plasmid Catalog </>} />
    </Routes>
    <ContinueShoppingCard />
  </MemoryRouter>
)

describe("ContinueShoppingCard", () => {
  test("should render the text 'Need something else?'", () => {
    render(<App />)
    const textElement = screen.getByText("Need something else?")
    expect(textElement).toBeInTheDocument()
  })

  test("should render a Button with the text 'Strains Catalog' that links user to the /strains route", async () => {
    render(<App />)
    const buttonElement = screen.getByText("Strains Catalog")

    await userEvent.click(buttonElement)

    expect(screen.getByText("Strain Catalog")).toBeInTheDocument()
  })

  test("should render a Button with the text 'Plasmids Catalog' that links user to the /strains route", async () => {
    render(<App />)
    const buttonElement = screen.getByText("Plasmids Catalog")

    await userEvent.click(buttonElement)

    expect(screen.getByText("Plasmid Catalog")).toBeInTheDocument()
  })
})
