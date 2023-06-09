import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import { UpdateContentDocument } from "dicty-graphql-schema"
import MockAuthProvider from "../../mocks/MockAuthProvider"
import EditInfoPage from "./EditInfoPage"

const mockContent = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":" Dicty Stock Center History","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Excerpts from: ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"\\"A Concept Paper for a Strain and Plasmid Repository for the ","type":"text","version":1},{"detail":0,"format":3,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":" Research Community\\"","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":", that formed the basis for the Stock Center grant application","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"The social amoeba ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium discoideum","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":", an organism that is  described on the NIH model organisms web page, is becoming increasingly  useful as a research tool to ask fundamental questions in cell and  developmental biology. The genome has been sequenced in Jena, Germany,  Houston, TX, and Cambridge, UK, and is currently being assembled.  Full-length cDNAs are being prepared and sequenced in Tsukuba, Japan.  Although there had been substantial investment, it was decided that  several facilities would further increase the efficiency of all  laboratories working with this organism. One of these is a more  developed website, and a second is a stock center where wild-type  strains and thousands of mutants and plasmids could be preserved,  tested, and distributed. These projects are synergistic and, therefore,  our laboratory at Columbia submitted an application in parallel with Dr.  Rex Chisholm at Northwestern University. Dr. Chisholm has had long  experience providing access to information to the community, and we have  had long experience with maintaining and distributing strains. These  projects have now both been funded.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"A summary of the contributions of ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" can be found in: R.H. Kessin, ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":".  Evolution, cell biology and the development of multicellularity.  Cambridge University Press, 2001, and on the NIH's model organism web  page plus the subsidiary pages listed there: http://www.nih.gov/science/models/d_discoideum.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"What is the duration?","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" The duration is indefinite, although not  necessarily at Columbia. There are rules about succession in case the  director and/or curator can no longer fill this function. There is an  advisory board, consisting of veterans in the field and younger people  who will be expected to take over when the current applicants retire. We  expect that support will continue as long as there is a need for the  facility. If the facility proves its worth, we would be willing to apply  to NIH for funds other than the current RO1 grant. To this end, we keep  records of the number of strains shipped and queries answered.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"How are the resources made available to the research community?","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" The resources are available to the community through the web site managed by Dr. Rex Chisholm of Northwestern University (http://www.dictybase.org),  and we coordinate closely with Dr. Chisholm in the selection of  software to present information. Strains and plasmids will be sent to  any person who requests them. There are no restrictions. ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"What resources currently exist?","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" No other stock center or  repository existed prior to the Dicty Stock Center, and there were many  losses of strains and confusion about wild-types and parental cell  lines. Various species were being lost as highly trained taxonomists and  collectors retired or died. A repository will prevent loss, reduce  confusion about strain provenance, and makes the distribution of  valuable mutants much more convenient and reliable. The stock center  also serves as a central clearing house for quality assessment of  mutants. People who receive strains are requested to confirm their  validity.  ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"What is the size of the research community?","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" The size of the  community is roughly five hundred active scientists in 90 laboratories  worldwide. Because of the cell biological and genetic possibilities of  the organism, the community is growing. ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" is also  widely used as a teaching tool. The community is organized and has a  board of directors that is international in scope and seeks to make  research on the organism as efficient and as cooperative as possible.  The record of cooperation in this field is excellent.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":4},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Who will benefit?","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" All laboratories working on ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"  will benefit, and new laboratories will have a resource for advice on  growth and preservation of these important experimental tools.             ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":5}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"bullet","start":1,"tag":"ul"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`
const properties = {
  location: {
    pathname: "/research/techniques/edit",
    state: {
      data: {
        id: "99",
        name: "payment",
        slug: "dsc-payment",
        content: mockContent,

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
    it.todo("renders expected page content", () => {
      render(<MockComponent mocks={[]} />)

      const content = screen.getByText(/Test Content/)
      expect(content).toBeInTheDocument()
    })
  })

  describe("button clicking", () => {
    it.todo("saves content and redirects on click", async () => {
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

    it.todo("should go back to previous URL on cancel", () => {
      render(<MockComponent mocks={[]} />)
      const cancelButton = screen.getByText("Cancel")
      // act(() => {
      userEvent.click(cancelButton)
      // })
      expect(mockHistoryPush).toHaveBeenCalledWith("/research/techniques")
    })
  })
})
