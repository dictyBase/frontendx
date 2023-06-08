import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Footer } from "../functional/Footer"
import { footerData } from ".."

test("renders footer with links of footer data", () => {
  render(<Footer />)

  footerData.forEach((footerItem) => {
    const link = screen.getByRole("link", { name: footerItem.label })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", footerItem.url)
  })
})
