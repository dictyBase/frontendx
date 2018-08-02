// @flow

/**
 * This is a helper function to generate links for sources.
 */

const sourceLinkGenerator = (id: string) => {
  switch (id) {
    case "dictyBase":
      return "http://dictybase.org/"
    case "InterPro":
      return "http://www.ebi.ac.uk/interpro/"
    case "GO_Central":
      return "http://www.geneontology.org/page/reference-genome-annotation-project"
    case "UniProt":
      return "https://www.uniprot.org/"
    case "GOC":
      return "http://www.geneontology.org/"
    default:
      return "#"
  }
}

export default sourceLinkGenerator
