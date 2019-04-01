import React from "react"
import { mount } from "enzyme"
import "../../setupTests"
import PublicationDisplay from "./PublicationDisplay"
import Title from "./Title"
import Authors from "./Authors"
import JournalData from "./JournalData"
import SocialLinks from "./SocialLinks"
import Abstract from "./Abstract"
import FullTextLinks from "./FullTextLinks"

describe("Publication/PublicationDisplay", () => {
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
  const wrapper = mount(<PublicationDisplay {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      wrapper
    })
    it("always renders one <Title> element", () => {
      expect(wrapper.find(Title)).toHaveLength(1)
    })
    it("always renders one <Authors> element", () => {
      expect(wrapper.find(Authors)).toHaveLength(1)
    })
    it("always renders one <JournalData> element", () => {
      expect(wrapper.find(JournalData)).toHaveLength(1)
    })
    it("always renders one <SocialLinks> element", () => {
      expect(wrapper.find(SocialLinks)).toHaveLength(1)
    })
    it("always renders one <Abstract> element", () => {
      expect(wrapper.find(Abstract)).toHaveLength(1)
    })
    it("always renders one <FullTextLinks> element", () => {
      expect(wrapper.find(FullTextLinks)).toHaveLength(1)
    })
    it("matches data prop value", () => {
      expect(wrapper.prop("data")).toEqual(props.data)
    })
  })
})
