import React from "react"
import { render, screen } from "@testing-library/react"
import { ContentBySlugDocument } from "dicty-graphql-schema"
import { vi } from "vitest"
import { Location } from "history"
import { MockAuthProvider } from "../../mocks/MockAuthProvider"
import { InfoPageContainer, getSlug } from "./InfoPageContainer"

window.getSelection = vi.fn()
const mockName = "payment"

vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual<
    typeof import("react-router-dom")
  >("react-router-dom")
  return {
    ...originalModule,
    useParams: () => ({
      name: mockName,
    }),
  }
})

const mockContent = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Content","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"International conferences dedicated to ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" started in  1977 with the meeting in Sardinia, and continued on a roughly 3-year  cycle into the 1980's. However, as the field became more active, more  local meetings sprang up to fill the gaps in the cycle. Notable amongst  these was an annual series in the UK, which gradually became more  international. By the late 1980's with the successive meetings at  Amsterdam, Oxford, Airlie and Cambridge, the current pattern of annual  meetings was established. Interestingly in the late 1990's as the field  expanded further, local meetings were re-started in several countries.     ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"flex-layout","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

const mockSlug = "frontpage-payment"

describe("features/EditablePages/InfoPageContainer", () => {
  const MockComponent = ({ mocks }: any) => (
    <MockAuthProvider mocks={mocks}>
      <InfoPageContainer />
    </MockAuthProvider>
  )

  describe("initial render with fetched data", () => {
    const mocks = [
      {
        request: {
          query: ContentBySlugDocument,
          variables: {
            slug: mockSlug,
          },
        },
        result: {
          data: {
            contentBySlug: {
              id: 1,
              content: mockContent,
              name: mockName,
              slug: mockSlug,
              updatedAt: "2020-01-01T17:50:12.427Z",
              updatedBy: {
                id: 1,
                email: "rusty@holzer.com",
                firstName: "Rusty",
                lastName: "Holzer",
                roles: [
                  {
                    name: "superuser",
                    permissions: {
                      level: "admin",
                      resource: "dictybase",
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ]

    it.todo("renders fetched data", async () => {
      render(<MockComponent mocks={mocks} />)
      // shows loading skeleton first
      expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
      // wait for data to load...
      const content = await screen.findByText(/Test Content/)
      expect(content).toBeInTheDocument()
    })
  })

  describe("error handling", () => {
    const mocks = [
      {
        request: {
          query: ContentBySlugDocument,
          variables: {
            slug: mockSlug,
          },
        },
        result: {
          errors: [
            {
              message: "Page Not Found",
              path: [],
              extensions: { code: "NotFound" },
              locations: undefined,
              nodes: undefined,
              source: undefined,
              positions: undefined,
              originalError: undefined,
              name: "",
            },
          ],
        },
      },
    ]
    it("handles errors as expected", async () => {
      render(<MockComponent mocks={mocks} />)
      // displays loading skeleton first
      expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()

      // wait for error message to load...
      const errorMessage = await screen.findByText(/Page Not Found/)
      expect(errorMessage).toBeInTheDocument()
    })
  })

  describe("getSlug function", () => {
    it("should return privacy-policy slug", () => {
      const { pathname } = {
        pathname: "/privacy-policy",
      } as Location
      const { name, subname } = {
        name: undefined,
        subname: undefined,
      }
      expect(getSlug(pathname, name, subname)).toEqual("privacy-policy")
    })

    it("should return privacy-policy slug when given extra backslash", () => {
      const { pathname } = {
        pathname: "/privacy-policy/",
      } as Location
      const { name, subname } = {
        name: undefined,
        subname: undefined,
      }
      expect(getSlug(pathname, name, subname)).toEqual("privacy-policy")
    })

    it("should return subname", () => {
      const { pathname } = {
        pathname: "/the/maestro",
      } as Location
      const { name, subname } = {
        name: "the",
        subname: "maestro",
      }
      expect(getSlug(pathname, name, subname)).toEqual("maestro")
    })

    it("should return name", () => {
      const { pathname } = {
        pathname: "/jerry",
      } as Location
      const { name, subname } = {
        name: "jerry",
        subname: undefined,
      }
      expect(getSlug(pathname, name, subname)).toEqual("jerry")
    })
  })
})
