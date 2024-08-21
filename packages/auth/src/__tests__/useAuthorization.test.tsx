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
  const { isAuthorized, isLoading } = useAuthorization({
    entries: authorizedRoles,
  })
  if (isLoading) return <> LOADING </>
  return <>{isAuthorized ? "AUTHORIZED" : "UNAUTHORIZED"}</>
}

test("A user without a matching role is authorized", () => {})

test("A user with a matching role is authorized", () => {})
