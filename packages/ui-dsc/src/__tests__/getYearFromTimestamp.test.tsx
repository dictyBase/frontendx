import { getYearFromTimestamp } from "../utils/getYearFromTimeStamp"

describe("getYearFromTimestamp", () => {
  test("should extract year from timestamp", () => {
    expect(getYearFromTimestamp("2004-06-11T00:00:00.000Z")).toBe(2004)
  })
})
