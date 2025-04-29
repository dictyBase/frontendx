import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { MockedProvider } from "@apollo/client/testing"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi, describe, test } from "vitest"
import { EditView } from "../pages/news/[id]/edit"
import { updateFailureError, ContentError } from "../common/constants/types"

const CONTENT_STRING = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Annual International Dictyostelium Conference","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"International conferences dedicated to ","type":"text","version":1},{"detail":0,"format":2,"mode":"normal","style":"","text":"Dictyostelium","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" started in  1977 with the meeting in Sardinia, and continued on a roughly 3-year  cycle into the 1980's. However, as the field became more active, more  local meetings sprang up to fill the gaps in the cycle. Notable amongst  these was an annual series in the UK, which gradually became more  international. By the late 1980's with the successive meetings at  Amsterdam, Oxford, Airlie and Cambridge, the current pattern of annual  meetings was established. Interestingly in the late 1990's as the field  expanded further, local meetings were re-started in several countries.     ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"flex-layout","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

const editRoute = "/news/:id/edit"

const routeConfiguration = [
  {
    path: editRoute,
    element: (
      <EditView
        contentId="1"
        content={CONTENT_STRING}
        createdAt="2024-07-10T12:55:26-05:00"
        updatedBy={{ email: "dicty@base.org" }}
      />
    ),
  },
  {
    path: "/news/:id/editable",
    element: <> Editable News Route </>,
  },
]

const { mockAuthorizedUpdateContent, mockAutoSave } = vi.hoisted(() => ({
  mockAuthorizedUpdateContent: vi.fn(),
  mockAutoSave: vi.fn(),
}))

vi.mock("../common/hooks/useAuthorizedUpdateContent", async () => {
  const actual = await vi.importActual<
    typeof import("../common/hooks/useAuthorizedUpdateContent")
  >("../common/hooks/useAuthorizedUpdateContent")
  return {
    ...actual,
    useAuthorizedUpdateContent: () => mockAuthorizedUpdateContent,
  }
})

vi.mock("../common/hooks/useAutoSave", async () => ({
  useAutoSave: ({
    onSuccess,
    onError,
  }: {
    onSuccess: () => void
    onError: () => void
  }) => mockAutoSave({ onSuccess, onError }),
}))

describe("Edit View", () => {
  test("renders the date of the content's last updated", () => {
    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })
    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )
    expect(screen.getByText("Wednesday, July 10th, 2024")).toBeInTheDocument()
  })

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
    const editButton = screen.getByText(/save/i)
    expect(editButton).toBeInTheDocument()

    await user.click(editButton)
    expect(mockAuthorizedUpdateContent).toHaveBeenCalled()
    expect(screen.getByText("Editable News Route")).toBeInTheDocument()
  })

  test("shows success alert when auto-save succeeds", async () => {
    vi.useFakeTimers()

    // Simulate a successful auto-save
    let savedCallback: () => void
    mockAutoSave.mockImplementation(({ onSuccess }) => {
      savedCallback = onSuccess
    })

    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })

    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )

    // @ts-ignore
    savedCallback()

    // Check that success alert appears
    expect(screen.getByText("Work Saved.")).toBeInTheDocument()

    // Alert should disappear after a delay
    vi.advanceTimersByTime(4000)
    expect(screen.queryByText("Work Saved.")).not.toBeInTheDocument()
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  test("shows error alert when auto-save fails", async () => {
    vi.useFakeTimers()
    // Simulate a failed auto-save
    let errorCallback: (error: ContentError) => void
    mockAutoSave.mockImplementation(({ onError }) => {
      errorCallback = onError
    })

    const router = createMemoryRouter(routeConfiguration, {
      initialEntries: [editRoute],
    })

    render(
      <MockedProvider>
        <RouterProvider router={router} />
      </MockedProvider>,
    )

    // Trigger the error callback (simulating a failed auto-save)
    // @ts-ignore
    errorCallback(updateFailureError)

    // Check that error alert appears
    expect(screen.getByText("Could not autosave progress.")).toBeInTheDocument()

    // Alert should disappear after a delay
    vi.advanceTimersByTime(3000)
    expect(
      screen.queryByText("Could not autosave progress."),
    ).not.toBeInTheDocument()
    vi.clearAllMocks()
    vi.useRealTimers()
  })
})
