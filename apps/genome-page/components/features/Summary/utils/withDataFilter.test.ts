import withDataFilter, { emptyArray } from "./withDataFilter"

const testArr = (db: string) => [
  {
    id: "123456",
    db: db,
    name: "test1",
  },
  {
    id: "987654",
    db: db,
    name: "test2",
  },
  {
    id: "999999",
    db: db,
    name: "test3",
  },
]

const dictyBase = testArr("dictyBase")
const UniProtKB = testArr("UniProtKB")
const MGI = testArr("MGI")
const RGD = testArr("RGD")
const SGD = testArr("SGD")
const PomBase = testArr("PomBase")

describe("features/Summary/utils/withDataFilter", () => {
  describe("emptyArray function", () => {
    it("should return true for empty array", () => {
      expect(emptyArray([])).toBeTruthy()
    })
    it("should return false for non-empty array", () => {
      expect(emptyArray(dictyBase)).toBeFalsy()
    })
  })

  describe("withDataFilter function", () => {
    it("should return dictyBase items", () => {
      expect(withDataFilter(dictyBase)).toStrictEqual(dictyBase.slice(0, 2))
    })
    it("should return UniProtKB items", () => {
      expect(withDataFilter(UniProtKB)).toStrictEqual(UniProtKB.slice(0, 2))
    })
    it("should return MGI items", () => {
      expect(withDataFilter(MGI)).toStrictEqual(MGI.slice(0, 2))
    })
    it("should return RGD items", () => {
      expect(withDataFilter(RGD)).toStrictEqual(RGD.slice(0, 2))
    })
    it("should return SGD items", () => {
      expect(withDataFilter(SGD)).toStrictEqual(SGD.slice(0, 2))
    })
    it("should return PomBase items", () => {
      expect(withDataFilter(PomBase)).toStrictEqual(PomBase.slice(0, 2))
    })
  })
})
