import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { RelatedGenesNavigation } from "./RelatedGenesNavigation"

// Mock the useRouter hook
const mockBack = jest.fn()
jest.mock("next/router", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}))

describe("RelatedGenesNavigation", () => {
  beforeEach(() => {
    mockBack.mockClear()
  })

  it("renders a back button", () => {
    render(<RelatedGenesNavigation />)

    // Check if the back button is rendered
    const backButton = screen.getByRole("button", { name: /back/i })
    expect(backButton).toBeInTheDocument()

    // Verify the button has the correct icon
    const icon = backButton.querySelector("svg")
    expect(icon).toBeInTheDocument()
  })

  it("calls router.back() when the button is clicked", async () => {
    const user = userEvent.setup()
    render(<RelatedGenesNavigation />)

    // Get back button and click it
    const backButton = screen.getByRole("button", { name: /back/i })
    await user.click(backButton)

    // Verify router.back was called
    expect(mockBack).toHaveBeenCalledTimes(1)
  })
})
