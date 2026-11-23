/* eslint-disable unicorn/no-null */
/* eslint-disable sonarjs/no-duplicate-string */
import { GoAnnotation } from "dicty-graphql-schema"

const EXPECTED_GENERAL_INFO = {
  id: "DDB_G0269114",
  name_description: ["num = NUcleoMorphin"],
  gene_product: "nucleomorphin\ncalmodulin-binding protein",
  synonyms: ["cmbA", "numB", "numA1", "numA2", "numC", "numA3"],
  description:
    "there are three reported numA isoforms, the largest 97 kDa numA2, the 66 kDa numA1, and the smallest 43 kDA numA3; all isoforms contain a nuclear localization signal, a CaM binding domain, and a DEED (D/E repeat) domain; the larger numA2 contains an additional BRCT (Breast Cancer C_Terminal) domain",
}

const EXPECTED_NUM_A_GOAS: Array<GoAnnotation> = [
  {
    id: "UniProtKB:Q54RF4!1",
    type: "molecular_function",
    date: "20200318",
    go_term: "protein binding",
    evidence_code: "IPI",
    qualifier: "enables",
    publication: "PMID:11483410",
    assigned_by: "dictyBase",
    with: [{ id: "Q54RF4", db: "UniProtKB", name: "", __typename: "With" }],
    extensions: null,
    __typename: "GOAnnotation",
  },
  {
    id: "UniProtKB:Q54RF4!2",
    type: "biological_process",
    date: "20200318",
    go_term: "regulation of mitotic nuclear division",
    evidence_code: "IMP",
    qualifier: "involved_in",
    publication: "PMID:11483410",
    assigned_by: "dictyBase",
    with: null,
    extensions: null,
    __typename: "GOAnnotation",
  },
  {
    id: "UniProtKB:Q54RF4!3",
    type: "cellular_component",
    date: "20200318",
    go_term: "nuclear envelope",
    evidence_code: "IDA",
    qualifier: "located_in",
    publication: "PMID:11483410",
    assigned_by: "dictyBase",
    with: null,
    extensions: [
      {
        id: "0000089",
        db: "GO",
        relation: "existence_starts_and_ends_during",
        name: "",
        __typename: "Extension",
      },
    ],
    __typename: "GOAnnotation",
  },
]

const EXPECTED_PHG1A_REFERENCE = {
  authors: [
    { last_name: "Varas", rank: "0" },
    { last_name: "Riquelme-Barrios", rank: "1" },
    { last_name: "Valenzuela", rank: "2" },
    { last_name: "Marcoleta", rank: "3" },
    { last_name: "Berríos-Pastén", rank: "4" },
    { last_name: "Santiviago", rank: "5" },
    { last_name: "Chávez", rank: "6" },
  ],
  doi: "10.3389/fcimb.2018.00008",
  id: "29441327",
  issue: "",
  journal: "Frontiers in cellular and infection microbiology",
  pages: "8",
  pub_date: "2018-01-30T00:00:00.000Z",
  pub_type: "Research Support, Non-U.S. Gov't",
  related_genes: [
    { id: "DDB_G0290009", name: "spr" },
    { id: "DDB_G0288481", name: "gchA" },
    { id: "DDB_G0267444", name: "phg1A" },
    { id: "DDB_G0279095", name: "ptsA" },
    { id: "DDB_G0267630", name: "kil1" },
  ],
  source: "MED",
  title:
    "Inorganic Polyphosphate Is Essential for <i>Salmonella</i> Typhimurium Virulence and Survival in <i>Dictyostelium discoideum</i>.",
  volume: "8",
}

const EXPECTED_COR_A_STRAIN = {
  characteristics: [
    "null mutant",
    "axenic",
    "drug resistant",
    "neomycin resistant",
  ],
  id: "DBS0236174",
  in_stock: true,
  label: "corA-",
  phenotypes: [
    {
      phenotype: "increased myosin II assembly",
      publication: {
        authors: [
          { last_name: "Swaminathan", rank: "0" },
          { last_name: "Müller-Taubenberger", rank: "1" },
          { last_name: "Faix", rank: "2" },
          { last_name: "Rivero", rank: "3" },
          { last_name: "Noegel", rank: "4" },
        ],
        id: "24347642",
        journal:
          "Proceedings of the National Academy of Sciences of the United States of America",
        pages: "",
        pub_date: "2014-01-01T00:00:00.000Z",
        title:
          "A Cdc42- and Rac-interactive binding (CRIB) domain mediates functions of coronin.",
        volume: "",
      },
    },
    {
      phenotype: "decreased growth rate",
      publication: {
        authors: [
          { last_name: "de Hostos", rank: "0" },
          { last_name: "Rehfuess", rank: "1" },
          { last_name: "Bradtke", rank: "2" },
          { last_name: "Waddell", rank: "3" },
          { last_name: "Albrecht", rank: "4" },
          { last_name: "Murphy", rank: "5" },
          { last_name: "Gerisch", rank: "6" },
        ],
        id: "8380174",
        journal: "The Journal of cell biology",
        pages: "",
        pub_date: "1993-01-01T00:00:00.000Z",
        title:
          "Dictyostelium mutants lacking the cytoskeletal protein coronin are defective in cytokinesis and cell motility.",
        volume: "",
      },
    },
    {
      phenotype: "decreased cell motility",
      publication: {
        authors: [
          { last_name: "de Hostos", rank: "0" },
          { last_name: "Rehfuess", rank: "1" },
          { last_name: "Bradtke", rank: "2" },
          { last_name: "Waddell", rank: "3" },
          { last_name: "Albrecht", rank: "4" },
          { last_name: "Murphy", rank: "5" },
          { last_name: "Gerisch", rank: "6" },
        ],
        id: "8380174",
        journal: "The Journal of cell biology",
        pages: "",
        pub_date: "1993-01-01T00:00:00.000Z",
        title:
          "Dictyostelium mutants lacking the cytoskeletal protein coronin are defective in cytokinesis and cell motility.",
        volume: "",
      },
    },
    {
      phenotype: "aberrant cytokinesis",
      publication: {
        authors: [
          { last_name: "de Hostos", rank: "0" },
          { last_name: "Rehfuess", rank: "1" },
          { last_name: "Bradtke", rank: "2" },
          { last_name: "Waddell", rank: "3" },
          { last_name: "Albrecht", rank: "4" },
          { last_name: "Murphy", rank: "5" },
          { last_name: "Gerisch", rank: "6" },
        ],
        id: "8380174",
        journal: "The Journal of cell biology",
        pages: "",
        pub_date: "1993-01-01T00:00:00.000Z",
        title:
          "Dictyostelium mutants lacking the cytoskeletal protein coronin are defective in cytokinesis and cell motility.",
        volume: "",
      },
    },
  ],
}

