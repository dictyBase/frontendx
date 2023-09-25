import { render } from "@testing-library/react"
import { expect, describe, test } from "vitest"
import { Links } from "../functional/Links"
import { iconItems } from "../components/LinksContainer"
import { IconButton, SvgIcon, Typography } from "@material-ui/core"

const LoginButton = () => {
  return (
    <IconButton href="/goofy">
      <Typography variant="subtitle2" style={{ display: "flex" }}>
        Login
      </Typography>
      <SvgIcon>
        <path d="M14" />
      </SvgIcon>
    </IconButton>
  )
}

describe("functional links ", () => {
  test("should generate the links ", () => {
    const { getAllByRole } = render(<Links LoginOut={<LoginButton />} />)
    expect(getAllByRole("link")).toHaveLength(iconItems.length + 1)
  })
  test.each(iconItems)(
    "should have link $href with title $title",
    ({ href, title }) => {
      const { getByRole } = render(<Links />)
      expect(getByRole("link", { name: title })).toHaveAttribute("href", href)
    },
  )
})
