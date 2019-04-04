import React from "react"
import { shallow } from "enzyme"
import "../../../setupTests"
import SocialLinks from "./SocialLinks"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

describe("Publication/SocialLinks", () => {
  const props = {
    title: "this is a test title",
  }
  const wrapper = shallow(<SocialLinks {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders one <div> element", () => {
      expect(wrapper.dive().find("div")).toHaveLength(1)
    })
    it("always renders two <FontAwesomeIcon> elements", () => {
      expect(wrapper.dive().find(FontAwesomeIcon)).toHaveLength(2)
    })
    it("matches title prop value", () => {
      expect(wrapper.prop("title")).toEqual("this is a test title")
    })
  })
})
