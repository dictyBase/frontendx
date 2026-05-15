import { vi, expect, afterEach } from "vitest"
import { cleanup } from "@testing-library/react"
import matchers from "@testing-library/jest-dom/matchers"

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// Broadcast Channel API is unavailable in testing environment, so we mock it here.
vi.mock("../atomWithBroadcast.ts", () => ({
  atomWithBroadcast: (_key: any, baseAtom: any) => baseAtom,
}))

// mock @logto
vi.mock("@logto/react", async () => ({
  useLogto: () => ({
    getAccessToken: () => {},
  }),
}))

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
