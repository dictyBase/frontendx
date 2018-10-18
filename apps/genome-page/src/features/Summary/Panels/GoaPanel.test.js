import React from "react"
import { mount } from "enzyme"
import "../../../setupTests"
import GoaPanel from "./GoaPanel"
import Table from "@material-ui/core/Table"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"

describe("Summary/Panels/GoaPanel", () => {
  const props = {
    classes: {},
    panelData: {
      data: {
        data: [
          [
            {
              type: "biological_process",
              id: "GO:0000281",
              attributes: {
                date: "20120522",
                evidence_code: "IMP",
                goterm: "mitotic cytokinesis",
                qualifier: "acts_upstream_of_or_within",
                publication: "PMID:12499361",
                with: null,
                extensions: null,
                assigned_by: "dictyBase",
              },
            },
            {
              type: "biological_process",
              id: "GO:0000902",
              attributes: {
                date: "20051219",
                evidence_code: "IMP",
                goterm: "cell morphogenesis",
                qualifier: "acts_upstream_of_or_within",
                publication: "PMID:12499361",
                with: null,
                extensions: null,
                assigned_by: "dictyBase",
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
              type: "cellular_component",
              id: "GO:0005938",
              attributes: {
                date: "20120522",
                evidence_code: "IDA",
                goterm: "cell cortex",
                qualifier: "part_of",
                publication: "PMID:12499361",
                with: null,
                extensions: null,
                assigned_by: "dictyBase",
              },
            },
            {
              type: "cellular_component",
              id: "GO:0015629",
              attributes: {
                date: "20120522",
                evidence_code: "IDA",
                goterm: "actin cytoskeleton",
                qualifier: "part_of",
                publication: "PMID:21441344",
                with: null,
                extensions: null,
                assigned_by: "dictyBase",
              },
            },
          ],
        ],
      },
    },
  }
  const wrapper = mount(<GoaPanel {...props} />)

  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })

    it("always renders one Table", () => {
      expect(wrapper.find(Table).length).toBe(1)
    })

    it("always renders three TableRows", () => {
      expect(wrapper.find(TableRow).length).toBe(3)
    })

    it("always renders six TableCells", () => {
      expect(wrapper.find(TableCell).length).toBe(6)
    })

    it("receives two props", () => {
      expect(Object.keys(wrapper.props()).length).toBe(2)
    })
  })
})
