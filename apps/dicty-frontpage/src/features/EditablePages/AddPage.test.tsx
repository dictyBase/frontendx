import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import waitForExpect from "wait-for-expect"
import { CreateContentDocument } from "dicty-graphql-schema"
import { vi } from "vitest"
import MockAuthProvider from "../../mocks/MockAuthProvider"
import AddPage from "./AddPage"

const mockContent = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Test Content","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"International conferences dedicated to ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" started in  1977 with the meeting in Sardinia, and continued on a roughly 3-year  cycle into the 1980's. However, as the field became more active, more  local meetings sprang up to fill the gaps in the cycle. Notable amongst  these was an annual series in the UK, which gradually became more  international. By the late 1980's with the successive meetings at  Amsterdam, Oxford, Airlie and Cambridge, the current pattern of annual  meetings was established. Interestingly in the late 1990's as the field  expanded further, local meetings were re-started in several countries.     ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"flex-layout","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

const properties = {
  location: {
    state: {
      name: "shipping",
      url: "/information/shipping",
    },
  },
}

const mockHistoryPush = vi.fn()

// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual<
    typeof import("react-router-dom")
  >("react-router-dom")
  return {
    ...originalModule,
    useParams: () => ({
      name: "shipping",
    }),
    useNavigate: () => mockHistoryPush,
    useLocation: () => properties.location,
  }
})

window.getSelection = vi.fn()

/* Maybe I need to edit my mockContent like in InfoPageContainer */

describe("features/EditablePages/AddPage", () => {
  const MockComponent = ({ mocks }: any) => (
    <MockAuthProvider mocks={mocks} validToken>
      <AddPage />
    </MockAuthProvider>
  )

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe("initial render", () => {
    it.todo("displays correct route", () => {
      render(<MockComponent mocks={[]} />)
      expect(
        screen.getByText(/Add Editable Page for Route:/),
      ).toBeInTheDocument()
      expect(screen.getByText("/information/shipping")).toBeInTheDocument()
    })
  })

  describe("button clicking", () => {
    it.todo("should save data and redirect on click", async () => {
      const mocks = [
        {
          request: {
            query: CreateContentDocument,
            variables: {
              input: {
                name: "shipping",
                createdBy: "999",
                content: JSON.stringify(mockContent),
                namespace: "dfp",
              },
            },
          },
          result: {
            data: {
              createContent: {
                name: "shipping",
                createdBy: {
                  id: "999",
                },
                content: JSON.stringify(mockContent),
                namespace: "dfp",
              },
            },
          },
        },
      ]
      render(<MockComponent mocks={mocks} />)
      const saveButton = screen.getByRole("button", { name: "Save" })
      userEvent.click(saveButton)
      await waitForExpect(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(
          properties.location.state.url,
        )
      })
    })

    it.todo("should go back to previous URL on cancel", async () => {
      const user = userEvent.setup()
      render(<MockComponent mocks={[]} />)
      const cancelButton = screen.getByText("Cancel")
      await user.click(cancelButton)
      expect(mockHistoryPush).toHaveBeenCalledWith(
        properties.location.state.url,
      )
    })
  })
})
