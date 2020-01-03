import React from "react"
import { mount } from "enzyme"
import { MockedProvider } from "@apollo/react-testing"
import { BrowserRouter } from "react-router-dom"
import PublicationContainer, { GET_PUBLICATION } from "./PublicationContainer"
import PublicationLoader from "./PublicationLoader"
// import LeftSidebar from "./LeftSidebar"
// import PublicationDisplay from "./PublicationDisplay"
// import PublicationHeader from "./PublicationHeader"
import ErrorPage from "../../common/components/ErrorPage"
import wait from "waait"

describe("Publication/PublicationContainer", () => {
  describe("initial render", () => {
    const mocks = [
      {
        request: {
          query: GET_PUBLICATION,
          variables: {
            id: "12345678",
          },
        },
        result: {
          data: {
            publication: {
              id: "12345678",
              doi: "9.0909/j.diff.1964.02.01",
              title:
                "This is a fake publication title that should be at least ten words",
              abstract:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              journal:
                "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
              pub_date: "1964-01-29",
              pages: "71-79",
              authors: [
                {
                  initials: "GC",
                  last_name: "Costanza",
                },
                {
                  initials: "CK",
                  last_name: "Kramer",
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

    it("should render loading state initially", () => {
      expect(wrapper.find(PublicationLoader)).toHaveLength(1)
    })

    // it("renders expected components after receiving data", async () => {
    //   await wait()
    //   wrapper.update()
    //   console.log(wrapper.debug())
    //   expect(wrapper.find(PublicationHeader)).toHaveLength(1)
    //   expect(wrapper.find(LeftSidebar)).toHaveLength(1)
    //   expect(wrapper.find(PublicationDisplay)).toHaveLength(1)
    // })
  })

  describe("error handling", () => {
    const mocks = [
      {
        request: {
          query: GET_PUBLICATION,
          variables: {
            id: "1",
          },
        },
        result: {
          errors: [
            {
              message: "Publication not found",
              path: [],
              extensions: { code: "NotFound" },
            },
          ],
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
    it("handles errors as expected", async () => {
      await wait()
      wrapper.update()
      expect(wrapper.find(ErrorPage)).toHaveLength(1)
    })
  })
})
