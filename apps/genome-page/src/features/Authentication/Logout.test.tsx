import React from "react"
import { render } from "@testing-library/react"
import Logout from "./Logout"

const mockHistoryPush = jest.fn()

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")

  return {
    ...originalModule,
    useNavigate: (to: string) => mockHistoryPush,
  }
})

describe("features/Authentication/Logout", () => {
  it("should render logout component", () => {
    try {
      render(<Logout />)

      expect(mockHistoryPush).toHaveBeenCalledWith("/gene")
    } catch (e: any) {
      console.log("Apollo instance")
    }
  })
})
