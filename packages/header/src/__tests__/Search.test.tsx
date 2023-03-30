import { render } from "@testing-library/react"
import { expect, describe, beforeEach, vi, test, Mock } from "vitest"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import { of } from "fp-ts/Option"
import Search from "../functional/Search"

declare module "vitest" {
  export interface TestContext {
    keyPressHandler: Mock<any[], any>
  }
}

type SearchTextContext = {
  keyPressHandler: Mock<any[], any>
}

describe("functional search component", () => {
  test("should render the default search component", () => {
    const { getByRole } = render(<Search />)
    expect(getByRole("textbox", { name: /guided search/i })).toBeInTheDocument()
  })
  test("should accept user search input", async () => {
    const user = userEvent.setup()
    const { getByRole } = render(<Search />)
    const input = getByRole("textbox", { name: /Guided Search/ })
    expect(input).toBeEmptyDOMElement()
    await user.type(input, "yomar")
    expect(input).toHaveValue("yomar")
  })
})

describe("searching with search component", () => {
  beforeEach<SearchTextContext>(async (context) => {
    context.keyPressHandler = vi.fn()
  })
  test<SearchTextContext>("should have user input in the callback", async ({
    keyPressHandler,
  }) => {
    const user = userEvent.setup()
    const { getByRole } = render(
      <Search onKeyPressHandler={of(keyPressHandler)} />,
    )
    const input = getByRole("textbox", { name: /Guided Search/ })
    await user.type(input, "yomar")
    expect(input).toHaveValue("yomar")
    await user.keyboard("[Enter]")
    expect(keyPressHandler).toBeCalled()
    expect(keyPressHandler).toHaveBeenCalledOnce()
    expect(keyPressHandler).toHaveBeenCalledWith({
      input: "yomar",
      path: "/search",
    })
  })
  test<SearchTextContext>("should have user input and search path in the callback", async ({
    keyPressHandler,
  }) => {
    const user = userEvent.setup()
    const { getByRole } = render(
      <Search
        onKeyPressHandler={of(keyPressHandler)}
        searchPath={of("/zod")}
      />,
    )
    const input = getByRole("textbox", { name: /Guided Search/ })
    await user.type(input, "goog")
    await user.keyboard("[Enter]")
    expect(keyPressHandler).toBeCalled()
    expect(keyPressHandler).toHaveBeenCalledOnce()
    expect(keyPressHandler).toHaveBeenCalledWith({
      input: "goog",
      path: "/zod",
    })
  })
})
