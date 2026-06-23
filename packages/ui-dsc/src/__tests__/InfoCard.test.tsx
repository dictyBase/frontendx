import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { expect, test } from "vitest"
import { InfoCard } from "../InfoCard"

const mockLinks = [
  { label: "Link 1", href: "/link1" },
  { label: "Link 2", href: "/link2" },
  { label: "Link 3", href: "/link3" },
]

test("renders InfoCard with title", () => {
  render(
    <MemoryRouter>
      <InfoCard title="Test Title" links={mockLinks} />
    </MemoryRouter>,
  )
  expect(screen.getByText("Test Title")).toBeInTheDocument()
})

test("renders InfoCard with icon", () => {
  render(
    <MemoryRouter>
      <InfoCard title="Test Title" icon="📚" links={mockLinks} />
    </MemoryRouter>,
  )
  expect(screen.getByText("📚")).toBeInTheDocument()
})

test("renders InfoCard without icon", () => {
  render(
    <MemoryRouter>
      <InfoCard title="Test Title" links={mockLinks} />
    </MemoryRouter>,
  )
  expect(screen.queryByText("📚")).not.toBeInTheDocument()
})

test("renders all links", () => {
  render(
    <MemoryRouter>
      <InfoCard title="Test Title" links={mockLinks} />
    </MemoryRouter>,
  )
  expect(screen.getByText("Link 1")).toBeInTheDocument()
  expect(screen.getByText("Link 2")).toBeInTheDocument()
  expect(screen.getByText("Link 3")).toBeInTheDocument()
})

test("links have correct hrefs", () => {
  render(
    <MemoryRouter>
      <InfoCard title="Test Title" links={mockLinks} />
    </MemoryRouter>,
  )
  const links = screen.getAllByRole("link")
  expect(links[0]).toHaveAttribute("href", "/link1")
  expect(links[1]).toHaveAttribute("href", "/link2")
  expect(links[2]).toHaveAttribute("href", "/link3")
})

test("applies custom sx styles", () => {
  const { container } = render(
    <MemoryRouter>
      <InfoCard
        title="Test Title"
        links={mockLinks}
        sx={{ backgroundColor: "yellow" }}
      />
    </MemoryRouter>,
  )
  const card = container.querySelector(".MuiCard-root")
  expect(card).toHaveStyle({ backgroundColor: "yellow" })
})
