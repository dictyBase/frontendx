import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import OntologyContainer from "./OntologyContainer"
import AppBar from "@material-ui/core/AppBar"

describe("Ontology/OntologyContainer", () => {
  const wrapper = shallow(<OntologyContainer />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })

    // it("always renders one AppBar", () => {
    //   expect(wrapper.find(AppBar).length).toBe(1)
    // })
  })
})
