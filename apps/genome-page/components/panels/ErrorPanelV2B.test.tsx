import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ErrorPanelV2B } from "./ErrorPanelV2B"

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => (
    <a href={href} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  ),
}))

describe("ErrorPanelV2B", () => {
  beforeEach(() => {
    // Mock window.location.reload
    Object.defineProperty(window, "location", {
      value: {
        reload: jest.fn(),
      },
      writable: true,
    })
  })

  it("renders with default props", () => {
    render(<ErrorPanelV2B />)

    // Check that the panel title is rendered
    expect(screen.getByText("Error Information")).toBeInTheDocument()

    // Check that default error message is rendered
    expect(screen.getByText("Sorry, something went wrong.")).toBeInTheDocument()

    // Check that default message is rendered
    expect(
      screen.getByText(
        "We encountered an unexpected server error while processing your request.",
      ),
    ).toBeInTheDocument()

    // Check that supportEmail is rendered
    expect(screen.getByText(/dictybase@northwestern.edu/)).toBeInTheDocument()

    // Check that action buttons are rendered
    expect(screen.getByText("Refresh Page")).toBeInTheDocument()
    expect(screen.getByText("Return to Homepage")).toBeInTheDocument()
  })

  it("renders with custom props", () => {
    const customProperties = {
      title: "Custom Error Title",
      message: "Custom error message",
      supportEmail: "custom@example.com",
    }

    render(<ErrorPanelV2B {...customProperties} />)

    // Check that custom properties are rendered
    expect(screen.getByText(customProperties.title)).toBeInTheDocument()
    expect(screen.getByText(customProperties.message)).toBeInTheDocument()
    expect(screen.getByText(/custom@example.com/)).toBeInTheDocument()
  })

  it("calls window.location.reload when refresh button is clicked", async () => {
    const user = userEvent.setup()
    render(<ErrorPanelV2B />)

    // Click the refresh button
    await user.click(screen.getByText("Refresh Page"))

    // Verify that window.location.reload was called
    expect(window.location.reload).toHaveBeenCalled()
  })

  it("has a link to the homepage", () => {
    render(<ErrorPanelV2B />)

    // Get the home link and verify its href
    const homeLink = screen.getByText("Return to Homepage").closest("a")
    expect(homeLink).toHaveAttribute("href", "/")
  })

  it("has a mailto link with the support email", () => {
    const supportEmail = "test@example.com"
    render(<ErrorPanelV2B supportEmail={supportEmail} />)

    // Get the email link and verify its href
    const emailLink = screen.getByText(supportEmail).closest("a")
    expect(emailLink).toHaveAttribute("href", `mailto:${supportEmail}`)
  })

  it("uses Material-UI Grid layout for the content", () => {
    render(<ErrorPanelV2B />)

    // Verify Grid component is used (by checking for Grid container classes)
    const gridContainers = document.querySelectorAll(
      '[class*="MuiGrid-container"]',
    )
    expect(gridContainers.length).toBeGreaterThan(0)

    // Check for grid items
    const gridItems = document.querySelectorAll('[class*="MuiGrid-item"]')
    expect(gridItems.length).toBeGreaterThan(0)
  })
})
