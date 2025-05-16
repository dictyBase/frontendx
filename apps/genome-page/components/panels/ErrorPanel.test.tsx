import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ErrorPanel } from "./ErrorPanel"

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (properties: any) => (
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    <img {...properties} />
  ),
}))

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

describe("ErrorPanel", () => {
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
    render(<ErrorPanel />)

    // Check that the panel title is rendered
    expect(screen.getByText("Error Information")).toBeInTheDocument()

    // Check that default error message is rendered
    expect(screen.getByText("Sorry, something went wrong.")).toBeInTheDocument()

    // Check that default details are rendered
    expect(
      screen.getByText(
        "The server encountered an internal error and was unable to complete your request.",
      ),
    ).toBeInTheDocument()

    // Check that supportEmail is rendered
    expect(screen.getByText("dictybase@northwestern.edu")).toBeInTheDocument()

    // Check that action buttons are rendered
    expect(screen.getByText("Refresh Page")).toBeInTheDocument()
    expect(screen.getByText("Return to Homepage")).toBeInTheDocument()
  })

  it("renders with custom props", () => {
    const customProperties = {
      title: "Custom Error Title",
      message: "Custom error message",
      details: "Custom error details",
      supportEmail: "custom@example.com",
    }

    render(<ErrorPanel {...customProperties} />)

    // Check that custom properties are rendered
    expect(screen.getByText(customProperties.title)).toBeInTheDocument()
    expect(screen.getByText(customProperties.message)).toBeInTheDocument()
    expect(screen.getByText(customProperties.details)).toBeInTheDocument()
    expect(screen.getByText(customProperties.supportEmail)).toBeInTheDocument()
  })

  it("calls window.location.reload when refresh button is clicked", async () => {
    const user = userEvent.setup()
    render(<ErrorPanel />)

    // Click the refresh button
    await user.click(screen.getByText("Refresh Page"))

    // Verify that window.location.reload was called
    expect(window.location.reload).toHaveBeenCalled()
  })

  it("renders all suggested actions", () => {
    render(<ErrorPanel />)

    // Check that all suggested actions are rendered
    expect(screen.getByText("Refresh the page")).toBeInTheDocument()
    expect(
      screen.getByText("Check your internet connection"),
    ).toBeInTheDocument()
    expect(screen.getByText("Try again later")).toBeInTheDocument()
  })

  it("has a link to the homepage", () => {
    render(<ErrorPanel />)

    // Get the home link and verify its href
    const homeLink = screen.getByText("Return to Homepage").closest("a")
    expect(homeLink).toHaveAttribute("href", "/")
  })

  it("has a mailto link with the support email", () => {
    const supportEmail = "test@example.com"
    render(<ErrorPanel supportEmail={supportEmail} />)

    // Get the email link and verify its href
    const emailLink = screen.getByText(supportEmail).closest("a")
    expect(emailLink).toHaveAttribute("href", `mailto:${supportEmail}`)
  })
})
