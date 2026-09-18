import { vi, expect, afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
import matchers from "@testing-library/jest-dom/matchers"

expect.extend(matchers)

// mock @logto
vi.mock("@logto/react", async () => ({
  useLogto: () => ({
    getAccessToken: () => {},
  }),
}))

afterEach(() => {
  cleanup()
})
