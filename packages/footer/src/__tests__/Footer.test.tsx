import { render, screen } from "@testing-library/react"
import { Footer, FooterItem } from "footer"

describe("Footer", () => {
  test("render footer with no links", () => {
    const title = "dictyBase"
    render(<Footer title={title} links={[]} />)

    expect(screen.getByText(title)).not.toBeNull()
    expect(screen.getByText(/Supported by/)).not.toBeNull()
    expect(screen.getByText("NIH")).not.toBeNull()
    expect(screen.getByText("NIGMS")).not.toBeNull()
  })

  test("render footer with links", () => {
    // Generate links
    const links: Array<FooterItem> = []
    for (let i = 0; i < 5; ++i) {
      links.push({ url: `/link${i + 1}`, label: `Link ${i + 1}` })
    }

    const title = "Dicty Community Resource"

    render(<Footer title={title} links={links} />)

    expect(screen.getByText(title)).not.toBeNull()
    expect(screen.getByText(/Supported by/)).not.toBeNull()

    // Check if generate links are found in the document
    links.forEach((item) => expect(screen.getByText(item.label)).not.toBeNull())
  })
})