import { nameToUpperInitial } from "../functional"

// Test for nameToUpperInitial function
describe("nameToUpperInitial", () => {
  it("should return the initials of a name in uppercase", () => {
    expect(nameToUpperInitial("John Doe")).toBe("JD")
    expect(nameToUpperInitial("Jane Smith")).toBe("JS")
    expect(nameToUpperInitial("a b")).toBe("AB")
    expect(nameToUpperInitial("")).toBe("")
  })
})
