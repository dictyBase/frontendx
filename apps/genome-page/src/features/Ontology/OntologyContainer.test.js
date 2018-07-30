import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import { OntologyContainer } from "./OntologyContainer"

describe("Ontology/OntologyContainer", () => {
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
  const wrapper = shallow(<OntologyContainer {...props} />)
  it("renders without crashing", () => {
    shallow(<GeneOntologyMaster {...props} />)
  })

  describe("generateTabs method", () => {
    const generateTabs = wrapper.instance().generateTabs(json)

    it("should produce an array of five items", () => {
      expect(generateTabs.length).toBe(5)
    })
  })
})
