import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { pipe } from "fp-ts/function"
import { filter } from "fp-ts/Array"
import { LeftColumn } from "../order/LeftColumn"
import { addressFields } from "../order/addressFields"

vi.mock("react-hook-form", () => {
  const originalModule = vi.importActual("react-hook-form")

  return {
    useFormContext: () => ({
      register: () => {},
      formState: { errors: {} },
    }),
    ...originalModule,
  }
})

test("Renders a Text Field for each address field except for country", () => {
  render(<LeftColumn />)
  const queryResult = screen.getAllByRole("textbox")
  const withoutCountry = pipe(
    addressFields,
    filter(({ name }) => name !== "country"),
  )
  expect(queryResult.length).toEqual(withoutCountry.length)
})
