import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, test, vi } from "vitest"
import { EditableView } from "../pages/news/[id]/editable"

const CONTENT_STRING = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Annual International Dictyostelium Conference","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"International conferences dedicated to ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" started in  1977 with the meeting in Sardinia, and continued on a roughly 3-year  cycle into the 1980's. However, as the field became more active, more  local meetings sprang up to fill the gaps in the cycle. Notable amongst  these was an annual series in the UK, which gradually became more  international. By the late 1980's with the successive meetings at  Amsterdam, Oxford, Airlie and Cambridge, the current pattern of annual  meetings was established. Interestingly in the late 1990's as the field  expanded further, local meetings were re-started in several countries.     ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"flex-layout","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

const editableRoute = "/news/:id/editable"

const routeConfiguration = [
  {
    path: editableRoute,
    element: (
      <EditableView
        id="1"
        content={CONTENT_STRING}
        createdAt="2024-07-10T12:55:26-05:00"
      />
    ),
  },
  {
    path: "/news/:id/edit",
    element: <> Edit News Route </>,
  },
  {
    path: "/news/editable",
    element: <> Editable News List Route </>,
  },
]

const { mockAuthorizedDeleteContent } = vi.hoisted(() => ({
  mockAuthorizedDeleteContent: vi.fn(() => ({ success: true })),
}))

vi.mock("../common/hooks/useAuthorizedDeleteContent", () => ({
  useAuthorizedDeleteContent: () => mockAuthorizedDeleteContent,
}))

describe("Editable View", () => {
  test("renders the date of the content's last updated", () => {
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editableRoute],
    })
    render(<RouterProvider router={router} />)
    expect(screen.getByText("Wednesday, July 10th, 2024")).toBeInTheDocument()
  })
  test('renders an element with a "textbox" role when useContentBySlugQuery returns valid data', () => {
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editableRoute],
    })
    render(<RouterProvider router={router} />)
    const textbox = screen.getByRole("textbox")
    expect(textbox).toBeInTheDocument()
  })
  test('renders a button with the text "Edit" that navigates to `/news/:id/edit` when clicked', async () => {
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editableRoute],
    })
    render(<RouterProvider router={router} />)
    const editButton = screen.getByText("Edit")
    expect(editButton).toBeInTheDocument()

    await user.click(editButton)
    expect(screen.getByText("Edit News Route")).toBeInTheDocument()
  })
  test('renders a button with the text "Cancel" that navigates to `/news/editable` when clicked', async () => {
    const user = userEvent.setup()
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editableRoute],
    })
    render(<RouterProvider router={router} />)
    const allNewsButton = screen.getByText("Browse News")
    expect(allNewsButton).toBeInTheDocument()

    await user.click(allNewsButton)
    expect(screen.getByText("Editable News List Route")).toBeInTheDocument()
  })
  test('renders a button with the text "Delete"', async () => {
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editableRoute],
    })
    render(<RouterProvider router={router} />)
    const deleteButton = screen.getByText("Delete")
    expect(deleteButton).toBeInTheDocument()
  })
})
