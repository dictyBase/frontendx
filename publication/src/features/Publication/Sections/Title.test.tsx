import React from "react"
import { shallow } from "enzyme"
import "../../../setupTests"
import Title from "./Title"

describe("Publication/Title", () => {
  const props = {
    title: "this is a test title",
  }
  const wrapper = shallow(<Title {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders one <div> element", () => {
      expect(wrapper.dive().find("div")).toHaveLength(1)
    })
    it("always renders one <h2> element", () => {
      expect(wrapper.dive().find("h2")).toHaveLength(1)
    })
    it("matches title prop value", () => {
      expect(wrapper.prop("title")).toEqual("this is a test title")
    })
  })
})
