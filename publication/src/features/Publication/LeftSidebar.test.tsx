import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import LeftSidebar from "./LeftSidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

describe("Publication/LeftSidebar", () => {
  const props = {
    data: {
      publication: {
        abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        doi: "9.0909/j.diff.1964.02.01",
        journal:
          "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        pages: "71-79",
        pub_date: "1964-01-29",
        id: "12345678",
        title:
          "This is a fake publication title that should be at least ten words",
        authors: [
          {
            first_name: "George",
            last_name: "Costanza",
            rank: "0",
            initials: "GC",
          },
          {
            first_name: "Cosmo",
            last_name: "Kramer",
            rank: "1",
            initials: "CK",
          },
        ],
      },
    },
  }
  const wrapper = shallow(<LeftSidebar {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders one <div> element", () => {
      expect(wrapper.dive().find("div")).toHaveLength(1)
    })
    it("always renders one <FontAwesomeIcon> element", () => {
      expect(wrapper.dive().find(FontAwesomeIcon)).toHaveLength(1)
    })
    it("matches data prop value", () => {
      expect(wrapper.prop("data")).toEqual(props.data)
    })
  })
})
