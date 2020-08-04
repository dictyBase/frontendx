const mockData = {
  data: {
    gene: {
      id: "DDB_G123456",
      name: "sadA",
      goas: [
        {
          id: "UniProtKB:Q8I7T3!118751970",
          type: "cellular_component",
          date: "20181129",
          evidence_code: "IDA",
          go_term: "cell cortex",
          qualifier: "colocalizes_with",
          publication: "PMID:12499361",
          assigned_by: "dictyBase",
          with: [],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!118751971",
          type: "biological_process",
          date: "20030723",
          evidence_code: "IMP",
          go_term: "actin filament organization",
          qualifier: "acts_upstream_of_or_within",
          publication: "PMID:12499361",
          assigned_by: "dictyBase",
          with: [],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!118751972",
          type: "cellular_component",
          date: "20181129",
          evidence_code: "IDA",
          go_term: "actin cytoskeleton",
          qualifier: "colocalizes_with",
          publication: "PMID:21441344",
          assigned_by: "dictyBase",
          with: [],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!118751973",
          type: "biological_process",
          date: "20120926",
          evidence_code: "IMP",
          go_term: "phagocytosis",
          qualifier: "acts_upstream_of_or_within",
          publication: "PMID:22219373",
          assigned_by: "dictyBase",
          with: [],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!118751974",
          type: "biological_process",
          date: "20030723",
          evidence_code: "IMP",
          go_term: "phagocytosis",
          qualifier: "acts_upstream_of_or_within",
          publication: "PMID:12499361",
          assigned_by: "dictyBase",
          with: [],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!118751975",
          type: "cellular_component",
          date: "20181129",
          evidence_code: "IDA",
          go_term: "plasma membrane",
          qualifier: "part_of",
          publication: "PMID:21441344",
          assigned_by: "dictyBase",
          with: [],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!118751976",
          type: "biological_process",
          date: "20051219",
          evidence_code: "IMP",
          go_term: "cell morphogenesis",
          qualifier: "acts_upstream_of_or_within",
          publication: "PMID:12499361",
          assigned_by: "dictyBase",
          with: [],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!118751977",
          type: "biological_process",
          date: "20120926",
          evidence_code: "IMP",
          go_term: "protein stabilization",
          qualifier: "acts_upstream_of_or_within",
          publication: "PMID:22219373",
          assigned_by: "dictyBase",
          with: [],
          extensions: [
            {
              id: "Q54KF7",
              db: "UniProtKB",
              relation: "has_input",
              name: "",
            },
          ],
        },
        {
          id: "UniProtKB:Q8I7T3!118751978",
          type: "biological_process",
          date: "20110914",
          evidence_code: "IMP",
          go_term: "cell-substrate adhesion",
          qualifier: "acts_upstream_of_or_within",
          publication: "PMID:21441344",
          assigned_by: "dictyBase",
          with: [],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!118751979",
          type: "biological_process",
          date: "20050922",
          evidence_code: "IMP",
          go_term: "cell-substrate adhesion",
          qualifier: "acts_upstream_of_or_within",
          publication: "PMID:12499361",
          assigned_by: "dictyBase",
          with: [],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!118751980",
          type: "molecular_function",
          date: "20181129",
          evidence_code: "IPI",
          go_term: "protein binding",
          qualifier: "enables",
          publication: "PMID:21441344",
          assigned_by: "dictyBase",
          with: [
            {
              id: "Q54HG2",
              db: "UniProtKB",
              name: "ctxA",
            },
          ],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!118751981",
          type: "biological_process",
          date: "20120522",
          evidence_code: "IMP",
          go_term: "mitotic cytokinesis",
          qualifier: "acts_upstream_of_or_within",
          publication: "PMID:12499361",
          assigned_by: "dictyBase",
          with: [],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!118751982",
          type: "biological_process",
          date: "20120926",
          evidence_code: "IMP",
          go_term: "protein localization to cell surface",
          qualifier: "acts_upstream_of_or_within",
          publication: "PMID:22219373",
          assigned_by: "dictyBase",
          with: [],
          extensions: [
            {
              id: "Q54KF7",
              db: "UniProtKB",
              relation: "has_input",
              name: "",
            },
          ],
        },
        {
          id: "UniProtKB:Q8I7T3!115718646",
          type: "biological_process",
          date: "20200718",
          evidence_code: "IEA",
          go_term: "phagocytosis",
          qualifier: "involved_in",
          publication: "GO_REF:0000043",
          assigned_by: "UniProt",
          with: [
            {
              id: "KW-0581",
              db: "UniProtKB-KW",
              name: "",
            },
          ],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!115735638",
          type: "cellular_component",
          date: "20200718",
          evidence_code: "IEA",
          go_term: "membrane",
          qualifier: "part_of",
          publication: "GO_REF:0000043",
          assigned_by: "UniProt",
          with: [
            {
              id: "KW-0472",
              db: "UniProtKB-KW",
              name: "",
            },
          ],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!115735840",
          type: "cellular_component",
          date: "20200718",
          evidence_code: "IEA",
          go_term: "integral component of membrane",
          qualifier: "part_of",
          publication: "GO_REF:0000043",
          assigned_by: "UniProt",
          with: [
            {
              id: "KW-0812",
              db: "UniProtKB-KW",
              name: "",
            },
          ],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!115735861",
          type: "cellular_component",
          date: "20200718",
          evidence_code: "IEA",
          go_term: "plasma membrane",
          qualifier: "part_of",
          publication: "GO_REF:0000043",
          assigned_by: "UniProt",
          with: [
            {
              id: "KW-1003",
              db: "UniProtKB-KW",
              name: "",
            },
          ],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!115739615",
          type: "biological_process",
          date: "20200718",
          evidence_code: "IEA",
          go_term: "cell adhesion",
          qualifier: "involved_in",
          publication: "GO_REF:0000043",
          assigned_by: "UniProt",
          with: [
            {
              id: "KW-0130",
              db: "UniProtKB-KW",
              name: "",
            },
          ],
          extensions: [],
        },
        {
          id: "UniProtKB:Q8I7T3!119440372",
          type: "cellular_component",
          date: "20200718",
          evidence_code: "IEA",
          go_term: "plasma membrane",
          qualifier: "part_of",
          publication: "GO_REF:0000044",
          assigned_by: "UniProt",
          with: [
            {
              id: "SL-0039",
              db: "UniProtKB-SubCell",
              name: "",
            },
          ],
          extensions: [],
        },
      ],
    },
  },
}

export default mockData
