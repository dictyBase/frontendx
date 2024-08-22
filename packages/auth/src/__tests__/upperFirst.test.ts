import { upperFirst } from "../functional"

// Test for upperFirst function
describe("upperFirst", () => {
  it("should return the string with the first character in uppercase", () => {
    expect(upperFirst("hello")).toBe("H")
    expect(upperFirst("world")).toBe("W")
    expect(upperFirst("a")).toBe("A")
    expect(upperFirst("")).toBe("")
  })
})
