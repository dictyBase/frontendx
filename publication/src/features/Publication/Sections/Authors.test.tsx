import React from "react"
import { shallow } from "enzyme"
import "../../../setupTests"
import Authors from "./Authors"

describe("Publication/Authors", () => {
  const props = {
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
  }
  const wrapper = shallow(<Authors {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders one <div> element", () => {
      expect(wrapper.dive().find("div")).toHaveLength(1)
    })
    it("always renders one <span> element per author", () => {
      expect(wrapper.dive().find("span")).toHaveLength(2)
    })
    it("matches authors prop value", () => {
      expect(wrapper.prop("authors")).toEqual(props.authors)
    })
  })
})
