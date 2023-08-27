import { vi, describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ShippingMethod } from "../order/ShippingMethod"

vi.mock("react-hook-form", () => {
  const originalModule = vi.importActual("react-hook-form")

  return {
    ...originalModule,
    useFormContext: () => ({
      getValues: () => "shippingAccount",
      setValue: () => {},
      resetField: () => {},
      register: () => {},
      formState: { errors: {} },
    }),
  }
})

describe("initial render", () => {
  test("renders four radio buttons", () => {
    render(<ShippingMethod />)
    const radios = screen.getAllByRole("radio")
    expect(radios).toHaveLength(4)
  })

  test("renders one text field", () => {
    render(<ShippingMethod />)
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})

describe("radio button interactions", () => {
  test("removes textbox when clicking prepaid", async () => {
    render(<ShippingMethod />)
    const waiver = screen.getByRole("radio", {
      name: "Send prepaid shipping label",
    })
    await userEvent.click(waiver)
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
  })
})
