import { test, expect, vi, beforeEach, afterEach } from "vitest"
import { renderHook } from "@testing-library/react-hooks"
import { isNone, toNullable } from "fp-ts/Option"
import { Status, UptimeProperties } from "../types"
import { useDictyStatus } from "../hooks/useDictyStatus"

const mockSummary: Array<UptimeProperties> = [
  {
    name: "GraphQL API",
    url: "https://graphql.dictybase.dev",
    status: Status.UP,
  },
  {
    name: "Stock Center",
    url: "https://dictybase.dev/stockcenter",
    status: Status.DOWN,
  },
]

// Let the hook's async TaskEither settle. The failure paths reset to `none`
// (the initial value) so there is no state update to wait on — flushing the
// task queue is enough to observe the resolved state.
const flushTasks = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, 0)
  })

beforeEach(() => {
  vi.restoreAllMocks()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

test("returns the parsed summary wrapped in some when the fetch succeeds", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockSummary),
    }),
  )

  const { result, waitForNextUpdate } = renderHook(() => useDictyStatus())

  // starts empty
  expect(isNone(result.current)).toBe(true)

  await waitForNextUpdate()

  expect(toNullable(result.current)).toEqual(mockSummary)
})

test("returns none when the fetch rejects", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")))

  const { result } = renderHook(() => useDictyStatus())

  // the failure path resets to none; it never resolves to some
  await flushTasks()
  expect(isNone(result.current)).toBe(true)
})

test("returns none when the response body cannot be parsed as json", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      json: () => Promise.reject(new Error("invalid json")),
    }),
  )

  const { result } = renderHook(() => useDictyStatus())

  await flushTasks()
  expect(isNone(result.current)).toBe(true)
})
