// @flow
import { test, expect } from "vitest"
import { render } from "@testing-library/react"
import Dropdown from "../components/Dropdown"

const props = {
  title: "Dicty Stock Center",
  links: [
    {
      name: "Link 1",
      href: "www.google.com",
    },
    {
      name: "Link 2",
      href: "www.google.com",
    },
    {
      name: "Link 3",
      href: "www.google.com",
    },
    {
      name: "Link 4",
      href: "www.google.com",
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
      items={props.links}
      title={props.title}
      changeDropdown={changeDropdown}
      index={0}
      open={false}
      theme={props.theme}
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
