import React from "react"
import { shallow } from "enzyme"
import "../../../setupTests"
import GoaPanel from "./GoaPanel"

describe("Summary/Panels/GoaPanel", () => {
  const props = {
    classes: {},
    data: [],
  }
  const wrapper = shallow(<GoaPanel {...props} />)

  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })
  })
})
