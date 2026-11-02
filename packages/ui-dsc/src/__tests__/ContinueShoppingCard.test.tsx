import { test, expect } from "vitest"
import { Routes, Route, MemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { ContinueShoppingCard } from "../cart/ContinueShoppingCard"

const App = () => (
  <MemoryRouter initialEntries={["/cart"]}>
    <Routes>
      <Route path="/catalog" element={<> Catalog </>} />
      <Route path="/cart" element={<ContinueShoppingCard />} />
    </Routes>
  </MemoryRouter>
)

describe("ContinueShoppingCard", () => {
  test("should render the text 'Need something else?'", () => {
    render(<App />)
    const textElement = screen.getByText("Need something else?")
    expect(textElement).toBeInTheDocument()
  })

  test("should render a Button with the text 'Strains Catalog' that links user to the /catalog?entity=strain route", async () => {
    render(<App />)
    const buttonElement = screen.getByText("Browse Strains")

    await userEvent.click(buttonElement)

    expect(screen.getByText("Catalog")).toBeInTheDocument()
  })

  test("should render a Button with the text 'Plasmids Catalog' that links user to the /catalog?entity=plasmid route", async () => {
    render(<App />)
    const buttonElement = screen.getByText("Browse Plasmids")

    await userEvent.click(buttonElement)

    expect(screen.getByText("Catalog")).toBeInTheDocument()
  })
})
