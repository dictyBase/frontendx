import React from "react"
import { render, screen } from "@testing-library/react"
import OauthCallback from "../components/auth/OauthCallback"

const useRouter = jest.spyOn(require("next/router"), "useRouter")

describe("components/auth/OauthCallback", () => {
  const globalAny = global as any
  const postMessageMock = jest.fn()
  const closeMock = jest.fn()
  globalAny.opener = {
    postMessage: postMessageMock,
  }
  globalAny.close = closeMock
  process.env.NEXT_PUBLIC_BASENAME = "/publication"

  describe("initial render", () => {
    it("renders text notification", () => {
      useRouter.mockImplementationOnce(() => ({
        query: { id: "" },
        pathname: "",
      }))

      render(<OauthCallback />)
      expect(
        screen.getByText(/Transferring to login system ......../),
      ).toBeInTheDocument()
    })
  })

  describe("window behavior", () => {
    it("should call post message on mount", () => {
      useRouter.mockImplementationOnce(() => ({
        query: { id: "" },
        pathname: "",
      }))

      render(<OauthCallback />)
      expect(postMessageMock).toHaveBeenCalled()
    })
  })
})
