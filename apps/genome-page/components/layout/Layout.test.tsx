import { getTabValue } from "./Layout"

describe("Layout", () => {
  describe("getTabValue", () => {
    test("should return 0 for the gene summary page", () => {
      expect(getTabValue("/sadA")).toBe(0)
      expect(getTabValue("/gene/sadA")).toBe(0)
      expect(getTabValue("/someOtherPath")).toBe(0)
    })

    test("should return 1 for the gene ontology page", () => {
      expect(getTabValue("/sadA/goannotations")).toBe(1)
      expect(getTabValue("/gene/sadA/goannotations")).toBe(1)
    })

    test("should return 2 for the phenotypes page", () => {
      expect(getTabValue("/sadA/phenotypes")).toBe(2)
      expect(getTabValue("/gene/sadA/phenotypes")).toBe(2)
    })

    test("should return 3 for the references page", () => {
      expect(getTabValue("/sadA/references")).toBe(3)
      expect(getTabValue("/gene/sadA/references")).toBe(3)
    })
  })
})
