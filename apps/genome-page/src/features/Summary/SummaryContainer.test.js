import React from "react"
import { shallow } from "enzyme"
import sinon from "sinon"
import "../../setupTests"
import { SummaryContainer } from "./SummaryContainer"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import AppBar from "@material-ui/core/AppBar"

describe("Summary/SummaryContainer", () => {
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
    match: {
      params: {
        id: "999",
      },
    },
    general: {
      isFetching: false,
      data: {
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
        links: {},
      },
    },
    goa: {
      isFetching: false,
      data: {
        attributes: {},
      },
    },
    fetchGeneralData: () => {},
    fetchGoa: () => {},
    fetchGeneName: () => {},
  }

  const wrapper = shallow(<SummaryContainer {...props} />)

  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })

    it("calls componentDidMount once", () => {
      sinon.spy(SummaryContainer.prototype, "componentDidMount")
      shallow(<SummaryContainer {...props} />)
      expect(SummaryContainer.prototype.componentDidMount.calledOnce).toEqual(
        true,
      )
    })

    it("always renders an AppBar", () => {
      expect(wrapper.find(AppBar).length).toBe(1)
    })

    it("always renders one Tabs outer component", () => {
      expect(wrapper.find(Tabs).length).toBe(1)
    })

    it("should render five new tabs", () => {
      expect(wrapper.find(Tab).length).toBe(5)
    })
  })

  describe("generateTabs method", () => {
    const generateRealTabs = wrapper.instance().generateTabs(json)

    it("should produce an array of five items", () => {
      expect(generateRealTabs.length).toBe(5)
    })
  })

  describe("generatePanels method", () => {
    const generatePanels = wrapper.instance().generatePanels(json)

    it("should produce an array of seven items", () => {
      expect(generatePanels.length).toBe(7)
    })
  })
})
