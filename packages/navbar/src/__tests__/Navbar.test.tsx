import { vi, test, expect, beforeAll } from "vitest"
import { render, screen } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
import { Navbar } from "../components/Navbar"
// import { Brand } from "../components/Brand"
// import { Dropdown } from "../components/Dropdown"
// import { Link } from "../components/Link"
// import { MenuIcon } from "../components/MenuIcon"

// const nativeEvent = { nativeEvent: { stopImmediatePropagation: () => {} } }
const testLink = "www.google.com"
const properties = {
  items: [
    {
      dropdown: true,
      title: "Dropdown 1",
      items: [
        {
          name: "Link 1",
          href: testLink,
        },
        {
          name: "Link 2",
          href: testLink,
        },
      ],
    },
    {
      dropdown: true,
      title: "Dropdown 2",
      items: [
        {
          name: "Link 1",
          href: testLink,
        },
        {
          name: "Link 2",
          href: "wwww.google.com",
        },
      ],
    },
    {
      dropdown: false,
      title: "Visible Link 1",
      href: testLink,
    },
    {
      dropdown: false,
      title: "Visible Link 2",
      href: testLink,
    },
    {
      element: <div> Arbitrary Element </div>,
    },
  ],
  brand: {
    title: "Brand",
    href: "google.com",
  },
  theme: {},
}
const mockSetOpen = vi.fn()

beforeAll(() => {
  vi.mock("react", async () => {
    const originalModule = await vi.importActual<typeof import("react")>(
      "react",
    )
    return {
      ...originalModule,
      useState: () => [false, mockSetOpen],
    }
  })
})

beforeEach(() => {
  render(<Navbar {...properties} />)
})

test("should render a brand if one is specified", () => {
  expect(screen.getByText("Brand")).toBeInTheDocument()
})
test("should render the correct number of visible Links", () => {
  const visibleLinks = screen.getAllByRole("link", { name: /Visible Link/ })
  expect(visibleLinks).toHaveLength(2)
  expect(visibleLinks[0]).toBeVisible()
  expect(visibleLinks[1]).toBeVisible()
})
test("should render the correct number of dropdowns", () => {
  expect(screen.getAllByText(/dropdown/i)).toHaveLength(2)
})
test("should render arbitrary elements if they are provided", () => {
  expect(screen.getByText(/Arbitrary Element/)).toBeInTheDocument()
})
// test.todo('should call toggle() when the menu icon is clicked', () => {
//     wrapper.instance().toggle = jest.fn()
//     wrapper.update()
//     wrapper.find(MenuIcon).simulate('click')
//     expect(wrapper.instance().toggle.mock.calls.length).toEqual(1)
// })
// test.todo("should call open() if toggled while closed", () => {
//   const { click } = userEvent.setup()

//   const MenuIcon = screen.getByTestId("menu-icon")

//   wrapper.find(MenuIcon).simulate("click", nativeEvent)
//   expect(wrapper.instance().open.mock.calls.length).toEqual(1)
// })
// test.todo("should call close() if toggled while open", () => {
//   wrapper.instance().close = jest.fn()
//   wrapper.update()
//   wrapper.setState({ open: true })
//   wrapper.find(MenuIcon).simulate("click", nativeEvent)
//   expect(wrapper.instance().close.mock.calls.length).toEqual(1)
// })
// test.todo(
//   "should set its active index to that of any dropdown that is opened",
//   () => {
//     wrapper.find(Dropdown).first().find("li").first().simulate("click")
//     expect(wrapper.state("activeIndex")).toEqual(0)
//   },
// )
// test.todo(
//   "should set its active index to that of any dropdown that is opened while another dropdown is open",
//   () => {
//     wrapper.setState({ activeIndex: 1 })
//     wrapper.find(Dropdown).first().find("li").first().simulate("click")
//     expect(wrapper.state("activeIndex")).toEqual(0)
//   },
// )
// test.todo("should set its active index to -1 if a dropdown is closed", () => {
//   wrapper.setState({ activeIndex: 0 })
//   wrapper.find(Dropdown).first().find("li").first().simulate("click")
//   expect(wrapper.state("activeIndex")).toEqual(-1)
// })
// test.todo("should set its active index to -1 if it is closed", () => {
//   wrapper.setState({ activeIndex: 0, open: true })
//   wrapper.find(MenuIcon).simulate("click", nativeEvent)
//   expect(wrapper.state("activeIndex")).toEqual(-1)
// })
