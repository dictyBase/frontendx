import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, describe } from "vitest"
import { iconItems } from "../components/LinksContainer"
import "@testing-library/jest-dom"
import { Header } from "../functional/Header"

describe("header", () => {
  test("should render the logo", () => {
    const { getByRole } = render(<Header />)
    expect(getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("logo"),
    )
    expect(
      getByRole("heading", { name: /Dicty Community Resource/ }),
    ).toBeInTheDocument()
  })
  test("should render the default search component", () => {
    const { getByRole } = render(<Header />)
    expect(getByRole("textbox", { name: /guided search/i })).toBeInTheDocument()
  })
  test("should accept user search input", async () => {
    const user = userEvent.setup()
    const { getByRole } = render(<Header />)
    const input = getByRole("textbox", { name: /Guided Search/ })
    expect(input).toBeEmptyDOMElement()
    await user.type(input, "yomar")
    expect(input).toHaveValue("yomar")
  })
  test("should generate the links ", () => {
    const { getAllByRole } = render(<Header />)
    expect(getAllByRole("link")).toHaveLength(iconItems.length)
  })
  test.each(iconItems)(
    "should have link $href with title $title",
    ({ href, title }) => {
      const { getByRole } = render(<Header />)
      expect(getByRole("link", { name: title })).toHaveAttribute("href", href)
    },
  )
})
