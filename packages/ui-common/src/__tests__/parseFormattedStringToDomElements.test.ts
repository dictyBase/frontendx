// @ts-nocheck
import { describe, test } from "vitest"
import { parseFormattedStringToDomElements } from "../parseFormattedStringToDomElements"

describe("parseFormattedStringToDomElements", () => {
  test("should parse a string with no formatting tags", () => {
    const input = "This is a plain string"
    const result = parseFormattedStringToDomElements(input)
    expect(result).toHaveLength(1)
    expect(result[0]).toBe(input)
  })
  test("should parse a string with only formatting tags", () => {
    const input = "<b>All of this is bold</b>"
    const result = parseFormattedStringToDomElements(input)
    expect(result).toHaveLength(3)
    expect(result[1].type).toBe("b")
    expect(result[1].props.children).toHaveLength(1)
    expect(result[1].props.children[0]).toBe("All of this is bold")
  })
  test("should parse a string with a single formatting tag", () => {
    const input = "This is <b>bold</b> text"
    const result = parseFormattedStringToDomElements(input)
    expect(result).toHaveLength(3)
    expect(result[0]).toBe("This is ")
    expect(result[1].type).toBe("b")
    expect(result[1].props.children).toHaveLength(1)
    expect(result[1].props.children[0]).toBe("bold")
    expect(result[2]).toBe(" text")
  })

  test("should parse a string with nested formatting tags", () => {
    const input = "This is <b>bold and <i>italic</i></b> text"
    const result = parseFormattedStringToDomElements(input)
    expect(result).toHaveLength(3)
    expect(result[0]).toBe("This is ")
    expect(result[1].type).toBe("b")
    expect(result[1].props.children).toHaveLength(3)
    expect(result[1].props.children[0]).toBe("bold and ")
    expect(result[1].props.children[1].type).toBe("i")
    expect(result[1].props.children[1].props.children).toHaveLength(1)
    expect(result[1].props.children[1].props.children[0]).toBe("italic")
    expect(result[1].props.children[2]).toBe("")
    expect(result[2]).toBe(" text")
  })

  test("should handle HTML entities correctly", () => {
    const input = "This is &lt;b&gt;bold&lt;/b&gt; text"
    const result = parseFormattedStringToDomElements(input)
    expect(result).toHaveLength(3)
    expect(result[0]).toBe("This is ")
    expect(result[1].type).toBe("b")
    expect(result[1].props.children).toHaveLength(1)
    expect(result[1].props.children[0]).toBe("bold")
    expect(result[2]).toBe(" text")
  })

  test("should handle formatting tag at the beginning of the string", () => {
    const input = "<b>This is bold</b> text"
    const result = parseFormattedStringToDomElements(input)
    expect(result).toHaveLength(3)
    expect(result[0]).toBe("")
    expect(result[1].type).toBe("b")
    expect(result[1].props.children).toHaveLength(1)
    expect(result[1].props.children[0]).toBe("This is bold")
    expect(result[2]).toBe(" text")
  })

  test("should handle formatting tag at the end of the string", () => {
    const input = "This is <b>bold</b>"
    const result = parseFormattedStringToDomElements(input)
    expect(result).toHaveLength(3)
    expect(result[0]).toBe("This is ")
    expect(result[1].type).toBe("b")
    expect(result[1].props.children).toHaveLength(1)
    expect(result[1].props.children[0]).toBe("bold")
    expect(result[2]).toBe("")
  })
})
