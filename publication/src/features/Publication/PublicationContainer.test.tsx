import React from "react"
import { mount } from "enzyme"
import "../../setupTests"
import { MockedProvider } from "react-apollo/test-utils"
import { BrowserRouter } from "react-router-dom"
import PublicationContainer, { GET_PUBLICATION } from "./PublicationContainer"
import LeftSidebar from "./LeftSidebar"
import PublicationDisplay from "./PublicationDisplay"
import Grid from "@material-ui/core/Grid"
import wait from "waait"

describe("Publication/PublicationContainer", async () => {
  const mocks = [
    {
      request: {
        query: GET_PUBLICATION,
        variables: {
          id: "1",
        },
      },
      result: {
        data: {
          publication: {
            abstract:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
      },
    },
  ]

  const wrapper = mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <PublicationContainer />
      </BrowserRouter>
    </MockedProvider>,
  )
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("should render loading state initially", () => {
      expect(wrapper.contains("Loading..."))
    })
    // it("should render PublicationContainer", async () => {
    //   await wait(0)
    //   expect(wrapper.find("h1")).toHaveLength(1)
    // })
    // it("always renders one <h1> elements", () => {
    //   expect(wrapper.find("h1")).toHaveLength(1)
    // })
    // it("always renders four <Grid> elements", () => {
    //   expect(wrapper.find(Grid)).toHaveLength(4)
    // })
    // it("always renders one <LeftSidebar> elements", () => {
    //   expect(wrapper.find(LeftSidebar)).toHaveLength(1)
    // })
    // it("always renders one <PublicationDisplay> elements", () => {
    //   expect(wrapper.find(PublicationDisplay)).toHaveLength(1)
    // })
    // it("contains header value", () => {
    //   const h1 = wrapper.find("h1")
    //   expect(h1.text()).toEqual("dictyBase Literature")
    // })
    // it("matches data prop value", () => {
    //   expect(wrapper.prop("data")).toEqual(mocks[0].result.data)
    // })
  })
})
