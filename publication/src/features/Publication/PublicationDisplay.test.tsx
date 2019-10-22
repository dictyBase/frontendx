import React from "react"
import { mount } from "enzyme"
import PublicationDisplay from "./PublicationDisplay"
import Title from "./Sections/Title"
import Authors from "./Sections/Authors"
import JournalData from "./Sections/JournalData"
import SocialLinks from "./Sections/SocialLinks"
import Abstract from "./Sections/Abstract"
import FullTextLinks from "./Sections/FullTextLinks"

describe("Publication/PublicationDisplay", () => {
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
  const wrapper = mount(<PublicationDisplay {...props} />)
  describe("initial render", () => {
    it("always renders initial components", () => {
      expect(wrapper.find(Title)).toHaveLength(1)
      expect(wrapper.find(Authors)).toHaveLength(1)
      expect(wrapper.find(JournalData)).toHaveLength(1)
      expect(wrapper.find(SocialLinks)).toHaveLength(1)
      expect(wrapper.find(Abstract)).toHaveLength(1)
      expect(wrapper.find(FullTextLinks)).toHaveLength(1)
    })
    it("matches data prop value", () => {
      expect(wrapper.prop("data")).toEqual(props.data)
    })
  })
})
