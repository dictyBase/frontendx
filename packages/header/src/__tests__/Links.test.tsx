import { render } from "@testing-library/react"
import { expect, describe, test } from "vitest"
import { IconButton, SvgIcon, Typography } from "@material-ui/core"
import { Links } from "../functional/Links"
import { iconItems } from "../components/LinksContainer"

const LoginButton = () => (
  <IconButton href="/goofy">
    <Typography>Login</Typography>
    <SvgIcon>
      <path d="M14" />
    </SvgIcon>
  </IconButton>
)

describe("functional links ", () => {
  test("should generate the links ", () => {
    const { getAllByRole, getByRole } = render(
      <Links LoginOut={<LoginButton />} />,
    )
    expect(getAllByRole("link")).toHaveLength(iconItems.length + 1)
    expect(getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "/goofy",
    )
  })
  test.each(iconItems)(
    "should have link $href with title $title",
    ({ href, title }) => {
      const { getByRole } = render(<Links LoginOut={<p />} />)
      expect(getByRole("link", { name: title })).toHaveAttribute("href", href)
    },
  )
})
