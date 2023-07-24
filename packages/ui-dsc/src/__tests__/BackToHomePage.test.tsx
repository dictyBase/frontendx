import { test, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { BackToHomePage } from "../order/BackToHomePage"

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

  const buttonElement = screen.getByRole("button", {
    name: /back to dsc homepage/i,
  })

  expect(buttonElement).toBeInTheDocument()
})

test("when the button is clicked, the user is navigated to '/'", async () => {
  render(<App />)

  const buttonElement = screen.getByRole("button", {
    name: /back to dsc homepage/i,
  })
  await userEvent.click(buttonElement)

  expect(screen.getByText(/home page/i)).toBeInTheDocument()
})
