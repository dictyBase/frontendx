import { test, expect } from "vitest"
import { userEvent } from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { BackToHomePage } from "../BackToHomePage"

const App = () => (
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<> Home Page </>} />
    </Routes>
    <BackToHomePage />
  </MemoryRouter>
)

test("renders a button that indicates navigation back to the home page", () => {
  render(<App />)

  const linkElement = screen.getByRole("link", {
    name: /back to dsc homepage/i,
  })

  expect(linkElement).toBeInTheDocument()
})

test("when the button is clicked, the user is navigated to '/'", async () => {
  render(<App />)

  const linkElement = screen.getByRole("link", {
    name: /back to dsc homepage/i,
  })
  await userEvent.click(linkElement)

  expect(screen.getByText(/home page/i)).toBeInTheDocument()
})
