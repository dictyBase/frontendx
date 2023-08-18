// @flow
import { test, expect } from "vitest"
import { render } from "@testing-library/react"
import { Dropdown } from "../components/DropdownFC"

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

beforeEach(() => {
  const changeDropdown = vi.fn()
  render(
    <Dropdown
      items={properties.links}
      title={properties.title}
      changeDropdown={changeDropdown}
      index={0}
      open={false}
      theme={properties.theme}
    />,
  )
})
afterEach(() => {
  wrapper.unmount()
})
test("should render without crashing", () => {
  expect(wrapper).toHaveLength(1)
})
test("should call changeDropdown() with its index when opened", () => {
  wrapper.find("li").first().simulate("click")
  expect(changeDropdown.mock.calls.length).toEqual(1)
  expect(changeDropdown.mock.calls[0][0]).toBe(0)
})
test("should call changeDropdown() with -1 when closed", () => {
  wrapper.setProps({ open: true })
  wrapper.find("li").first().simulate("click")
  expect(changeDropdown.mock.calls.length).toEqual(1)
  expect(changeDropdown.mock.calls[0][0]).toBe(-1)
})
