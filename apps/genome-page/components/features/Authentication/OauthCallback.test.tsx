import React from "react"
import { render, screen } from "@testing-library/react"
import { OauthCallback } from "./OauthCallback"

// eslint-disable-next-line import/no-commonjs, unicorn/prefer-module -- ESM not supported by default as of Jest 29
const useRouter = jest.spyOn(require("next/router"), "useRouter")

describe("features/Authentication/OauthCallback", () => {
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
        screen.getByText(/Transfer{2}ing to login system .{8}/),
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
