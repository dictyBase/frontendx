import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { useAuthorization } from "../useAuthorization"

const mockUseLogto = vi.hoisted(() => vi.fn())

vi.mock("@logto/react", () => ({
  useLogto: mockUseLogto,
}))
/* useAuthorization takes an argument of type { entries: Array<string> } where
 * each string in the array is the name of an authorized role. If a Logto user's roles
 * includes one of the roles provided in `entries`, then they are considered authorized.
 */

const TestComponent = ({
  authorizedRoles,
}: {
  authorizedRoles: Array<string>
}) => {
  const { isAuthorized } = useAuthorization({
    entries: authorizedRoles,
  })
  return <div>{isAuthorized ? "AUTHORIZED" : "UNAUTHORIZED"}</div>
}

test("fetchUserInfo is not called if isAuthenticated is false", async () => {
  const fetchUserInfoMock = vi.fn()
  mockUseLogto.mockReturnValue({
    fetchUserInfo: fetchUserInfoMock,
    isAuthenticated: false,
  })

  render(<TestComponent authorizedRoles={["admin"]} />)
  expect(screen.getByText("UNAUTHORIZED")).toBeInTheDocument()
  expect(fetchUserInfoMock).not.toHaveBeenCalled()
})

test("A user without a matching role is unauthorized", async () => {
  mockUseLogto.mockReturnValue({
    fetchUserInfo: async () => ({ roles: ["user"] }),
    isAuthenticated: true,
  })

  render(<TestComponent authorizedRoles={["admin"]} />)
  expect(await screen.findByText("UNAUTHORIZED")).toBeInTheDocument()
})

test("A user with a matching role is authorized", async () => {
  mockUseLogto.mockReturnValue({
    fetchUserInfo: () => ({ roles: ["admin"] }),
    isAuthenticated: true,
  })

  render(<TestComponent authorizedRoles={["admin"]} />)
  expect(await screen.findByText("AUTHORIZED")).toBeInTheDocument()
})
