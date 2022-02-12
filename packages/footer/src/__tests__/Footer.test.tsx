import { render, screen } from "@testing-library/react"
import { Footer, FooterItem } from "footer"

describe("Footer", () => {
  test("render footer with no links", () => {
    render(<Footer links={[]} />)

    expect(screen.getByText("Dicty Community Resource")).not.toBeNull()
    expect(screen.getByText(/Supported by/)).not.toBeNull()
    expect(screen.getByText("NIH")).not.toBeNull()
    expect(screen.getByText("NIGMS")).not.toBeNull()
  })

  test("render footer with links", () => {
    // Generate links
    const links: Array<FooterItem> = []
    for (let i = 0; i < 5; ++i) {
      links.push({ url: `/link${i + 1}`, description: `Link ${i + 1}` })
    }
    render(<Footer links={links} />)

    expect(screen.getByText("Dicty Community Resource")).not.toBeNull()
    expect(screen.getByText(/Supported by/)).not.toBeNull()

    // Check if generate links are found in the document
    links.forEach((item) =>
      expect(screen.getByText(item.description)).not.toBeNull(),
    )
  })
})