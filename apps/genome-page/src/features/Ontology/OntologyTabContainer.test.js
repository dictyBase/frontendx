import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import OntologyTabContainer from "./OntologyTabContainer"
import AppBar from "@material-ui/core/AppBar"

describe("Ontology/OntologyTabContainer", () => {
  const props = {
    goaData: {
      data: {
        data: [[]],
      },
    },
  }
  const wrapper = shallow(<OntologyTabContainer {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })

    // it("always renders one AppBar", () => {
    //   expect(wrapper.find(AppBar).length).toBe(1)
    // })
  })
})
