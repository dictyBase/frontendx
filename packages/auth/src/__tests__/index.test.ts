import { firstLast, upperFirst, nameToUpperInitial } from "../functional"

describe("firstLast", () => {
  it("should return an array containing the first and last elements of the input array", () => {
    expect(firstLast(["apple", "banana", "cherry"])).toEqual([
      "apple",
      "cherry",
    ])
    expect(firstLast(["dog", "cat", "mouse", "elephant"])).toEqual([
      "dog",
      "elephant",
    ])
    expect(firstLast(["one"])).toEqual(["one", "one"])
  })
})

// Test for upperFirst function
describe("upperFirst", () => {
  it("should return the string with the first character in uppercase", () => {
    expect(upperFirst("hello")).toBe("H")
    expect(upperFirst("world")).toBe("W")
    expect(upperFirst("a")).toBe("A")
    expect(upperFirst("")).toBe("")
  })
})

// Test for nameToUpperInitial function
describe("nameToUpperInitial", () => {
  it("should return the initials of a name in uppercase", () => {
    expect(nameToUpperInitial("John Doe")).toBe("JD")
    expect(nameToUpperInitial("Jane Smith")).toBe("JS")
    expect(nameToUpperInitial("a b")).toBe("AB")
    expect(nameToUpperInitial("")).toBe("")
  })
})
