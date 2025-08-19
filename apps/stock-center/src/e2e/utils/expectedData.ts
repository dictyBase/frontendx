/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable unicorn/no-null */
const EXPECTED_STRAIN = {
  id: "DBS0350877",
  label: "piaA(G917D)/hephA-",
  summary:
    "suppressor mutant; deletion of hephA suppresses the agg- phenotype of the piaA(G917D) (HSB1) mutant",
  species: "Dictyostelium discoideum",
  parent: null,
  depositor: {
    first_name: "Dicty",
    last_name: "Stock Center",
  },
  plasmid: "",
  dbxrefs: null,
  publications: [
    {
      id: "28049717",
      pub_date: "2017-01-03T00:00:00.000Z",
      title:
        "A new HECT ubiquitin ligase regulating chemotaxis and development in Dictyostelium discoideum.",
      journal: "Journal of cell science",
      volume: "130",
      pages: "551-562",
      doi: "10.1242/jcs.194225",
      authors: [
        { last_name: "Pergolizzi" },
        { last_name: "Bracco" },
        { last_name: "Bozzaro" },
      ],
    },
  ],
  genes: [{ name: "" }],
  in_stock: true,
  systematic_name: "DBS0350877",
  genotypes: ["axeA2,axeB2,axeC2,piaA(G917D),hephA-,bsRcas],bsR"],
  mutagenesis_method: "Homologous Recombination",
  genetic_modification: "endogenous insertion",
  names: ["HSB1\u003Csup\u003EHectPH1-Ko\u003C/sup\u003E"],
  characteristics: [
    "temperature sensitive mutant",
    "axenic",
    "suppressor",
    "multiple mutant",
    "blasticidin resistant",
  ],
  phenotypes: [
    {
      phenotype: "increased response to cAMP",
      note: "higher sensitivity towards cAMP at concentrations below 100 nM, compared to AX2 parent",
      assay: null,
      environment: null,
      publication: {
        id: "28049717",
        pub_date: "2017-01-03T00:00:00.000Z",
        title:
          "A new HECT ubiquitin ligase regulating chemotaxis and development in Dictyostelium discoideum.",
        journal: "Journal of cell science",
        volume: "130",
        pages: "551-562",
        authors: [
          { last_name: "Pergolizzi" },
          { last_name: "Bracco" },
          { last_name: "Bozzaro" },
        ],
      },
    },
    {
      phenotype: "decreased cAMP level",
      note: "cAMP fails to accumulate after 5 hrs of cAMP stimulation, whereas it increases sharply in wt",
      assay: "intracellular measurement",
      environment: "during cAMP stimulation",
      publication: {
        id: "28049717",
        pub_date: "2017-01-03T00:00:00.000Z",
        title:
          "A new HECT ubiquitin ligase regulating chemotaxis and development in Dictyostelium discoideum.",
        journal: "Journal of cell science",
        volume: "130",
        pages: "551-562",
        authors: [
          { last_name: "Pergolizzi" },
          { last_name: "Bracco" },
          { last_name: "Bozzaro" },
        ],
      },
    },
    {
      phenotype: "wild type",
      note: "the hephA knockout rescues the piaA(G917D) agg- and PKB misregulation phenotypes",
      assay: "fruiting body development",
      environment: "on bacterial plate",
      publication: {
        id: "28049717",
        pub_date: "2017-01-03T00:00:00.000Z",
        title:
          "A new HECT ubiquitin ligase regulating chemotaxis and development in Dictyostelium discoideum.",
        journal: "Journal of cell science",
        volume: "130",
        pages: "551-562",
        authors: [
          { last_name: "Pergolizzi" },
          { last_name: "Bracco" },
          { last_name: "Bozzaro" },
        ],
      },
    },
  ],
}

export { EXPECTED_STRAIN }
