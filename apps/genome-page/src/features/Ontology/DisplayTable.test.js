import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import DisplayTable from "./DisplayTable"

describe("Ontology/DisplayTable", () => {
  const props = {
    goaData: [],
  }
  const wrapper = shallow(<DisplayTable {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })
  })
})
