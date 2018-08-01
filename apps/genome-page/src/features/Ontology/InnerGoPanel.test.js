import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import InnerGoPanel from "./InnerGoPanel"

describe("Ontology/InnerGoPanel", () => {
  const props = {
    goaData: [],
  }
  const wrapper = shallow(<InnerGoPanel {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })
  })
})
