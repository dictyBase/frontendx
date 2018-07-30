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
    isFetching: false,
    data: {},
  }
  const wrapper = shallow(<SummaryContainer {...props} />)
  it("renders without crashing", () => {
    shallow(<SummaryContainer {...props} />)
  })

  it("calls componentDidMount", () => {
    sinon.spy(wrapper.prototype, "componentDidMount")
    wrapper
    expect(wrapper.prototype.componentDidMount.calledOnce).toEqual(true)
  })

  describe("generateTabs method", () => {
    const generateRealTabs = wrapper.instance().generateTabs(json)
    const generateErrorTabs = wrapper.instance().generateTabs(badjson)

    it("should produce an array of five items", () => {
      expect(generateRealTabs.length).toBe(5)
    })

    it("should produce an array of one item for badjson", () => {
      expect(generateErrorTabs.length).toBe(1)
    })
  })

  describe("generatePanels method", () => {
    const generatePanels = wrapper.instance().generatePanels(json)

    it("should produce an array of seven items", () => {
      expect(generatePanels.length).toBe(7)
    })
  })

  describe("appearance", () => {
    const generateRealTabs = wrapper.instance().generateTabs(json)

    it("always renders an AppBar", () => {
      expect(wrapper.find(AppBar).length).toBe(1)
    })

    it("always renders one Tabs outer component", () => {
      expect(wrapper.find(Tabs).length).toBe(1)
    })

    it("should render six tabs", () => {
      expect(wrapper.find(Tab).length).toBe(6)
    })
  })
})
