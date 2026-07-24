import { test, expect } from "vitest"
import { Routes, Route, MemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { ContinueShoppingCard } from "../cart/ContinueShoppingCard"

const App = () => (
  <MemoryRouter initialEntries={["/cart"]}>
    <Routes>
      <Route path="/strains" element={<> Catalog </>} />
      <Route path="/cart" element={<ContinueShoppingCard />} />
    </Routes>
  </MemoryRouter>
)

test("should render the text 'Need something else?'", () => {
  render(<App />)
  const textElement = screen.getByText("Need something else?")
  expect(textElement).toBeInTheDocument()
})

test("should render a Button with the text 'Catalog' that links to the /strains route", async () => {
  render(<App />)
  const buttonElement = screen.getByText("Catalog")

  await userEvent.click(buttonElement)

  expect(screen.getByText("Catalog")).toBeInTheDocument()
})
