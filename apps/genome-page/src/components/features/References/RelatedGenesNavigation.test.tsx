import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { RouterProvider, createMemoryRouter } from "react-router-dom"
import { RelatedGenesNavigation } from "./RelatedGenesNavigation"

// Mock the useRouter hook
const mockPush = vi.fn()
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
    query: { id: "1" },
  }),
}))

const router = createMemoryRouter(
  [
    {
      path: ":id/references/:publicationId",
      element: <RelatedGenesNavigation />,
    },
    { path: ":id/references", element: <> reference route </> },
  ],
  { initialEntries: ["/sadA/references/12345"] },
)

describe("RelatedGenesNavigation", () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  test("renders a back button", () => {
    render(<RouterProvider router={router} />)

    // Check if the back button is rendered
    const backButton = screen.getByRole("button", { name: /back/i })
    expect(backButton).toBeInTheDocument()

    // Verify the button has the correct icon
    const icon = backButton.querySelector("svg")
    expect(icon).toBeInTheDocument()
  })

  test("back button navigates to gene references page", async () => {
    const user = userEvent.setup()
    render(<RouterProvider router={router} />)

    // Get back button and click it
    const backButton = screen.getByRole("button", { name: /back/i })
    await user.click(backButton)

    // Verify router.back was called
    expect(screen.getByText("reference route")).toBeVisible()
  })
})
