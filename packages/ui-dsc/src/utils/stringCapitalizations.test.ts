import { capitalizeEveryWordInString } from "./stringCapitalizations"

describe("utils/stringCapitalizations", () => {
  describe("capitalizeEveryWordInString", () => {
    it("should capitalize every word", () => {
      expect(capitalizeEveryWordInString("other stock centers")).toEqual(
        "Other Stock Centers",
      )
    })
  })
})
