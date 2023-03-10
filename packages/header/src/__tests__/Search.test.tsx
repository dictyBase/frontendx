import { render } from "@testing-library/react"
import { expect, describe } from "vitest"
import "@testing-library/jest-dom"
import { some } from "fp-ts/Option"
import Search from "../functional/Search"

describe("functional search component", () => {
  test("should render the default search component", () => {
    const { getByLabelText } = render(<Search />)
    expect(getByLabelText(/guided search/i)).toBeInTheDocument()
  })
  test("should render with new search url", () => {
    const { getByLabelText } = render(<Search searchPath={some("/nosearch")} />)
    expect(getByLabelText(/guided search/i)).toBeInTheDocument()
  })
})
