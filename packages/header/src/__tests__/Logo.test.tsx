import { render } from "@testing-library/react"
import { expect, describe } from "vitest"
import "@testing-library/jest-dom"
import { some } from "fp-ts/Option"
import { Logo } from "../functional/Logo"

describe("functional logo", () => {
  test("should render the logo", () => {
    const { getByRole } = render(<Logo frontPageUrl="/" />)
    expect(getByRole("img")).toBeInTheDocument()
    expect(getByRole("img"))
    expect(getByRole("heading")).toBeInTheDocument()
    expect(getByRole("heading")).toHaveTextContent("Dicty Community Resource")
  })
  test("should render the logo with custom title", () => {
    const { getByRole } = render(
      <Logo frontPageUrl="/" title={some("dictyBase")} />,
    )
    expect(getByRole("heading")).toHaveTextContent("dictyBase")
  })
})
