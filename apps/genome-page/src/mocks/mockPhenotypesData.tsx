import { ApolloError } from "@apollo/client"

interface IMockPhenotypesData {
  id: string
  strain: string
  characteristics: string
  phenotype: string
  reference: {
    author: string
    title: string
    name: string
    links: {
      dictyBase: string
      pubMed: string
      fullText: string
    }
  }
}

/**
 * Reference: http://dictybase.org/gene/DDB_G0288511/phenotypes
 */
const mockPhenotypesData: { phenotypes: IMockPhenotypesData[] } = {
  phenotypes: [
    {
      id: "DBS0236921",
      strain: "sadA",
      characteristics: "null mutant",
      phenotype: "aberrant actin filament organization",
      reference: {
        author: "Fey, Stephens, Titus & Chisholm (2002)",
        title: "SadA, a novel adhesion receptor in Dictyostelium.",
        name: "J Cell Biol 159:1109-19",
        links: {
          dictyBase: "http://dictybase.org/publication/2172",
          pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/12499361",
          fullText: "http://www.jcb.org/cgi/pmidlookup?view=full&pmid=12499361",
        },
      },
    },
    {
      id: "DBS0236921",
      strain: "sadA",
      characteristics: "null mutant",
      phenotype: "aberrant cell morphology",
      reference: {
        author: "Fey, Stephens, Titus & Chisholm (2002)",
        title: "SadA, a novel adhesion receptor in Dictyostelium.",
        name: "J Cell Biol 159:1109-19",
        links: {
          dictyBase: "http://dictybase.org/publication/2172",
          pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/12499361",
          fullText: "http://www.jcb.org/cgi/pmidlookup?view=full&pmid=12499361",
        },
      },
    },
    {
      id: "DBS0236921",
      strain: "sadA",
      characteristics: "null mutant",
      phenotype: "aberrant cytokinesis",
      reference: {
        author: "Fey, Stephens, Titus & Chisholm (2002)",
        title: "SadA, a novel adhesion receptor in Dictyostelium.",
        name: "J Cell Biol 159:1109-19",
        links: {
          dictyBase: "http://dictybase.org/publication/2172",
          pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/12499361",
          fullText: "http://www.jcb.org/cgi/pmidlookup?view=full&pmid=12499361",
        },
      },
    },
    {
      id: "DBS0236921",
      strain: "sadA",
      characteristics: "null mutant",
      phenotype: "abolished cell-substrate adhesion",
      reference: {
        author: "Tarantola, Bae, Fuller, Bodenschatz, Rappel & Loomis (2014)",
        title:
          "Cell Substratum Adhesion during Early Development of Dictyostelium discoideum.",
        name: "PLoS ONE 9:e106574",
        links: {
          dictyBase: "http://dictybase.org/publication/14229",
          pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/25247557",
          fullText: "http://dx.plos.org/10.1371/journal.pone.0106574",
        },
      },
    },
    {
      id: "DBS0236921",
      strain: "sadA",
      characteristics: "null mutant",
      phenotype: "abolished cell-substrate adhesion",
      reference: {
        author: "Fey, Stephens, Titus & Chisholm (2002)",
        title: "SadA, a novel adhesion receptor in Dictyostelium.",
        name: "J Cell Biol 159:1109-19",
        links: {
          dictyBase: "http://dictybase.org/publication/2172",
          pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/12499361",
          fullText: "http://www.jcb.org/cgi/pmidlookup?view=full&pmid=12499361",
        },
      },
    },
    {
      id: "DBS0236921",
      strain: "sadA",
      characteristics: "null mutant",
      phenotype: "decreased phagocytosis",
      reference: {
        author: "Fey, Stephens, Titus & Chisholm (2002)",
        title: "SadA, a novel adhesion receptor in Dictyostelium.",
        name: "J Cell Biol 159:1109-19",
        links: {
          dictyBase: "http://dictybase.org/publication/2172",
          pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/12499361",
          fullText: "http://www.jcb.org/cgi/pmidlookup?view=full&pmid=12499361",
        },
      },
    },
    {
      id: "DBS0236921",
      strain: "sadA",
      characteristics: "null mutant",
      phenotype: "increased growth rate",
      reference: {
        author: "Fey, Stephens, Titus & Chisholm (2002)",
        title: "SadA, a novel adhesion receptor in Dictyostelium.",
        name: "J Cell Biol 159:1109-19",
        links: {
          dictyBase: "http://dictybase.org/publication/2172",
          pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/12499361",
          fullText: "http://www.jcb.org/cgi/pmidlookup?view=full&pmid=12499361",
        },
      },
    },

    // Second...
    {
      id: "DBS0309040",
      strain: "sadA",
      characteristics: "null mutant",
      phenotype: "abolished protein localization to cell surface",
      reference: {
        author: "Froquet, le Coadic, Perrin, Cherix, Cornillon & Cosson (2012)",
        title:
          "TM9/Phg1 and SadA proteins control surface expression and stability of SibA adhesion molecules in Dictyostelium.",
        name: "Molecular biology of the cell :",
        links: {
          dictyBase: "http://dictybase.org/publication/11946",
          pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/22219373",
          fullText:
            "http://www.molbiolcell.org/cgi/pmidlookup?view=long&pmid=22219373",
        },
      },
    },
    {
      id: "DBS0309040",
      strain: "sadA",
      characteristics: "null mutant",
      phenotype: "decreased phagocytosis",
      reference: {
        author: "Froquet, le Coadic, Perrin, Cherix, Cornillon & Cosson (2012)",
        title:
          "TM9/Phg1 and SadA proteins control surface expression and stability of SibA adhesion molecules in Dictyostelium.",
        name: "Molecular biology of the cell :",
        links: {
          dictyBase: "http://dictybase.org/publication/11946",
          pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/22219373",
          fullText:
            "http://www.molbiolcell.org/cgi/pmidlookup?view=long&pmid=22219373",
        },
      },
    },
    {
      id: "DBS0309040",
      strain: "sadA",
      characteristics: "null mutant",
      phenotype: "decreased protein stabilization",
      reference: {
        author: "Froquet, le Coadic, Perrin, Cherix, Cornillon & Cosson (2012)",
        title:
          "TM9/Phg1 and SadA proteins control surface expression and stability of SibA adhesion molecules in Dictyostelium.",
        name: "Molecular biology of the cell :",
        links: {
          dictyBase: "http://dictybase.org/publication/11946",
          pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/22219373",
          fullText:
            "http://www.molbiolcell.org/cgi/pmidlookup?view=long&pmid=22219373",
        },
      },
    },

    // Third...
    {
      id: "DBS0350974",
      strain: "sadA-/[act15]:gpaH",
      characteristics: "multiple mutant, overexpressor, null mutant",
      phenotype: "aberrant cytokinesis",
      reference: {
        author: "Wu & Janetopoulos (2013)",
        title:
          "The G alpha subunit G?8 inhibits proliferation, promotes adhesion and regulates cell differentiation.",
        name: "Dev. Biol. :",
        links: {
          dictyBase: "http://dictybase.org/publication/13217",
          pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/23665473",
          fullText:
            "http://linkinghub.elsevier.com/retrieve/pii/S0012-1606(13)00229-7",
        },
      },
    },

    // Fourth...
  ],
}

export type { IMockPhenotypesData }
export default mockPhenotypesData
