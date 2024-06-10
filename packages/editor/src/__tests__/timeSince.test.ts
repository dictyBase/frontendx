import { vi, test, expect } from "vitest"
import { timeSince } from "../utils/timeSince"

describe("common/utils/timeSince", () => {
  const currentDate = new Date("2020-01-02T11:01:58.135Z")

  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(currentDate)
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  test("should return years", () => {
    expect(timeSince("2018-01-01")).toEqual("2 years")
  })
  test("should return months", () => {
    expect(timeSince("2019-11-01")).toEqual("2 months")
  })
  test("should return days", () => {
    expect(timeSince("2019-12-30")).toEqual("3 days")
  })
  test("should return hours", () => {
    expect(timeSince("2020-01-02T09:01:58.135Z")).toEqual("2 hours")
  })
  test("should return minutes", () => {
    expect(timeSince("2020-01-02T10:59:48.135Z")).toEqual("2 minutes")
  })
  test("should return seconds", () => {
    expect(timeSince("2020-01-02T11:01:48.135Z")).toEqual("10 seconds")
  })
})
