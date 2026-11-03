import { test, expect } from "vitest"
import { Routes, Route, MemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { ContinueShoppingCard } from "../cart/ContinueShoppingCard"

const App = () => (
  <MemoryRouter initialEntries={["/cart"]}>
    <Routes>
      <Route path="/catalog" element={<> Catalog page </>} />
      <Route path="/strains" element={<> Strains page </>} />
      <Route path="/plasmids" element={<> Plasmids page </>} />
      <Route path="/cart" element={<ContinueShoppingCard />} />
    </Routes>
  </MemoryRouter>
)

test("should render the text 'Need something else?'", () => {
  render(<App />)
  const textElement = screen.getByText("Need something else?")
  expect(textElement).toBeInTheDocument()
})

test("should link the Catalog button to the full catalog route", async () => {
  render(<App />)
  const buttonElement = screen.getByRole("link", { name: "Catalog" })

  await userEvent.click(buttonElement)

  expect(await screen.findByText("Catalog page")).toBeInTheDocument()
})

test("should link Browse Strains to the strains resource route", async () => {
  render(<App />)
  const buttonElement = screen.getByRole("link", { name: "Browse Strains" })

  await userEvent.click(buttonElement)

  expect(await screen.findByText("Strains page")).toBeInTheDocument()
})

test("should link Browse Plasmids to the plasmids resource route", async () => {
  render(<App />)
  const buttonElement = screen.getByRole("link", { name: "Browse Plasmids" })

  await userEvent.click(buttonElement)

  expect(await screen.findByText("Plasmids page")).toBeInTheDocument()
})
