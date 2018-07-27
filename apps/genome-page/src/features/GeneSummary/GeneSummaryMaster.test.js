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
    const generateTabs = wrapper.instance().generateTabs(json)

    it("should produce an array of five items", () => {
      expect(generateTabs.length).toBe(5)
    })
  })

  describe("generatePanels method", () => {
    const generatePanels = wrapper.instance().generatePanels(json)

    it("should produce an array of seven items", () => {
      expect(generatePanels.length).toBe(7)
    })
  })
})
