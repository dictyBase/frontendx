import { describe, test, expect } from "vitest"
import { isMutation } from "../graphql/authLink"

describe("isMutation function", () => {
  test("should return true for mutation", () => {
    expect(isMutation("Logout")).toBeTruthy()
  })
  test("should return false for query", () => {
    expect(isMutation("GetRefreshToken")).toBeFalsy()
  })
})
