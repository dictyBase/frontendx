import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { RelatedGenesNavigation } from "./RelatedGenesNavigation"

// Mock the useRouter hook
const mockPush = vi.fn()
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
    query: { id: "1" },
  }),
}))

describe("RelatedGenesNavigation", () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  test("renders a back button", () => {
    render(<RelatedGenesNavigation />)

    // Check if the back button is rendered
    const backButton = screen.getByRole("button", { name: /back/i })
    expect(backButton).toBeInTheDocument()

    // Verify the button has the correct icon
    const icon = backButton.querySelector("svg")
    expect(icon).toBeInTheDocument()
  })

  test("calls router.push() when the button is clicked", async () => {
    const user = userEvent.setup()
    render(<RelatedGenesNavigation />)

    // Get back button and click it
    const backButton = screen.getByRole("button", { name: /back/i })
    await user.click(backButton)

    // Verify router.back was called
    expect(mockPush).toHaveBeenCalledTimes(1)
  })
})
