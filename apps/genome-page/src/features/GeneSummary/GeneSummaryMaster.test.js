import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import { GeneSummaryMaster } from "./GeneSummaryMaster"
import Tab from "@material-ui/core/Tab"

describe("GeneSummary/GeneSummaryMaster", () => {
  const json = {
    data: {
      attributes: {
        group: ["protein", "goa", "orthologs", "phenotypes", "references"],
        subgroup: [
          "general",
          "genomic",
          "protein",
          "goa",
          "dbxrefs",
          "summary",
          "publication",
        ],
      },
    },
  }

  const badjson = {
    data: {
      attributes: {
        group: ["fake"],
      },
    },
  }

  const props = {
    classes: {
      root: {},
      tabs: {},
      tab: {},
    },
    match: {
      params: {
        id: "id number",
      },
    },
  }
  const wrapper = shallow(<GeneSummaryMaster {...props} />)
  it("renders without crashing", () => {
    shallow(<GeneSummaryMaster {...props} />)
  })

  describe("generateTabs method", () => {
    const generateRealTabs = wrapper.instance().generateTabs(json)
    const generateBadTabs = wrapper.instance().generateTabs(badjson)

    it("should produce an array of five items", () => {
      expect(generateRealTabs.length).toBe(5)
    })

    it("should produce an array of one item for badjson", () => {
      expect(generateBadTabs.length).toBe(1)
      console.log(generateBadTabs)
    })
  })

  describe("generatePanels method", () => {
    const generatePanels = wrapper.instance().generatePanels(json)

    it("should produce an array of seven items", () => {
      expect(generatePanels.length).toBe(7)
    })
  })
})
