import { test, expect } from "vitest"
import { screen, render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { NotFoundError } from "../NotFoundError"

test("it renders `Page Not Found` text", () => {
  render(
    <MemoryRouter>
      <NotFoundError />
    </MemoryRouter>,
  )
  expect(screen.getByRole("heading")).toHaveTextContent(/Page Not Found/)
})

test("it renders a button that returns the user to the home page ", () => {
  render(
    <MemoryRouter>
      <NotFoundError />
    </MemoryRouter>,
  )
  expect(
    screen.getByRole("button", { name: /Back to DSC homepage/ }),
  ).toBeInTheDocument()
})
test("it renders a button that returns the user to the home page ", () => {
  render(
    <MemoryRouter>
      <NotFoundError />
    </MemoryRouter>,
  )
  expect(
    screen.getByRole("button", { name: /Back to DSC homepage/ }),
  ).toBeInTheDocument()
})
test("it renders a button allows an authorized user to add a page", () => {
  render(
    <MemoryRouter>
      <NotFoundError />
    </MemoryRouter>,
  )
  expect(
    screen.getByRole("button", { name: /Add a page to this route/ }),
  ).toBeInTheDocument()
})
