/* eslint-disable unicorn/consistent-function-scoping */
import React from "react"
import { render, waitFor } from "@testing-library/react"
import { LoginDocument } from "dicty-graphql-schema"
import { MockAuthProvider } from "mocks/MockAuthProvider"
import { OauthSignHandler } from "./OauthSignHandler"

const clientConfig = {
  facebook: { clientId: "xxxxxxxxxxxxxxx" },
  google: { clientId: "xxxxxxxxxxxxxxxxxx" },
  linkedin: { clientId: "xxxxxxxxxxxxxxxxxx" },
  orcid: { clientId: "xxxxxxxxxxxxxxxxxx" },
}

jest.mock("next/router", () => {
  const useRouter = () => ({
    push: (value: string) => value,
  })

  return {
    useRouter,
  }
})

describe("authentication/OauthSignHandler", () => {
  // set up mocks for window event listeners
  const globalAny = global as any
  const map = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    message: (any: any) => {},
  }
  globalAny.addEventListener = jest.fn((event, callback) => {
    // @ts-ignore
    map[event] = callback
  })
  globalAny.removeEventListener = jest.fn((event, callback) => {
    // @ts-ignore
    map[event] = callback
  })

  // variables used in both graphql mock and event data mock
  const redirectUrl = "http://localhost:3000/google/callback"
  const code = "1232t35"

  // graphql mocks, use variable to determine if mutation called
  let loginMutationCalled = false
  const mocks = [
    {
      request: {
        query: LoginDocument,
        variables: {
          input: {
            client_id: clientConfig.google.clientId,
            redirect_url: redirectUrl,
            state: "state",
            code,
            scopes: "email",
            provider: "google",
          },
        },
      },
      result: () => {
        loginMutationCalled = true
        return {
          data: {
            login: {
              token: "fake token",
              user: {
                id: "123",
                email: "crazyjoe@davola.org",
                first_name: "Joe",
                last_name: "Davola",
                roles: [
                  {
                    role: "superuser",
                    permissions: [
                      {
                        permission: "admin",
                        resource: "dictybase",
                      },
                    ],
                  },
                ],
              },
              identity: {
                provider: "google",
              },
            },
          },
        }
      },
    },
  ]

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const MockComponent = ({ mocks }: any) => (
    <MockAuthProvider mocks={mocks}>
      <OauthSignHandler />
    </MockAuthProvider>
  )

  beforeEach(() => {
    loginMutationCalled = false
  })

  describe("initial render", () => {
    it("renders empty div", () => {
      const { container } = render(<MockComponent mocks={mocks} />)
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe("window behavior", () => {
    it("should add event listener on mount", () => {
      render(<MockComponent mocks={mocks} />)
      expect(globalAny.addEventListener).toHaveBeenCalled()
    })
    it("should remove event listener on unmount", () => {
      const { unmount } = render(<MockComponent mocks={mocks} />)
      unmount()
      expect(globalAny.removeEventListener).toHaveBeenCalled()
    })
  })

  describe("login mutation", () => {
    it("should return early if no provider included in event data", async () => {
      render(<MockComponent mocks={mocks} />)
      map.message({
        data: {
          query: `?code=${code}`,
          url: redirectUrl,
        },
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      })
      await waitFor(() => {
        expect(loginMutationCalled).toBeFalsy()
      })
    })
  })
})
