import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import OntologyContainer from "./OntologyContainer"

describe("Ontology/OntologyContainer", () => {
  const wrapper = shallow(<OntologyContainer />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })
  })
})
