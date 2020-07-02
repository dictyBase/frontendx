import React from "react"
import { shallow } from "enzyme"
import JournalData from "./JournalData"
import Grid from "@material-ui/core/Grid"
import JournalDataItem from "./JournalDataItem"

describe("Publication/Sections/JournalData", () => {
  const props = {
    data: {
      doi: "9.0909/j.diff.1964.02.01",
      journal:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      pages: "71-79",
      pub_date: "1964-01-29",
      id: "12345678",
      issue: "1",
      volume: "2",
    },
  }
  const wrapper = shallow(<JournalData {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find("div")).toHaveLength(2)
      expect(wrapper.find(Grid)).toHaveLength(1)
      expect(wrapper.find(JournalDataItem)).toHaveLength(2)
    })
  })
})
