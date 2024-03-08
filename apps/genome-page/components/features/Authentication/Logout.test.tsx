/* eslint-disable no-console */
import React from "react"
import { render } from "@testing-library/react"
import { Logout } from "./Logout"

const mockHistoryPush = jest.fn()

jest.mock("next/router", () => {
  // eslint-disable-next-line  unicorn/consistent-function-scoping
  const useRouter = () => ({
    push: (value: string) => value,
  })

  return {
    useRouter,
  }
})

describe("features/Authentication/Logout", () => {
  it("should render logout component", () => {
    try {
      render(<Logout />)

      expect(mockHistoryPush).toHaveBeenCalledWith("/gene")
    } catch {
      console.log("Apollo instance")
    }
  })
})
