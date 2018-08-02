import React from "react"
import { mount } from "enzyme"
import "../../setupTests"
import DisplayTable from "./DisplayTable"
import Table from "@material-ui/core/Table"

describe("Ontology/DisplayTable", () => {
  const props = {
    goaData: [],
  }
  const wrapper = mount(<DisplayTable {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })

    it("always renders one Table", () => {
      expect(wrapper.find(Table).length).toBe(1)
    })
  })
})
