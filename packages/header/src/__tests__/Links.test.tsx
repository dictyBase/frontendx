import { render } from "@testing-library/react"
import { expect, describe, test } from "vitest"
import Links from "../functional/Links"
import { iconItems } from "../components/LinksContainer"

describe("functional links ", () => {
  test("should generate the links ", () => {
    const { getAllByRole } = render(<Links />)
    expect(getAllByRole("link")).toHaveLength(iconItems.length)
  })
  test.each(iconItems)(
    "should have link $href with title $title",
    ({ href, title }) => {
      const { getByRole } = render(<Links />)
      expect(getByRole("link", { name: title })).toHaveAttribute("href", href)
    },
  )
})
