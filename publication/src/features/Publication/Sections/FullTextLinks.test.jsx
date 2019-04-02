import React from "react"
import { shallow } from "enzyme"
import "../../../setupTests"
import FullTextLinks from "./FullTextLinks"
import FontAwesome from "react-fontawesome"

describe("Publication/FullTextLinks", () => {
  const props = {
    url: "http://www.zombo.com",
  }
  const wrapper = shallow(<FullTextLinks {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders one <div> element", () => {
      expect(wrapper.dive().find("div")).toHaveLength(1)
    })
    it("always renders one <h3> element", () => {
      expect(wrapper.dive().find("h3")).toHaveLength(1)
    })
    it("always renders one <hr> element", () => {
      expect(wrapper.dive().find("hr")).toHaveLength(1)
    })
    it("always renders one FontAwesome component", () => {
      expect(wrapper.dive().find(FontAwesome)).toHaveLength(1)
    })
    it("matches url prop value", () => {
      expect(wrapper.prop("url")).toEqual(props.url)
    })
  })
})
