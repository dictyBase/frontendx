import React from "react"
import { shallow } from "enzyme"
import { Logout } from "./Logout"
import { Redirect } from "react-router-dom"

describe("Authentication/Logout", () => {
  const props = {
    logoutUser: jest.fn(),
  }
  const wrapper = shallow(<Logout {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(Redirect)).toHaveLength(1)
    })
  })
})
