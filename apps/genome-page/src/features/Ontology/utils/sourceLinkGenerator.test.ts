import sourceLinkGenerator from "./sourceLinkGenerator"

describe("sourceLinkGenerator", () => {
  it("returns correct link for dictyBase", () => {
    expect(sourceLinkGenerator("dictyBase")).toBe("/")
  })
  it("returns correct link for InterPro", () => {
    expect(sourceLinkGenerator("InterPro")).toBe(
      "http://www.ebi.ac.uk/interpro/",
    )
  })
  it("returns correct link for GO_Central", () => {
    expect(sourceLinkGenerator("GO_Central")).toBe(
      "http://www.geneontology.org/page/reference-genome-annotation-project",
    )
  })
  it("returns correct link for UniProt", () => {
    expect(sourceLinkGenerator("UniProt")).toBe("https://www.uniprot.org/")
  })
  it("returns correct link for GOC", () => {
    expect(sourceLinkGenerator("GOC")).toBe("http://www.geneontology.org/")
  })
  it("returns correct link for IntAct", () => {
    expect(sourceLinkGenerator("IntAct")).toBe("https://www.ebi.ac.uk/intact/")
  })
  it("returns hash if no ID match", () => {
    expect(sourceLinkGenerator("xyz")).toBe("#")
  })
})
