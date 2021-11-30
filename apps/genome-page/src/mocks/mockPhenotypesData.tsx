import { Strain } from "dicty-graphql-schema"

/**
 * Reference: http://dictybase.org/gene/DDB_G0288511/phenotypes
 */
const mockPhenotypesData: { strains: Strain[] } = {
  strains: [
    {
      id: "DBS0236921",
      label: "sadA",
      characteristics: ["null mutant"],
      phenotypes: [
        {
          phenotype: "aberrant actin filament organization",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Fey" },
              { last_name: "Stephens" },
              { last_name: "Titus" },
              { last_name: "Chisholm" },
            ],
            title: "SadA, a novel adhesion receptor in Dictyostelium.",
            journal: "J Cell Biol",
            pub_date: "159:1109-19",
          },
        },
        {
          phenotype: "aberrant cell morphology",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Fey" },
              { last_name: "Stephens" },
              { last_name: "Titus" },
              { last_name: "Chisholm" },
            ],
            title: "SadA, a novel adhesion receptor in Dictyostelium.",
            journal: "J Cell Biol",
            pub_date: "159:1109-19",
          },
        },
        {
          phenotype: "aberrant cytokinesis",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Fey" },
              { last_name: "Stephens" },
              { last_name: "Titus" },
              { last_name: "Chisholm" },
            ],
            title: "SadA, a novel adhesion receptor in Dictyostelium.",
            journal: "J Cell Biol",
            pub_date: "159:1109-19",
          },
        },
        {
          phenotype: "abolished cell-substrate adhesion",
          publication: {
            id: "25247557",
            authors: [
              { last_name: "Tarantola" },
              { last_name: "Bae" },
              { last_name: "Fuller" },
              { last_name: "Bodenschatz" },
              { last_name: "Rappel" },
              { last_name: "Loomis" },
            ],
            title:
              "Cell Substratum Adhesion during Early Development of Dictyostelium discoideum.",
            journal: "PLoS ONE",
            pub_date: "9:e106574",
          },
        },
      ],
      in_stock: false,
    } as Strain,
    // {
    //   id: "DBS0236921",
    //   strain: "sadA",
    //   characteristics: "null mutant",
    //   phenotype: "abolished cell-substrate adhesion",
    //   reference: {
    //     author: "Fey, Stephens, Titus & Chisholm (2002)",
    //     title: "SadA, a novel adhesion receptor in Dictyostelium.",
    //     name: "J Cell Biol 159:1109-19",
    //     links: {
    //       dictyBase: "http://dictybase.org/publication/2172",
    //       pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/12499361",
    //       fullText: "http://www.jcb.org/cgi/pmidlookup?view=full&pmid=12499361",
    //     },
    //   },
    // },
    // {
    //   id: "DBS0236921",
    //   strain: "sadA",
    //   characteristics: "null mutant",
    //   phenotype: "decreased phagocytosis",
    //   reference: {
    //     author: "Fey, Stephens, Titus & Chisholm (2002)",
    //     title: "SadA, a novel adhesion receptor in Dictyostelium.",
    //     name: "J Cell Biol 159:1109-19",
    //     links: {
    //       dictyBase: "http://dictybase.org/publication/2172",
    //       pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/12499361",
    //       fullText: "http://www.jcb.org/cgi/pmidlookup?view=full&pmid=12499361",
    //     },
    //   },
    // },
    // {
    //   id: "DBS0236921",
    //   strain: "sadA",
    //   characteristics: "null mutant",
    //   phenotype: "increased growth rate",
    //   reference: {
    //     author: "Fey, Stephens, Titus & Chisholm (2002)",
    //     title: "SadA, a novel adhesion receptor in Dictyostelium.",
    //     name: "J Cell Biol 159:1109-19",
    //     links: {
    //       dictyBase: "http://dictybase.org/publication/2172",
    //       pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/12499361",
    //       fullText: "http://www.jcb.org/cgi/pmidlookup?view=full&pmid=12499361",
    //     },
    //   },
    // },

    // // Second...
    // {
    //   id: "DBS0309040",
    //   strain: "sadA",
    //   characteristics: "null mutant",
    //   phenotype: "abolished protein localization to cell surface",
    //   reference: {
    //     author: "Froquet, le Coadic, Perrin, Cherix, Cornillon & Cosson (2012)",
    //     title:
    //       "TM9/Phg1 and SadA proteins control surface expression and stability of SibA adhesion molecules in Dictyostelium.",
    //     name: "Molecular biology of the cell :",
    //     links: {
    //       dictyBase: "http://dictybase.org/publication/11946",
    //       pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/22219373",
    //       fullText:
    //         "http://www.molbiolcell.org/cgi/pmidlookup?view=long&pmid=22219373",
    //     },
    //   },
    // },
    // {
    //   id: "DBS0309040",
    //   strain: "sadA",
    //   characteristics: "null mutant",
    //   phenotype: "decreased phagocytosis",
    //   reference: {
    //     author: "Froquet, le Coadic, Perrin, Cherix, Cornillon & Cosson (2012)",
    //     title:
    //       "TM9/Phg1 and SadA proteins control surface expression and stability of SibA adhesion molecules in Dictyostelium.",
    //     name: "Molecular biology of the cell :",
    //     links: {
    //       dictyBase: "http://dictybase.org/publication/11946",
    //       pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/22219373",
    //       fullText:
    //         "http://www.molbiolcell.org/cgi/pmidlookup?view=long&pmid=22219373",
    //     },
    //   },
    // },
    // {
    //   id: "DBS0309040",
    //   strain: "sadA",
    //   characteristics: "null mutant",
    //   phenotype: "decreased protein stabilization",
    //   reference: {
    //     author: "Froquet, le Coadic, Perrin, Cherix, Cornillon & Cosson (2012)",
    //     title:
    //       "TM9/Phg1 and SadA proteins control surface expression and stability of SibA adhesion molecules in Dictyostelium.",
    //     name: "Molecular biology of the cell :",
    //     links: {
    //       dictyBase: "http://dictybase.org/publication/11946",
    //       pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/22219373",
    //       fullText:
    //         "http://www.molbiolcell.org/cgi/pmidlookup?view=long&pmid=22219373",
    //     },
    //   },
    // },

    // // Third...
    // {
    //   id: "DBS0350974",
    //   strain: "sadA-/[act15]:gpaH",
    //   characteristics: "multiple mutant, overexpressor, null mutant",
    //   phenotype: "aberrant cytokinesis",
    //   reference: {
    //     author: "Wu & Janetopoulos (2013)",
    //     title:
    //       "The G alpha subunit G?8 inhibits proliferation, promotes adhesion and regulates cell differentiation.",
    //     name: "Dev. Biol. :",
    //     links: {
    //       dictyBase: "http://dictybase.org/publication/13217",
    //       pubMed: "http://view.ncbi.nlm.nih.gov/pubmed/23665473",
    //       fullText:
    //         "http://linkinghub.elsevier.com/retrieve/pii/S0012-1606(13)00229-7",
    //     },
    //   },
    // },

    // // Fourth...
  ],
}

export default mockPhenotypesData
