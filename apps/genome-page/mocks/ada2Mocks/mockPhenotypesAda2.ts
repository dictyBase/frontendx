import { Strain } from "dicty-graphql-schema"

/**
 * Reference: http://dictybase.org/gene/DDB_G0288511/phenotypes
 */
const mockPhenotypesAda2: { strains: Strain[] } = {
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
              { last_name: "Fey", first_name: "", initials: "", rank: "" },
              { last_name: "Stephens", first_name: "", initials: "", rank: "" },
              { last_name: "Titus", first_name: "", initials: "", rank: "" },
              { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
            ],
            title: "SadA, a novel adhesion receptor in Dictyostelium.",
            journal: "J Cell Biol",
            pages: "159:1109-19",
            volume: "",
            pub_date: "",
          },
        },
        {
          phenotype: "aberrant cell morphology",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Fey", first_name: "", initials: "", rank: "" },
              { last_name: "Stephens", first_name: "", initials: "", rank: "" },
              { last_name: "Titus", first_name: "", initials: "", rank: "" },
              { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
            ],
            title: "SadA, a novel adhesion receptor in Dictyostelium.",
            journal: "J Cell Biol",
            pages: "159:1109-19",
            volume: "",
            pub_date: "",
          },
        },
        {
          phenotype: "aberrant cytokinesis",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Fey", first_name: "", initials: "", rank: "" },
              { last_name: "Stephens", first_name: "", initials: "", rank: "" },
              { last_name: "Titus", first_name: "", initials: "", rank: "" },
              { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
            ],
            title: "SadA, a novel adhesion receptor in Dictyostelium.",
            journal: "J Cell Biol",
            pages: "159:1109-19",
            volume: "",
            pub_date: "",
          },
        },
        {
          phenotype: "abolished cell-substrate adhesion",
          publication: {
            id: "25247557",
            authors: [
              {
                last_name: "Tarantola",
                first_name: "",
                initials: "",
                rank: "",
              },
              { last_name: "Bae", first_name: "", initials: "", rank: "" },
              { last_name: "Fuller", first_name: "", initials: "", rank: "" },
              {
                last_name: "Bodenschatz",
                first_name: "",
                initials: "",
                rank: "",
              },
              { last_name: "Rappel", first_name: "", initials: "", rank: "" },
              { last_name: "Loomis", first_name: "", initials: "", rank: "" },
            ],
            title:
              "Cell Substratum Adhesion during Early Development of Dictyostelium discoideum.",
            journal: "PLoS ONE",
            pages: "9:e106574",
            volume: "",
            pub_date: "",
          },
        },
        {
          phenotype: "decreased phagocytosis",
          publication: {
            id: "25247557",
            authors: [
              { last_name: "Fey", first_name: "", initials: "", rank: "" },
              { last_name: "Stephens", first_name: "", initials: "", rank: "" },
              { last_name: "Titus", first_name: "", initials: "", rank: "" },
              { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
            ],
            title: "SadA, a novel adhesion receptor in Dictyostelium.",
            journal: "J Cell Biol",
            pages: "159:1109-19",
            volume: "",
            pub_date: "",
          },
        },
        {
          phenotype: "increased growth rate",
          publication: {
            id: "25247557",
            authors: [
              { last_name: "Fey", first_name: "", initials: "", rank: "" },
              { last_name: "Stephens", first_name: "", initials: "", rank: "" },
              { last_name: "Titus", first_name: "", initials: "", rank: "" },
              { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
            ],
            title: "SadA, a novel adhesion receptor in Dictyostelium.",
            journal: "J Cell Biol",
            pages: "159:1109-19",
            volume: "",
            pub_date: "",
          },
        },
      ],
      in_stock: true,
    } as Strain,

    // Second
    {
      id: "DBS0309040",
      label: "sadA",
      characteristics: ["null mutant"],
      phenotypes: [
        {
          phenotype: "abolished protein localization to cell surface",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Froquet", first_name: "", initials: "", rank: "" },
              {
                last_name: "le Coadic",
                first_name: "",
                initials: "",
                rank: "",
              },
              { last_name: "Perrin", first_name: "", initials: "", rank: "" },
              { last_name: "Cherix", first_name: "", initials: "", rank: "" },
              {
                last_name: "Cornillon",
                first_name: "",
                initials: "",
                rank: "",
              },
              { last_name: "Cosson", first_name: "", initials: "", rank: "" },
            ],
            title:
              "TM9/Phg1 and SadA proteins control surface expression and stability of SibA adhesion molecules in Dictyostelium.",
            journal: "Molecular biology of the cell",
            pages: ":",
            volume: "",
            pub_date: "",
          },
        },
        {
          phenotype: "decreased phagocytosis",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Froquet", first_name: "", initials: "", rank: "" },
              {
                last_name: "le Coadic",
                first_name: "",
                initials: "",
                rank: "",
              },
              { last_name: "Perrin", first_name: "", initials: "", rank: "" },
              { last_name: "Cherix", first_name: "", initials: "", rank: "" },
              {
                last_name: "Cornillon",
                first_name: "",
                initials: "",
                rank: "",
              },
              { last_name: "Cosson", first_name: "", initials: "", rank: "" },
            ],
            title:
              "TM9/Phg1 and SadA proteins control surface expression and stability of SibA adhesion molecules in Dictyostelium.",
            journal: "Molecular biology of the cell",
            pages: ":",
            volume: "",
            pub_date: "",
          },
        },
        {
          phenotype: "decreased protein stabilization",
          publication: {
            id: "25247557",
            authors: [
              { last_name: "Froquet", first_name: "", initials: "", rank: "" },
              {
                last_name: "le Coadic",
                first_name: "",
                initials: "",
                rank: "",
              },
              { last_name: "Perrin", first_name: "", initials: "", rank: "" },
              { last_name: "Cherix", first_name: "", initials: "", rank: "" },
              {
                last_name: "Cornillon",
                first_name: "",
                initials: "",
                rank: "",
              },
              { last_name: "Cosson", first_name: "", initials: "", rank: "" },
            ],
            title:
              "TM9/Phg1 and SadA proteins control surface expression and stability of SibA adhesion molecules in Dictyostelium.",
            journal: "Molecular biology of the cell",
            pages: ":",
            volume: "",
            pub_date: "",
          },
        },
      ],
      in_stock: true,
    } as Strain,

    // Third
    {
      id: "DBS0350974",
      label: "sadA-/[act15]:gpaH",
      characteristics: ["multiple mutant", "overexpressor", "null mutant"],
      phenotypes: [
        {
          phenotype: "aberrant cytokinesis",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Wu", first_name: "", initials: "", rank: "" },
              {
                last_name: "Janetopoulos",
                first_name: "",
                initials: "",
                rank: "",
              },
            ],
            title:
              "The G alpha subunit G?8 inhibits proliferation, promotes adhesion and regulates cell differentiation.",
            journal: "Dev. Biol.",
            pages: ":",
            volume: "",
            pub_date: "",
          },
        },
      ],
      in_stock: false,
    } as Strain,

    // Fourth
    {
      id: "DBS0349790",
      label: "sadA-/[act15]:sadA(1-923):GFP",
      characteristics: ["null mutant", "multiple mutant"],
      phenotypes: [
        {
          phenotype: "decreased cell-substrate adhesion",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Kowal", first_name: "", initials: "", rank: "" },
              { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
            ],
            title:
              "Uncovering a role for the Dictyostelium discoideum SadA protein in cell-substrate adhesion: A Role for the Tail.",
            journal: "Eukaryotic cell",
            pages: ":",
            volume: "",
            pub_date: "",
          },
        },
      ],
      in_stock: false,
    } as Strain,

    // Fifth
    {
      id: "DBS0349792",
      label: "sadA-/[act15]:sadA(S924A/S925A):GFP",
      characteristics: ["null mutant", "multiple mutant"],
      phenotypes: [
        {
          phenotype: "wild type",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Kowal", first_name: "", initials: "", rank: "" },
              { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
            ],
            title:
              "Uncovering a role for the Dictyostelium discoideum SadA protein in cell-substrate adhesion: A Role for the Tail.",
            journal: "Eukaryotic cell",
            pages: ":",
            volume: "",
            pub_date: "",
          },
        },
      ],
      in_stock: false,
    } as Strain,

    // Sixth
    {
      id: "DBS0349791",
      label: "sadA-/[act15]:sadA(S924E/S925E):GFP",
      characteristics: ["null mutant", "multiple mutant"],
      phenotypes: [
        {
          phenotype: "decreased cell-substrate adhesion",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Kowal", first_name: "", initials: "", rank: "" },
              { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
            ],
            title:
              "Uncovering a role for the Dictyostelium discoideum SadA protein in cell-substrate adhesion: A Role for the Tail.",
            journal: "Eukaryotic cell",
            pages: ":",
            volume: "",
            pub_date: "",
          },
        },
      ],
      in_stock: false,
    } as Strain,

    // Seventh
    {
      id: "DBS0236922",
      label: "sadA-/[act15]:sadA:GFP",
      characteristics: ["null mutant", "rescued"],
      phenotypes: [
        {
          phenotype: "wild type",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Fey", first_name: "", initials: "", rank: "" },
              { last_name: "Stephens", first_name: "", initials: "", rank: "" },
              { last_name: "Titus", first_name: "", initials: "", rank: "" },
              { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
            ],
            title: "SadA, a novel adhesion receptor in Dictyostelium.",
            journal: " J Cell Biol",
            pages: "159:1109-19",
            volume: "",
            pub_date: "",
          },
        },
      ],
      in_stock: false,
    } as Strain,

    // Eighth
    {
      id: "DBS0349793",
      label: "[act15]:sadA(921-952)",
      characteristics: ["dominant negative mutant", "overexpressor"],
      phenotypes: [
        {
          phenotype: "decreased cell-substrate adhesion",
          publication: {
            id: "12499361",
            authors: [
              { last_name: "Kowal", first_name: "", initials: "", rank: "" },
              { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
            ],
            title:
              "Uncovering a role for the Dictyostelium discoideum SadA protein in cell-substrate adhesion: A Role for the Tail.",
            journal: "Eukaryotic cell",
            pages: ":",
            volume: "",
            pub_date: "",
          },
        },
      ],
      in_stock: false,
    } as Strain,
  ],
}

export default mockPhenotypesAda2
