import { screen, render } from "@testing-library/react"
import { renderOnTrue } from "./renderOnTrue"

test("Renders test element when `true` is passed as argument", () => {
  render(renderOnTrue(<> Element has rendered </>)(true))
  expect(screen.getByText("Element has rendered")).toBeInTheDocument()
})

test("Does not render when `false` is passed as argument", () => {
  render(renderOnTrue(<> Element has rendered </>)(false))
  expect(screen.queryByText("Element has rendered")).toBeNull()
})
