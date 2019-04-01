import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import Abstract from "./Abstract"

describe("Publication/Abstract", () => {
  const props = {
    abstract: "this is a test abstract",
  }
  const wrapper = shallow(<Abstract {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })
    it("always renders one <div> element", () => {
      expect(wrapper.dive().find("div")).toHaveLength(1)
    })
    it("always renders one <h2> element", () => {
      expect(wrapper.dive().find("h2")).toHaveLength(1)
    })
    it("always renders one <hr> element", () => {
      expect(wrapper.dive().find("hr")).toHaveLength(1)
    })
    it("matches abstract prop value", () => {
      expect(wrapper.prop("abstract")).toEqual("this is a test abstract")
    })
  })
})
