import dateConverter from "./dateConverter"

describe("dateConverter", () => {
  it("returns date in expected format", () => {
    expect(dateConverter("20161102")).toBe("2016-11-02")
  })
})
