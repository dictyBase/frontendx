import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, describe } from "vitest"
import { createDefaultIconItems } from "../defaultIconItems"
import { iconButtonPipe } from "../functional/iconButtonPipe"
import "@testing-library/jest-dom"
import { Header } from "../functional/Header"

const frontPageUrl = "http://localhost:3004"
const testLinks = iconButtonPipe(createDefaultIconItems(frontPageUrl))

describe("header", () => {
  test("should render the logo", () => {
    const { getByRole } = render(
      <Header frontPageUrl={frontPageUrl} links={testLinks} />,
    )
    expect(getByRole("img"))
    expect(
      getByRole("heading", { name: /Dicty Community Resource/ }),
    ).toBeInTheDocument()
  })
  test("should render the default search component", () => {
    const { getByRole } = render(
      <Header frontPageUrl={frontPageUrl} links={testLinks} />,
    )
    expect(getByRole("textbox", { name: /guided search/i })).toBeInTheDocument()
  })
  test("should accept user search input", async () => {
    const user = userEvent.setup()
    const { getByRole } = render(
      <Header frontPageUrl={frontPageUrl} links={testLinks} />,
    )
    const input = getByRole("textbox", { name: /Guided Search/ })
    expect(input).toBeEmptyDOMElement()
    await user.type(input, "yomar")
    expect(input).toHaveValue("yomar")
  })
  test("should generate the links ", () => {
    const { getAllByRole } = render(
      <Header frontPageUrl={frontPageUrl} links={testLinks} />,
    )
    expect(getAllByRole("link")).toHaveLength(testLinks.length + 1)
  })
  test.each([
    {
      href: `/community/citation/show`,
      title: "Cite Us",
    },
    {
      href: `/downloads`,
      title: "Downloads",
    },
    {
      href: `/about/show`,
      title: "About dictybase",
    },
  ])("should have link $href with title $title", ({ href, title }) => {
    const { getByRole } = render(
      <Header frontPageUrl={frontPageUrl} links={testLinks} />,
    )
    expect(getByRole("link", { name: title })).toHaveAttribute(
      "href",
      `${frontPageUrl}${href}`,
    )
  })
})
