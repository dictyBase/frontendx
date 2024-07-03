import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi, describe, test } from "vitest"
import { EditView } from "../pages/news/[id]/edit"

const CONTENT_STRING = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Annual International Dictyostelium Conference","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"International conferences dedicated to ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" started in  1977 with the meeting in Sardinia, and continued on a roughly 3-year  cycle into the 1980's. However, as the field became more active, more  local meetings sprang up to fill the gaps in the cycle. Notable amongst  these was an annual series in the UK, which gradually became more  international. By the late 1980's with the successive meetings at  Amsterdam, Oxford, Airlie and Cambridge, the current pattern of annual  meetings was established. Interestingly in the late 1990's as the field  expanded further, local meetings were re-started in several countries.     ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"flex-layout","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

const editRoute = "/news/:id/edit"

const routeConfiguration = [
  {
    path: editRoute,
    element: <EditView contentId="1" content={CONTENT_STRING} />,
  },
  {
    path: "/news/:id/editable",
    element: <> Editable News Route </>,
  },
]

const {
  mockAuthorizedUpdateContent,
} = vi.hoisted(() => ({
  mockAuthorizedUpdateContent: vi.fn(),
}))

vi.mock("../common/hooks/useAuthorizedUpdateContent", () => ({
  useAuthorizedUpdateContent: () => mockAuthorizedUpdateContent,
}))


describe("Edit View", () => {
  test('renders an element with a "textbox" role when useContentBySlugQuery returns valid data', () => {
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    const textbox = screen.getByRole("textbox")
    expect(textbox).toBeInTheDocument()
  })
  test('renders a button with the text "Save" that navigates to `/news/:id/editable` when clicked', async () => {
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    const editButton = screen.getByText("Save")
    expect(editButton).toBeInTheDocument()

    await user.click(editButton)
    expect(mockAuthorizedUpdateContent).toHaveBeenCalled()
    expect(screen.getByText("Editable News Route")).toBeInTheDocument()
  })
  test('renders a button with the text "Cancel" that navigates to `/news/:id/editable` when clicked', async () => {
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    const cancelButton = screen.getByText("Cancel")
    expect(cancelButton).toBeInTheDocument()

    await user.click(cancelButton)
    expect(screen.getByText("Editable News Route")).toBeInTheDocument()
  })
})
