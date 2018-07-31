import GoaPanel from "features/Summary/Panels/GoaPanel"

// right now these are all mapped to the same component
// but will be changed as panels are created
export const panelLabels = {
  general: {
    title: "General Information",
    component: GoaPanel,
  },
  genomic: {
    title: "Genomic Information",
    component: GoaPanel,
  },
  protein: {
    title: "Gene Product Information",
    component: GoaPanel,
  },
  goa: {
    title: "Gene Ontology Annotations",
    component: GoaPanel,
  },
  dbxrefs: {
    title: "Links",
    component: GoaPanel,
  },
  summary: {
    title: "Summary",
    component: GoaPanel,
  },
  publication: {
    title: "Latest References",
    component: GoaPanel,
  },
}
