import { timeSince } from "../common/utils/timeSince"

describe("timeSince", () => {
  it("returns seconds for recent times", () => {
    const now = new Date()
    const seconds = 30
    const date = new Date(now.getTime() - seconds * 1000)
    expect(timeSince(date.toISOString())).toBe(`${seconds} seconds`)
  })

  it("returns minutes for times within an hour", () => {
    const now = new Date()
    const minutes = 25
    const date = new Date(now.getTime() - minutes * 60 * 1000)
    expect(timeSince(date.toISOString())).toBe(`${minutes} minutes`)
  })

  it("returns hours for times within a day", () => {
    const now = new Date()
    const hours = 5
    const date = new Date(now.getTime() - hours * 60 * 60 * 1000)
    expect(timeSince(date.toISOString())).toBe(`${hours} hours`)
  })

  it("returns days for times within a week", () => {
    const now = new Date()
    const days = 3
    const date = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    expect(timeSince(date.toISOString())).toBe(`${days} days`)
  })

  it("returns weeks for times within a month", () => {
    const now = new Date()
    const weeks = 2
    const date = new Date(now.getTime() - weeks * 7 * 24 * 60 * 60 * 1000)
    expect(timeSince(date.toISOString())).toBe(`${weeks} weeks`)
  })

  it("returns months for times within a year", () => {
    const now = new Date()
    const months = 6
    const date = new Date(now.getTime() - months * 31 * 24 * 60 * 60 * 1000)
    expect(timeSince(date.toISOString())).toBe(`${months} months`)
  })

  it("returns years for times over a year ago", () => {
    const now = new Date()
    const years = 2
    const date = new Date(now.getTime() - years * 365 * 24 * 60 * 60 * 1000)
    expect(timeSince(date.toISOString())).toBe(`${years} years`)
  })

  it("returns singular form for exactly 1 unit", () => {
    const now = new Date()
    const date = new Date(now.getTime() - 1 * 60 * 1000) // exactly 1 minute ago
    expect(timeSince(date.toISOString())).toBe("1 minute")
  })
})
