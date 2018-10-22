// @flow

/**
 * This is a helper function to generate links for the With column of DisplayTable.
 */

const withLinkGenerator = (id: string, db: string, name: ?string) => {
  let baseUrl
  if (process.env.NODE_ENV === "production") {
    baseUrl = `/${process.env.REACT_APP_BASENAME}/`
  } else {
    baseUrl = "/"
  }
  if (id === undefined) {
    return "#"
  }
  // if using converted gene name, link to gene page not uniprot
  if (name && name.length < 10) {
    return `${baseUrl}${name}`
  }
  switch (db) {
    case "CHEBI": {
      return `https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:${id}`
    }
    case "DDB":
      return `${baseUrl}${id}`
    case "dictyBase":
      return `${baseUrl}${id}`
    case "FB":
      return `http://flybase.org/reports/${id}.html`
    case "GO":
      return `https://www.ebi.ac.uk/QuickGO/term/GO:${id}`
    case "InterPro":
      return `http://www.ebi.ac.uk/interpro/entry/${id}`
    case "MGI":
      return `http://www.informatics.jax.org/marker/${id}`
    case "PANTHER":
      return `http://www.pantree.org/node/annotationNode.jsp?id=${id}`
    case "PomBase":
      return `https://www.pombase.org/spombe/result/${id}`
    case "RGD":
      return `https://rgd.mcw.edu/rgdweb/report/gene/main.html?id=${id}`
    case "SGD":
      return `https://www.yeastgenome.org/locus/${id}`
    case "SO":
      return `http://www.sequenceontology.org/browser/current_svn/term/SO:${id}`
    case "TAIR":
      return `https://www.arabidopsis.org/servlets/TairObject?accession=${id}`
    case "UniProtKB":
      return `https://www.uniprot.org/uniprot/${id}`
    case "UniProtKB-KW":
      return `https://www.uniprot.org/keywords/${id}`
    case "UniProtKB-SubCell":
      return `https://www.uniprot.org/locations/${id}`
    case "WB":
      return `https://wormbase.org/search/cds/${id}`
    case "ZFIN":
      return `https://zfin.org/${id}`
    default:
      return "#"
  }
}

export default withLinkGenerator
