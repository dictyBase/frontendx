import React from "react"
import { shallow } from "enzyme"
import PublicationHeader from "./PublicationHeader"

describe("Publication/PublicationHeader", () => {
  const wrapper = shallow(<PublicationHeader />)
  describe("initial render", () => {
    it("always renders initial components", () => {
      expect(wrapper.find("h1")).toHaveLength(1)
    })
    it("renders the correct header text", () => {
      expect(wrapper.text()).toEqual("dictyBase Literature")
    })
  })
})
