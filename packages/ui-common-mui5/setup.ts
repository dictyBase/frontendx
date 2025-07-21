import { vi, expect, afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
import matchers from "@testing-library/jest-dom/matchers"

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// mock @logto
vi.mock("@logto/react", async () => {
  return {
    useLogto: () => ({
      getAccessToken: () => {}
    })
  }
}) 

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
