import withLinkGenerator from "common/utils/withLinkGenerator"

describe("withLinkGenerator", () => {
  const fn = withLinkGenerator
  describe("with name parameters", () => {
    it("returns local URL if given gene name", () => {
      expect(fn("Q54QB1", "UniprotKB", "erkB")).toBe("/gene/erkB")
    })
    it("returns local URL if given gene ID", () => {
      expect(fn("Q54QB1", "UniprotKB", "DDB_G0272608")).toBe(
        "/gene/DDB_G0272608",
      )
    })
    it("returns GO URL if given GO name", () => {
      expect(fn("0032496", "GO", "response to lipopolysaccharide")).toBe(
        "https://www.ebi.ac.uk/QuickGO/term/GO:0032496",
      )
    })
    it("returns Uniprot URL if given Uniprot name", () => {
      expect(fn("P68135", "UniprotKB", "P68135")).toBe(
        "https://www.uniprot.org/uniprot/P68135",
      )
    })
  })

  describe("without name parameters", () => {
    it("returns correct CHEBI URL", () => {
      expect(fn("test", "CHEBI")).toBe(
        "https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:test",
      )
    })
    it("returns correct DDB URL", () => {
      expect(fn("DDB_G0272608", "DDB")).toBe("/gene/DDB_G0272608")
    })
    it("returns correct dictyBase URL", () => {
      expect(fn("DDB_G0272608", "dictyBase")).toBe("/gene/DDB_G0272608")
    })
    it("returns correct FB URL", () => {
      expect(fn("test", "FB")).toBe("http://flybase.org/reports/test.html")
    })
    it("returns correct GO URL", () => {
      expect(fn("test", "GO")).toBe(
        "https://www.ebi.ac.uk/QuickGO/term/GO:test",
      )
    })
    it("returns correct InterPro URL", () => {
      expect(fn("test", "InterPro")).toBe(
        "http://www.ebi.ac.uk/interpro/entry/test",
      )
    })
    it("returns correct MGI URL", () => {
      expect(fn("test", "MGI")).toBe(
        "http://www.informatics.jax.org/marker/test",
      )
    })
    it("returns correct PANTHER URL", () => {
      expect(fn("test", "PANTHER")).toBe(
        "http://www.pantree.org/node/annotationNode.jsp?id=test",
      )
    })
    it("returns correct PomBase URL", () => {
      expect(fn("test", "PomBase")).toBe(
        "https://www.pombase.org/spombe/result/test",
      )
    })
    it("returns correct RGD URL", () => {
      expect(fn("test", "RGD")).toBe(
        "https://rgd.mcw.edu/rgdweb/report/gene/main.html?id=test",
      )
    })
    it("returns correct SGD URL", () => {
      expect(fn("test", "SGD")).toBe("https://www.yeastgenome.org/locus/test")
    })
    it("returns correct SO URL", () => {
      expect(fn("test", "SO")).toBe(
        "http://www.sequenceontology.org/browser/current_svn/term/SO:test",
      )
    })
    it("returns correct TAIR URL", () => {
      expect(fn("test", "TAIR")).toBe(
        "https://www.arabidopsis.org/servlets/TairObject?accession=test",
      )
    })
    it("returns correct UniProtKB URL", () => {
      expect(fn("test", "UniProtKB")).toBe(
        "https://www.uniprot.org/uniprot/test",
      )
    })
    it("returns correct UniProtKB-KW URL", () => {
      expect(fn("test", "UniProtKB-KW")).toBe(
        "https://www.uniprot.org/keywords/test",
      )
    })
    it("returns correct UniProtKB-SubCell URL", () => {
      expect(fn("test", "UniProtKB-SubCell")).toBe(
        "https://www.uniprot.org/locations/test",
      )
    })
    it("returns correct WB URL", () => {
      expect(fn("test", "WB")).toBe("https://wormbase.org/search/cds/test")
    })
    it("returns correct ZFIN URL", () => {
      expect(fn("test", "ZFIN")).toBe("https://zfin.org/test")
    })
    it("returns hash if no ID match", () => {
      expect(fn("test", "test")).toBe("#")
    })
  })
})
