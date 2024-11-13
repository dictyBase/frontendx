// @ts-nocheck
import { describe, test } from "vitest"
import { parseFormattedStringToDomElements } from "../utils/parseFormattedStringToDomElements"

describe("parseFormattedStringToDomElements", () => {
  test("should parse a string with no formatting tags", () => {
    const input = "This is a plain string"
    const result = parseFormattedStringToDomElements(input)
    expect(result).toHaveLength(1)
    expect((result[0] as ResultArrayElement).type).toBe("span")
    expect((result[0] as ResultArrayElement).props.children).toBe(input)
  })

  test("should parse a string with a single formatting tag", () => {
    const input = "This is <b>bold</b> text"
    const result = parseFormattedStringToDomElements(input)
    expect(result).toHaveLength(3)
    expect(result[0].type).toBe("span")
    expect(result[0].props.children).toBe("This is ")
    expect(result[1].type).toBe("b")
    expect(result[1].props.children).toHaveLength(1)
    expect(result[1].props.children[0].type).toBe("span")
    expect(result[1].props.children[0].props.children).toBe("bold")
    expect(result[2].type).toBe("span")
    expect(result[2].props.children).toBe(" text")
  })

  test("should parse a string with nested formatting tags", () => {
    const input = "This is <b>bold and <i>italic</i></b> text"
    const result = parseFormattedStringToDomElements(input)
    expect(result).toHaveLength(3)
    expect(result[0].type).toBe("span")
    expect(result[0].props.children).toBe("This is ")
    expect(result[1].type).toBe("b")
    expect(result[1].props.children).toHaveLength(3)
    expect(result[1].props.children[0].type).toBe("span")
    expect(result[1].props.children[0].props.children).toBe("bold and ")
    expect(result[1].props.children[1].type).toBe("i")
    expect(result[1].props.children[1].props.children).toHaveLength(1)
    expect(result[1].props.children[1].props.children[0].type).toBe("span")
    expect(result[1].props.children[1].props.children[0].props.children).toBe(
      "italic",
    )
    expect(result[1].props.children[2].type).toBe("span")
    expect(result[1].props.children[2].props.children).toBe("")
    expect(result[2].type).toBe("span")
    expect(result[2].props.children).toBe(" text")
  })

  test("should handle HTML entities correctly", () => {
    const input = "This is &lt;b&gt;bold&lt;/b&gt; text"
    const result = parseFormattedStringToDomElements(input)
    expect(result).toHaveLength(3)
    expect(result[0].type).toBe("span")
    expect(result[0].props.children).toBe("This is ")
    expect(result[1].type).toBe("b")
    expect(result[1].props.children).toHaveLength(1)
    expect(result[1].props.children[0].type).toBe("span")
    expect(result[1].props.children[0].props.children).toBe("bold")
    expect(result[2].type).toBe("span")
    expect(result[2].props.children).toBe(" text")
  })
})
