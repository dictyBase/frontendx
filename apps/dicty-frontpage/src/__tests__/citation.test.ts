import { describe, it, expect } from "vitest"
import {
  getAuthorsCitationString,
  getPublicationYear,
  limitCharacters,
  formatTitle,
  shortenName,
  shortenAllNames,
} from "../common/utils/citation"

describe("getAuthorsCitationString", () => {
  it("should return the single author name for one author", () => {
    const authors = ["Smith"]
    expect(getAuthorsCitationString(authors)).toBe("Smith")
  })

  it("should return the two author names separated by &", () => {
    const authors = ["Smith", "Johnson"]
    expect(getAuthorsCitationString(authors)).toBe("Smith & Johnson")
  })

  it("should return the formatted author list for more than two authors", () => {
    const authors = ["Smith", "Johnson", "Williams", "Jones", "Brown"]
    expect(getAuthorsCitationString(authors)).toBe(
      "Smith, Johnson, Williams, Jones & Brown",
    )
  })

  it("should return the first author name followed by et al for more than the limit", () => {
    const authors = [
      "Smith",
      "Johnson",
      "Williams",
      "Jones",
      "Brown",
      "Davis",
      "Miller",
      "Wilson",
    ]
    expect(getAuthorsCitationString(authors, { limit: 5 })).toBe("Smith et al")
  })
})

describe("getPublicationYear", () => {
  it("should return the year from the given date string", () => {
    const dateStr = "2022-05-15T12:34:56Z"
    expect(getPublicationYear(dateStr)).toBe(2022)
  })
})

describe("limitCharacters", () => {
  it("should return the original string if it is shorter than the limit", () => {
    const str = "Short string"
    expect(limitCharacters(str, 20)).toBe("Short string")
  })

  it("should limit the string and add ellipsis if it is longer than the limit", () => {
    const str = "This is a longer string"
    expect(limitCharacters(str, 20)).toBe("This is a longer str...")
  })
})

describe("formatTitle", () => {
  it("should add a period at the end", () => {
    const title = "This is a test title"
    expect(formatTitle(title).full).toBe("This is a test title")
  })

  it("should add ellipsis if the title is longer than 90 characters", () => {
    const title =
      "This is a very long title that is longer than 90 characters and should be truncated with ellipses at the end"
    expect(formatTitle(title).withEllipses).toBe(
      "This is a very long title that is longer than 90 characters and should be truncated with e...",
    )
  })
})

describe("shortenName", () => {
  it("should shorten the name to initials and surname", () => {
    const name = "John David Smith"
    expect(shortenName(name)).toBe("JD Smith")
  })
})

describe("shortenAllNames", () => {
  it("should shorten all names in the array", () => {
    const names = ["John David Smith", "Emily Jane Johnson", "Michael Lee Brown"]
    expect(shortenAllNames(names)).toEqual(["JD Smith", "EJ Johnson", "ML Brown"])
  })
})
