import React from "react"
import { shallow } from "enzyme"
import PublicationLoader from "./PublicationLoader"
import Skeleton from "react-loading-skeleton"
import Grid from "@material-ui/core/Grid"

describe("Publication/PublicationLoader", () => {
  const wrapper = shallow(<PublicationLoader />)
  describe("initial render", () => {
    it("always renders initial components", () => {
      expect(wrapper.find("h1")).toHaveLength(1)
      expect(wrapper.find(Skeleton)).toHaveLength(4)
      expect(wrapper.find(Grid)).toHaveLength(4)
    })
  })
})
