import { render, screen } from "@testing-library/react"
import { App } from "./App"

vi.mock("@dictybase/auth-mui5", () => ({
  HeaderWithAuth: vi.fn(() => <></>),
  NavbarWithAuth: vi.fn(() => <></>),
  FooterWithAuth: vi.fn(() => <></>),
}))

test("renders children", () => {
  render(<App> Test Child </App>)
  expect(screen.getByText("Test Child")).toBeInTheDocument()
})
