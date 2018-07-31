import GoaPanel from "features/Summary/Panels/GoaPanel"

export const panelLabels = {
  general: "General Information",
  genomic: "Genomic Information",
  protein: "Gene Product Information",
  goa: "Gene Ontology Annotations",
  dbxrefs: "Links",
  summary: "Summary",
  publication: "Latest References",
}

export const panelLabelsWithComponents = {
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
