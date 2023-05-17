import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import { UpdateContentDocument } from "dicty-graphql-schema"
import MockAuthProvider from "../../mocks/MockAuthProvider"
import EditInfoPage from "./EditInfoPage"

const mockContent = [
  {
    type: "paragraph",
    children: [
      {
        fontFamily: "inherit",
        fontSize: "inherit",
        fontColor: "inherit",
        text: "Test Content",
      },
    ],
  },
]
const properties = {
  location: {
    pathname: "/research/techniques/edit",
    state: {
      data: {
        id: "99",
        name: "payment",
        slug: "dsc-payment",
        content: JSON.stringify(mockContent),

        updatedAt: "2020-01-01T17:50:12.427Z",

        updatedBy: {
          id: "999",

          firstName: "Art",

          lastName: "Vandelay",
          email: "art@vandelayindustries.com",
          roles: [
            {
              name: "Latex Salesman",
            },
          ],
        },
      },
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
    useNavigate: () => mockHistoryPush,
    useLocation: () => properties.location,
  }
})

window.getSelection = vi.fn()

describe("features/EditablePages/EditInfoPage", () => {
  const MockComponent = ({ mocks }: any) => (
    <MockAuthProvider mocks={mocks} validToken>
      <EditInfoPage />
    </MockAuthProvider>
  )

  describe("initial render", () => {
    it("renders expected page content", () => {
      render(<MockComponent mocks={[]} />)

      const content = screen.getByText(/Test Content/)
      expect(content).toBeInTheDocument()
    })
  })

  describe("button clicking", () => {
    it("saves content and redirects on click", async () => {
      const mocks = [
        {
          request: {
            query: UpdateContentDocument,
            variables: {
              input: {
                id: properties.location.state.data.id,

                updatedBy: properties.location.state.data.updatedBy.id,
                content: properties.location.state.data.content,
              },
            },
          },
          result: {
            data: {
              updateContent: {
                id: properties.location.state.data.id,

                updatedBy: {
                  id: properties.location.state.data.updatedBy.id,
                },
                content: properties.location.state.data.content,
              },
            },
          },
        },
      ]
      // ;(useNavigate as jest.Mock).mockReturnValueOnce({
      //   push: mockHistoryPush,
      // })
      const user = userEvent.setup()
      render(<MockComponent mocks={mocks} />)
      // there are two save buttons, one in toolbar and one at bottom
      const saveButtons = screen.getAllByText("Save")
      // act(() => {
      await user.click(saveButtons[0])
      // })
      await waitFor(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith("/research/techniques")
      })
    })

    it("should go back to previous URL on cancel", () => {
      render(<MockComponent mocks={[]} />)
      const cancelButton = screen.getByText("Cancel")
      // act(() => {
      userEvent.click(cancelButton)
      // })
      expect(mockHistoryPush).toHaveBeenCalledWith("/research/techniques")
    })
  })
})
