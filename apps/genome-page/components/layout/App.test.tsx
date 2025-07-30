import { render, screen } from "@testing-library/react"
import { App } from "./App"

jest.mock("@dictybase/auth-mui5", () => ({
  HeaderWithAuth: jest.fn(() => <></>),
  NavbarWithAuth: jest.fn(() => <></>),
  FooterWithAuth: jest.fn(() => <></>),
}))

test("renders children", () => {
  render(<App> Test Child </App>)
  expect(screen.getByText("Test Child")).toBeInTheDocument()
})
