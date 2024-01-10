import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, describe } from "vitest"
import { defaultIconItems } from "../defaultIconItems"
import { iconButtonPipe } from "../functional/iconButtonPipe"
import "@testing-library/jest-dom"
import { Header } from "../functional/Header"

const testLinks = iconButtonPipe(defaultIconItems)

describe("header", () => {
  test("should render the logo", () => {
    const { getByRole } = render(<Header links={testLinks} />)
    expect(getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("logo"),
    )
    expect(
      getByRole("heading", { name: /Dicty Community Resource/ }),
    ).toBeInTheDocument()
  })
  test("should render the default search component", () => {
    const { getByRole } = render(<Header links={testLinks} />)
    expect(getByRole("textbox", { name: /guided search/i })).toBeInTheDocument()
  })
  test("should accept user search input", async () => {
    const user = userEvent.setup()
    const { getByRole } = render(<Header links={testLinks} />)
    const input = getByRole("textbox", { name: /Guided Search/ })
    expect(input).toBeEmptyDOMElement()
    await user.type(input, "yomar")
    expect(input).toHaveValue("yomar")
  })
  test("should generate the links ", () => {
    const { getAllByRole } = render(<Header links={testLinks} />)
    expect(getAllByRole("link")).toHaveLength(defaultIconItems.length)
  })
  test.each(defaultIconItems)(
    "should have link $href with title $title",
    ({ href, title }) => {
      const { getByRole } = render(<Header links={testLinks} />)
      expect(getByRole("link", { name: title })).toHaveAttribute("href", href)
    },
  )
})
