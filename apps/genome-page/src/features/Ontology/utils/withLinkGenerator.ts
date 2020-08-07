const convertNameToURL = (name: string, id: string) => {
  if (name.includes(" ")) {
    return `https://www.ebi.ac.uk/QuickGO/term/GO:${id}`
  }
  if (name.match(/^([A-Z0-9]*$)/)) {
    return `https://www.uniprot.org/uniprot/${id}`
  }
  return `/gene/${name}`
}

/**
 * This is a helper function to generate links for the With and Extensions columns of the GOA table.
 */

const withLinkGenerator = (id: string, db: string, name?: string) => {
  if (name) return convertNameToURL(name, id)

  switch (db) {
    case "CHEBI":
      return `https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:${id}`
    case "DDANAT":
      return `https://www.ebi.ac.uk/ols/ontologies/ddanat/terms?iri=http%3A%2F%2Fpurl.obolibrary.org%2Fobo%2FDDANAT_${id}`
    case "DDB":
      return `/gene/${id}`
    case "dictyBase":
      return `/gene/${id}`
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
