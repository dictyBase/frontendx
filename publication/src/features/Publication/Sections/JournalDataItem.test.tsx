import React from "react"
import { shallow } from "enzyme"
import JournalDataItem from "./JournalDataItem"
import Grid from "@material-ui/core/Grid"

describe("Publication/Sections/JournalDataItem", () => {
  const props = {
    title: "DOI",
    url: "http://www.zombo.com",
    content: "1234567",
  }
  const wrapper = shallow(<JournalDataItem {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(Grid)).toHaveLength(1)
    })
  })
})
