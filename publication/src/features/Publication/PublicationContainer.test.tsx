import React from "react"
import { shallow } from "enzyme"
import "../../setupTests"
import PublicationContainer from "./PublicationContainer"
import LeftSidebar from "./LeftSidebar"
import PublicationDisplay from "./PublicationDisplay"
import Grid from "@material-ui/core/Grid"

describe("Publication/PublicationContainer", () => {
  const props = {
    data: {
      publication: {
        abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        doi: "9.0909/j.diff.1964.02.01",
        full_text_url: "https://doi.org/9.0909/j.diff.1964.02.01",
        journal:
          "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        page: "71-79",
        publication_date: "1964-01-29",
        pubmed: "12345678",
        pubmed_url: "https://pubmed.gov/12345678",
        title:
          "This is a fake publication title that should be at least ten words",
        authors: [
          {
            first_name: "George",
            last_name: "Costanza",
            full_name: "Costanza G",
            initials: "GC",
          },
          {
            first_name: "Cosmo",
            last_name: "Kramer",
            full_name: "Kramer C",
            initials: "CK",
          },
        ],
      },
    },
  }
  const wrapper = shallow(<PublicationContainer {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })
    it("always renders one <h1> elements", () => {
      expect(wrapper.dive().find("h1")).toHaveLength(1)
    })
    it("always renders four <Grid> elements", () => {
      expect(wrapper.dive().find(Grid)).toHaveLength(4)
    })
    it("always renders one <LeftSidebar> elements", () => {
      expect(wrapper.dive().find(LeftSidebar)).toHaveLength(1)
    })
    it("always renders one <PublicationDisplay> elements", () => {
      expect(wrapper.dive().find(PublicationDisplay)).toHaveLength(1)
    })
    it("contains header value", () => {
      const h1 = wrapper.dive().find("h1")
      expect(h1.text()).toEqual("dictyBase Literature")
    })
    it("matches data prop value", () => {
      expect(wrapper.prop("data")).toEqual(props.data)
    })
  })
})
