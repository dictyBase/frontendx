import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import { OntologyTabContainer } from "./OntologyTabContainer"

describe("Ontology/OntologyTabContainer", () => {
  const props = {
    goa: {},
    changeTab: () => {},
  }
  const wrapper = shallow(<OntologyTabContainer {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })
  })
})
