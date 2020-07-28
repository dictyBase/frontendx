import pubLinkGenerator from "./pubLinkGenerator"

describe("pubLinkGenerator", () => {
  it("returns correct URL for PMID", () => {
    expect(pubLinkGenerator("PMID:12345")).toBe(
      "https://www.ncbi.nlm.nih.gov/pubmed/12345",
    )
  })
  it("returns correct URL for GO_REF", () => {
    expect(pubLinkGenerator("GO_REF:1234567")).toBe(
      "https://github.com/geneontology/go-site/blob/master/metadata/gorefs/goref-1234567.md",
    )
  })
  it("returns correct URL for PAINT_REF", () => {
    expect(pubLinkGenerator("PAINT_REF:1234567890")).toBe(
      "http://www.pantherdb.org/panther/family.do?clsAccession=PTHR1234567890",
    )
  })
  it("returns ID if no match", () => {
    expect(pubLinkGenerator("abcxyz")).toBe("abcxyz")
  })
})
