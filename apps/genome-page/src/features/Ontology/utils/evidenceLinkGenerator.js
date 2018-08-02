// @flow

/**
 * This is a helper function to generate links for evidence codes.
 */

const evidenceLinkGenerator = (id: string) => {
  switch (id) {
    case "IMP":
      return "http://dictybase.org/ontology/go/evidence#IMP"
    case "IGI":
      return "http://dictybase.org/ontology/go/evidence#IGI"
    case "IDA":
      return "http://dictybase.org/ontology/go/evidence#IDA"
    case "IBA":
      return "http://dictybase.org/ontology/go/evidence#IBA"
    case "IEA":
      return "http://dictybase.org/ontology/go/evidence#IEA"
    case "IPI":
      return "http://dictybase.org/ontology/go/evidence#IPI"
    default:
      return "http://dictybase.org/ontology/go/evidence"
  }
}

export default evidenceLinkGenerator
