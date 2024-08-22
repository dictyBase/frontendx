import { firstLast } from "../functional"

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
