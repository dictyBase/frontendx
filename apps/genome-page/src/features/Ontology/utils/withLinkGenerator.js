// @flow

/**
 * This is a helper function to generate links for the With column of DisplayTable.
 */

const withLinkGenerator = (id: string) => {
  if (id.slice(0, 3) === "KW-") {
    return `https://www.uniprot.org/keywords/${id}`
  }

  if (id.slice(0, 3) === "SL-") {
    return `https://www.uniprot.org/locations/${id}`
  }

  if (id.slice(0, 3) === "IPR") {
    return `http://www.ebi.ac.uk/interpro/entry/${id}`
  }

  if (id.slice(0, 3) === "PTN") {
    return `http://www.pantree.org/node/annotationNode.jsp?id=${id}`
  }

  if (id.slice(0, 1) === "0") {
    return `https://www.ebi.ac.uk/QuickGO/term/GO:${id}`
  }

  if (id.slice(0, 1) === "Q" || id.slice(0, 1) === "P") {
    return `https://www.uniprot.org/uniprot/${id}`
  }

  if (id.slice(0, 3) === "DDB") {
    return `/${id}`
  }

  return "#"
}

export default withLinkGenerator
