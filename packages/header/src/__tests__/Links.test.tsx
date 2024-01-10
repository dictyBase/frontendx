import { render } from "@testing-library/react"
import { expect, describe, test } from "vitest"
import { IconButton, SvgIcon, Typography } from "@material-ui/core"
import { Links } from "../functional/Links"
import { defaultIconItems } from "../defaultIconItems"
import { iconButtonPipe } from "../functional/iconButtonPipe"

const LoginButton = () => (
  <IconButton href="/goofy">
    <Typography>Login</Typography>
    <SvgIcon>
      <path d="M14" />
    </SvgIcon>
  </IconButton>
)

const testLinks = [...iconButtonPipe(defaultIconItems), <LoginButton />]

describe("functional links ", () => {
  test("should generate the links ", () => {
    const { getAllByRole, getByRole } = render(<Links links={testLinks} />)
    expect(getAllByRole("link")).toHaveLength(defaultIconItems.length + 1)
    expect(getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "/goofy",
    )
  })

  test.each(defaultIconItems)(
    "should have link $href with title $title",
    ({ href, title }) => {
      const { getByRole } = render(<Links links={testLinks} />)
      expect(getByRole("link", { name: title })).toHaveAttribute("href", href)
    },
  )
})
