import evidenceLinkGenerator from "./evidenceLinkGenerator"

describe("evidenceLinkGenerator", () => {
  it("returns correct link for IMP", () => {
    expect(evidenceLinkGenerator("IMP")).toBe(
      "http://dictybase.org/ontology/go/evidence#IMP",
    )
  })
  it("returns correct link for IGI", () => {
    expect(evidenceLinkGenerator("IGI")).toBe(
      "http://dictybase.org/ontology/go/evidence#IGI",
    )
  })
  it("returns correct link for IDA", () => {
    expect(evidenceLinkGenerator("IDA")).toBe(
      "http://dictybase.org/ontology/go/evidence#IDA",
    )
  })
  it("returns correct link for IBA", () => {
    expect(evidenceLinkGenerator("IBA")).toBe(
      "http://dictybase.org/ontology/go/evidence#IBA",
    )
  })
  it("returns correct link for IEA", () => {
    expect(evidenceLinkGenerator("IEA")).toBe(
      "http://dictybase.org/ontology/go/evidence#IEA",
    )
  })
  it("returns correct link for IPI", () => {
    expect(evidenceLinkGenerator("IPI")).toBe(
      "http://dictybase.org/ontology/go/evidence#IPI",
    )
  })
  it("returns general link for unrecognized ID", () => {
    expect(evidenceLinkGenerator("abc")).toBe(
      "http://dictybase.org/ontology/go/evidence",
    )
  })
})
