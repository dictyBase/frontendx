import { render, screen } from "@testing-library/react"
import { expect, describe } from "vitest"
import Links from "../functional/Links"

describe("functional links ", () => {
  test("should generate the links ", () => {
    render(<Links />)
    screen.debug()
  })
})
