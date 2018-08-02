// @flow

/**
 * This is a helper function to generate links to publications.
 */

const pubLinkGenerator = (id: string) => {
  let idnum

  if (id.includes("PMID")) {
    idnum = id.slice(5)
    return `https://www.ncbi.nlm.nih.gov/pubmed/${idnum}`
  }

  if (id.includes("GO_REF")) {
    idnum = id.slice(7)
    return `https://github.com/geneontology/go-site/blob/master/metadata/gorefs/goref-${idnum}.md`
  }

  if (id.includes("PAINT_REF")) {
    idnum = id.slice(10)
    return `http://www.pantherdb.org/panther/family.do?clsAccession=PTHR${idnum}`
  }

  return id
}

export default pubLinkGenerator
