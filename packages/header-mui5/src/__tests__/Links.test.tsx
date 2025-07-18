import { render } from "@testing-library/react"
import { expect, describe, test } from "vitest"
import { IconButton, SvgIcon, Typography } from "@mui/material"
import { Links } from "../functional/Links"
import { createDefaultIconItems } from "../defaultIconItems"
import { iconButtonPipe } from "../functional/iconButtonPipe"

const LoginButton = () => (
  <IconButton href="/goofy" size="large">
    <Typography>Login</Typography>
    <SvgIcon>
      <path d="M14" />
    </SvgIcon>
  </IconButton>
)

const testLinks = [
  ...iconButtonPipe(createDefaultIconItems("")), // oxlint-disable jsx-key
  <LoginButton />, // oxlint-disable jsx-key
]

describe("functional links", () => {
  test("should generate the links", () => {
    const { getAllByRole, getByRole } = render(<Links links={testLinks} />)
    expect(getAllByRole("link")).toHaveLength(testLinks.length)
    expect(getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "/goofy",
    )
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
    const { getByRole } = render(<Links links={testLinks} />)
    expect(getByRole("link", { name: title })).toHaveAttribute("href", href)
  })
})
