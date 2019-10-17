import React from "react"
import { shallow } from "enzyme"
import ErrorNotification from "./ErrorNotification"
import SnackbarContent from "@material-ui/core/SnackbarContent"

describe("Authentication/ErrorNotification", () => {
  const props = {
    error: {
      status: 401,
      title: "unauthorized user",
    },
  }
  const wrapper = shallow(<ErrorNotification {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find("div")).toHaveLength(1)
      expect(wrapper.find(SnackbarContent)).toHaveLength(1)
    })
  })
})
