import { renderHook } from "@testing-library/react-hooks"
import { vi } from "vitest"
import MockAuthProvider, { mockSuperuser } from "../../mocks/MockAuthProvider"
import useAuthorization, {
  verifyToken,
  verifyPermissions,
} from "./useAuthorization"

const mockJWT =
  "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1c2VyIiwiZXhwIjoxNTMyNzAxMTk5LCJqdGkiOiJiZDZ2bTN0M2Q3djAwMDlpdGNmZyIsImlhdCI6MTUzMTgzNzE5OSwiaXNzIjoiZGljdHlCYXNlIiwibmJmIjoxNTMxODM3MTk5LCJzdWIiOiJkaWN0eUJhc2UgbG9naW4gdG9rZW4ifQ" // 2018-07-27 expiration time

describe("hooks/useAuthorization", () => {
  describe("verifyToken", () => {
    let dateNowSpy = global as any

    afterAll(() => {
      // unlock time
      dateNowSpy.mockReset()
      dateNowSpy.mockRestore()
    })
    it("should return false on empty token", () => {
      expect(verifyToken("")).toBeFalsy()
    })
    it("should return true for valid token", () => {
      dateNowSpy = vi
        .spyOn(Date, "now")
        .mockImplementation(() => 1_487_076_708_000) // 2017-02-14
      expect(verifyToken(mockJWT)).toBeTruthy()
    })
    it("should return false for expired token", () => {
      dateNowSpy = vi
        .spyOn(Date, "now")
        .mockImplementation(() => 1_932_701_199_000) // 2031-03-31
      expect(verifyToken(mockJWT)).toBeFalsy()
    })
  })

  describe("verifyPermissions", () => {
    const writePerms = [
      {
        id: "1",
        level: "write",
        resource: "dsccontent",
        description: "test permission",
        createdAt: 123,
        updatedAt: 456,
      },
    ]
    const adminPerms = [
      {
        id: "1",
        level: "admin",
        resource: "dictybase",
        description: "test permission",
        createdAt: 123,
        updatedAt: 456,
      },
    ]
    it("should return true for admin permission even with different permission specified", () => {
      expect(verifyPermissions(adminPerms, "write", "dsccontent")).toBeTruthy()
    })
    it("should return true for matching permission and resource", () => {
      expect(verifyPermissions(writePerms, "write", "dsccontent")).toBeTruthy()
    })
    it("should return false for matching permission and wrong resource", () => {
      expect(verifyPermissions(writePerms, "write", "dscstrain")).toBeFalsy()
    })
    it("should return false for wrong permission and matching resource", () => {
      expect(verifyPermissions(writePerms, "read", "dsccontent")).toBeFalsy()
    })
    it("should return false for empty permissions array", () => {
      expect(verifyPermissions([], "admin", "write")).toBeFalsy()
    })
  })

  describe("useAuthorization hook", () => {
    describe("useAuthorization with superuser logged in", () => {
      const wrapper = ({ children }: any) => (
        <MockAuthProvider mocks={[]} user={mockSuperuser}>
          {children}
        </MockAuthProvider>
      )
      const { result } = renderHook(() => useAuthorization(), {
        wrapper,
      })
      // eslint-disable-next-line sonarjs/no-duplicate-string
      it("should return user state", () => {
        expect(result.current.user).toBe(mockSuperuser)
      })
      it("should authorize superuser to edit pages", () => {
        expect(result.current.canEditPages).toBeTruthy()
      })
    })

    describe("useAuthorization with non-superuser logged in", () => {
      const MockAdmin = {
        id: "999",

        firstName: "Art",

        lastName: "Vandelay",
        email: "george@vandelayindustries.com",

        isActive: true,
        createdAt: "123456",
        updatedAt: "123456",
        roles: [
          {
            id: "1",
            name: "curator",
            description: "dicty curator",

            createdAt: 123_456,

            updatedAt: 678_900,
            permissions: [
              {
                id: "1",
                level: "write",
                description: "a test permission",
                resource: "dsccontent",

                createdAt: 123_456,

                updatedAt: 678_900,
              },
            ],
          },
        ],
      }
      const wrapper = ({ children }: any) => (
        <MockAuthProvider mocks={[]} user={MockAdmin}>
          {children}
        </MockAuthProvider>
      )
      const { result } = renderHook(() => useAuthorization(), {
        wrapper,
      })
      it("should return user state", () => {
        expect(result.current.user).toBe(MockAdmin)
      })
      it.skip("should authorize admin to edit pages", () => {
        expect(result.current.canEditPages).toBeTruthy()
      })
    })

    describe("useAuthorization with no user state", () => {
      const MockEmptyUser = {}
      const wrapper = ({ children }: any) => (
        // @ts-ignore
        <MockAuthProvider mocks={[]} user={MockEmptyUser}>
          {children}
        </MockAuthProvider>
      )
      const { result } = renderHook(() => useAuthorization(), {
        wrapper,
      })
      it("should return user state", () => {
        expect(result.current.user).toBe(MockEmptyUser)
      })
      it("should not authorize empty user to edit pages", () => {
        expect(result.current.canEditPages).toBeFalsy()
      })
    })
  })
})
