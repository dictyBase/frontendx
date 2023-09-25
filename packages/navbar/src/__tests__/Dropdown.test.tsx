// @flow
import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Dropdown } from "../components/Dropdown"

const testLink = "google.com"

const properties = {
  title: "Dicty Stock Center",
  links: [
    {
      name: "Link 1",
      href: testLink,
    },
    {
      name: "Link 2",
      href: testLink,
    },
    {
      name: "Link 3",
      href: testLink,
    },
    {
      name: "Link 4",
      href: testLink,
    },
  ],
  theme: {
    text: "white",
  },
}

const mockChangeDropdown = vi.fn()

test("should call changeDropdown() with its index when opened", async () => {
  render(
    <Dropdown
      items={properties.links}
      title={properties.title}
      changeDropdown={mockChangeDropdown}
      index={0}
      open={false}
      theme={properties.theme}
    />,
  )
  const { click } = userEvent.setup()
  await click(screen.getByText(/dicty stock center/i))
  expect(mockChangeDropdown).toHaveBeenCalledOnce()
  expect(mockChangeDropdown).toHaveBeenCalledWith(0)
})
test("should call changeDropdown() with -1 when closed", async () => {
  render(
    <Dropdown
      items={properties.links}
      title={properties.title}
      changeDropdown={mockChangeDropdown}
      index={0}
      open
      theme={properties.theme}
    />,
  )
  const { click } = userEvent.setup()
  await click(screen.getByText(/dicty stock center/i))
  expect(mockChangeDropdown).toHaveBeenCalledWith(-1)
})
