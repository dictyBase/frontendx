// this array is just used to demo different genes
const links = [
  {
    type: "regular",
    id: "DDB_G0272608",
  },
  {
    type: "regular",
    id: "DDB_G0288511",
  },
  {
    type: "regular",
    id: "DDB_G0269114",
  },
  {
    type: "regular",
    id: "DDB_G0286355",
  },
  {
    type: "regular",
    id: "DDB_G0277399",
  },
  {
    type: "complex",
    id: "DDB_G0280531",
  },
  {
    type: "complex",
    id: "DDB_G0276267",
  },
  {
    type: "complex",
    id: "DDB_G0281211",
  },
  {
    type: "complex",
    id: "DDB_G0277589",
  },
  {
    type: "name",
    id: "sadA",
  },
  {
    type: "name",
    id: "piaA",
  },
  {
    type: "name",
    id: "svkA",
  },
  {
    type: "name",
    id: "ripA",
  },
  {
    type: "name",
    id: "far1",
  },
]

const data = [
  {
    type: "biological_process",
    id: "GO:0006909",
    attributes: {
      date: "20180721",
      evidence_code: "IEA",
      goterm: "phagocytosis",
      qualifier: "involved_in",
      publication: "GO_REF:0000037",
      with: [{ connectedXrefs: [{ db: "UniProtKB-KW", id: "KW-0581" }] }],
      extensions: null,
      assigned_by: "UniProt",
    },
  },
  {
    type: "molecular_function",
    id: "GO:0005515",
    attributes: {
      date: "20110913",
      evidence_code: "IPI",
      goterm: "protein binding",
      qualifier: "enables",
      publication: "PMID:21441344",
      with: [{ connectedXrefs: [{ db: "UniProtKB", id: "Q54HG2" }] }],
      extensions: null,
      assigned_by: "dictyBase",
    },
  },
  {
    type: "biological_process",
    id: "GO:0007155",
    attributes: {
      date: "20180721",
      evidence_code: "IEA",
      goterm: "cell adhesion",
      qualifier: "involved_in",
      publication: "GO_REF:0000037",
      with: [{ connectedXrefs: [{ db: "UniProtKB-KW", id: "KW-0130" }] }],
      extensions: null,
      assigned_by: "UniProt",
    },
  },
  {
    type: "cellular_component",
    id: "GO:0005886",
    attributes: {
      date: "20180721",
      evidence_code: "IEA",
      goterm: "plasma membrane",
      qualifier: "part_of",
      publication: "GO_REF:0000037",
      with: [{ connectedXrefs: [{ db: "UniProtKB-KW", id: "KW-1003" }] }],
      extensions: null,
      assigned_by: "UniProt",
    },
  },
  {
    type: "cellular_component",
    id: "GO:0005886",
    attributes: {
      date: "20180721",
      evidence_code: "IEA",
      goterm: "plasma membrane",
      qualifier: "part_of",
      publication: "GO_REF:0000039",
      with: [{ connectedXrefs: [{ db: "UniProtKB-SubCell", id: "SL-0039" }] }],
      extensions: null,
      assigned_by: "UniProt",
    },
  },
  {
    type: "cellular_component",
    id: "GO:0005887",
    attributes: {
      date: "20160811",
      evidence_code: "IBA",
      goterm: "integral component of plasma membrane",
      qualifier: "part_of",
      publication: "PAINT_REF:11219",
      with: [{ connectedXrefs: [{ db: "PANTHER", id: "PTN001677757" }] }],
      extensions: null,
      assigned_by: "GO_Central",
    },
  },
  {
    type: "cellular_component",
    id: "GO:0016020",
    attributes: {
      date: "20180721",
      evidence_code: "IEA",
      goterm: "membrane",
      qualifier: "part_of",
      publication: "GO_REF:0000037",
      with: [{ connectedXrefs: [{ db: "UniProtKB-KW", id: "KW-0472" }] }],
      extensions: null,
      assigned_by: "UniProt",
    },
  },
  {
    type: "cellular_component",
    id: "GO:0016021",
    attributes: {
      date: "20180721",
      evidence_code: "IEA",
      goterm: "integral component of membrane",
      qualifier: "part_of",
      publication: "GO_REF:0000037",
      with: [{ connectedXrefs: [{ db: "UniProtKB-KW", id: "KW-0812" }] }],
      extensions: null,
      assigned_by: "UniProt",
    },
  },
]

export { data, links }
