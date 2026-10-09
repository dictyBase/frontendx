import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { conditonalHandler } from "../HeaderWithAuth"
import type { UserWithRoles } from "../const"

vi.mock("@logto/react", () => ({
  useLogto: () => ({
    signIn: vi.fn(),
  }),
}))

const frontPageUrl = "https://dictybase.org"
const basename = "/stock"

const mockUser: UserWithRoles = {
  sub: "user-1",
  name: "John Doe",
  email: "john@example.com",
  roles: ["content-admin"],
}

const renderLinks = (links: ReturnType<typeof conditonalHandler>) =>
  render(<>{links}</>)

test("should render default icons only when auth is disabled", () => {
  renderLinks(
    conditonalHandler({
      authEnabled: false,
      isAuthenticated: false,
      isAuthorized: false,
      isLoading: false,
      user: undefined,
      frontPageUrl,
      basename,
    }),
  )
  expect(screen.queryByText("Login")).not.toBeInTheDocument()
  expect(screen.queryByRole("button", { name: "JD" })).not.toBeInTheDocument()
  expect(screen.getByRole("link", { name: /cite us/i })).toHaveAttribute(
    "href",
    `${frontPageUrl}/community/citation/show`,
  )
})

test("should render authorized icons and AuthorizedLogoutButton when authorized", () => {
  renderLinks(
    conditonalHandler({
      authEnabled: true,
      isAuthenticated: true,
      isAuthorized: true,
      isLoading: false,
      user: mockUser,
      frontPageUrl,
      basename,
    }),
  )
  expect(screen.getByRole("button", { name: "JD" })).toBeInTheDocument()
  expect(screen.queryByText("Login")).not.toBeInTheDocument()
  expect(screen.getByRole("link", { name: /cite us/i })).toHaveAttribute(
    "href",
    `${frontPageUrl}/community/citation/editable`,
  )
})

test("should render default icons and LogoutButton when authenticated but not authorized", () => {
  renderLinks(
    conditonalHandler({
      authEnabled: true,
      isAuthenticated: true,
      isAuthorized: false,
      isLoading: false,
      user: mockUser,
      frontPageUrl,
      basename,
    }),
  )
  expect(screen.getByRole("button", { name: "JD" })).toBeInTheDocument()
  expect(screen.queryByText("Login")).not.toBeInTheDocument()
  expect(screen.getByRole("link", { name: /cite us/i })).toHaveAttribute(
    "href",
    `${frontPageUrl}/community/citation/show`,
  )
})

test("should render default icons and LoginButton when not authenticated", () => {
  renderLinks(
    conditonalHandler({
      authEnabled: true,
      isAuthenticated: false,
      isAuthorized: false,
      isLoading: false,
      user: undefined,
      frontPageUrl,
      basename,
    }),
  )
  expect(screen.getByText("Login")).toBeInTheDocument()
  expect(screen.queryByRole("button", { name: "JD" })).not.toBeInTheDocument()
  expect(screen.getByRole("link", { name: /cite us/i })).toHaveAttribute(
    "href",
    `${frontPageUrl}/community/citation/show`,
  )
})