const EXPECTED_COR_A_STRAINS = [
  {
    id: "DBS0236171",
    label: "corA-",
    characteristics: ["null mutant"],
    in_stock: true,
    phenotypes: [],
  },
  {
    id: "DBS0236172",
    label: "corA-",
    characteristics: ["null mutant"],
    in_stock: true,
    phenotypes: EXPECTED_COR_A_STRAIN.phenotypes.slice(0, 1),
  },
  {
    id: "DBS0236173",
    label: "corA-",
    characteristics: ["null mutant"],
    in_stock: true,
    phenotypes: EXPECTED_COR_A_STRAIN.phenotypes.slice(0, 1),
  },
  EXPECTED_COR_A_STRAIN,
]

const EXPECTED_NUM_A_REFERENCE = {
  authors: [
    { last_name: "Gauthier", rank: "0" },
    { last_name: "O'Day", rank: "1" },
  ],
  doi: "10.1016/s0898-6568(01)00187-5",
  id: "11483410",
  issue: "8",
  journal: "Cellular signalling",
  pages: "575-584",
  pub_date: "2001-08-01T00:00:00.000Z",
  pub_type: "Research Support, Non-U.S. Gov't",
  related_genes: [
    { id: "DDB_G0269116", name: "cmbC" },
    { id: "DDB_G0288131", name: "cmbB" },
    { id: "DDB_G0269114", name: "numA" },
    { id: "DDB_G0279407", name: "calA" },
    { id: "DDB_G0270001", name: "gene1" },
    { id: "DDB_G0270002", name: "gene2" },
    { id: "DDB_G0270003", name: "gene3" },
    { id: "DDB_G0270004", name: "gene4" },
    { id: "DDB_G0270005", name: "gene5" },
    { id: "DDB_G0270006", name: "gene6" },
    { id: "DDB_G0270007", name: "gene7" },
    { id: "DDB_G0270008", name: "gene8" },
  ],
  source: "MED",
  title:
    "Detection of calmodulin-binding proteins and calmodulin-dependent phosphorylation linked to calmodulin-dependent chemotaxis to folic and cAMP in Dictyostelium.",
  volume: "13",
}

const EXPECTED_NUM_A_REFERENCES = [
  {
    authors: [{ last_name: "Plattner", rank: "0" }],
    doi: "10.1000/test-newest",
    id: "30000001",
    issue: "1",
    journal: "Journal of Cell Biology",
    pages: "1-10",
    pub_date: "2020-04-01T00:00:00.000Z",
    pub_type: "Journal Article",
    related_genes: [{ id: "DDB_G0269114", name: "numA" }],
    source: "MED",
    title: "Signalling and sex in the social amoeba Dictyostelium.",
    volume: "1",
  },
  {
    authors: [{ last_name: "Myre", rank: "0" }],
    doi: "10.1000/test-alpha",
    id: "30000002",
    issue: "1",
    journal: "Biochimica et biophysica acta",
    pages: "11-20",
    pub_date: "2010-05-01T00:00:00.000Z",
    pub_type: "Journal Article",
    related_genes: [{ id: "DDB_G0269114", name: "numA" }],
    source: "MED",
    title:
      "An N-terminal nuclear localization signal in Dictyostelium calmodulin-binding nucleomorphin.",
    volume: "2",
  },
  ...Array.from({ length: 14 }, (_, index) => ({
    authors: [{ last_name: `Author${index + 1}`, rank: "0" }],
    doi: `10.1000/test-${index + 1}`,
    id: `200000${index + 10}`,
    issue: "1",
    journal: "Dictyostelium Research",
    pages: "100-110",
    pub_date: `20${String(18 - (index % 10)).padStart(
      2,
      "0",
    )}-06-15T00:00:00.000Z`,
    pub_type: "Journal Article",
    related_genes: [{ id: "DDB_G0269114", name: "numA" }],
    source: "MED",
    title: `Characterization of nucleomorphin isoform ${index + 1}.`,
    volume: "5",
  })),
  EXPECTED_NUM_A_REFERENCE,
]

export {
  EXPECTED_GENERAL_INFO,
  EXPECTED_NUM_A_GOAS,
  EXPECTED_PHG1A_REFERENCE,
  EXPECTED_COR_A_STRAIN,
  EXPECTED_COR_A_STRAINS,
  EXPECTED_NUM_A_REFERENCE,
  EXPECTED_NUM_A_REFERENCES,
}
