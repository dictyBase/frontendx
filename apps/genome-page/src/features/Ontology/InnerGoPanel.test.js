import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import InnerGoPanel from "./InnerGoPanel"
import Grid from "@material-ui/core/Grid"

describe("Ontology/InnerGoPanel", () => {
  const props = {
    goaData: [],
  }
  const wrapper = shallow(<InnerGoPanel {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })

    it("always renders two Grid components", () => {
      expect(wrapper.find(Grid).length).toBe(2)
    })
  })
})
