import { test, expect, describe } from "vitest"
import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { countryToFlag } from "@dictybase/ui-dsc"
import { ShippingPage } from "../components/ShippingPage"

const phoneValidityWarning =
  "The phone number entered for the shipping information appears to be invalid. Please double-check the phone number and make sure the country code is correct."

const phoneNumberKR = "010-6200-0000"
const phoneNumberUS = "(630) 530 8440"
const phoneInputName = "Phone Number"

describe("Phone Number Input", () => {
  test("renders a dropdown of countries", async () => {
    const user = userEvent.setup()
    render(<ShippingPage />)

    await user.click(screen.getByRole("button", { name: countryToFlag("US") }))
    expect(screen.getByRole("listbox")).toBeVisible()
  })

  test("Appends a warning message to the `Comments` field if the phone number is invalid", async () => {
    const user = userEvent.setup()
    render(<ShippingPage />)

    const phoneNumberInput = screen.getByRole("textbox", {
      name: phoneInputName,
    })

    const commentTextBox = screen.getByRole("textbox", {
      name: "Comments:",
    })

    // US phone number
    await user.click(phoneNumberInput)
    await user.keyboard(phoneNumberUS)
    // Tab away
    await user.keyboard("[TAB]")
    expect(commentTextBox).toHaveValue("")

    await user.click(screen.getByRole("button", { name: countryToFlag("US") }))
    await user.click(screen.getByRole("option", { name: /Korea, Republic of/ }))

    await user.click(phoneNumberInput)
    await user.keyboard(phoneNumberKR)
    // Tab away
    await user.keyboard("[TAB]")
    expect(commentTextBox).toHaveValue(phoneValidityWarning)
  })

  test("Removes the warning message from the `Comments` the phone number input is cleared", async () => {
    const user = userEvent.setup()
    render(<ShippingPage />)

    const phoneNumberInput = screen.getByRole("textbox", {
      name: phoneInputName,
    })

    const commentTextBox = screen.getByRole("textbox", {
      name: "Comments:",
    })

    await user.click(phoneNumberInput)
    // US country code selected by default; Entering KR phone number should append a warning.
    await user.keyboard(phoneNumberKR)
    // Tab away
    await user.keyboard("[TAB]")
    expect(commentTextBox).toHaveValue(phoneValidityWarning)

    await user.clear(phoneNumberInput)
    await user.keyboard("[TAB]")
    expect(commentTextBox).toHaveValue("")
  })

  test("Removes the warning message from the `Comments` if a valid phone number is entered", async () => {
    const user = userEvent.setup()
    render(<ShippingPage />)

    const phoneNumberInput = screen.getByRole("textbox", {
      name: phoneInputName,
    })

    const commentTextBox = screen.getByRole("textbox", {
      name: "Comments:",
    })

    await user.click(phoneNumberInput)
    // US country code selected by default; Entering KR phone number should append a warning.
    await user.keyboard(phoneNumberKR)
    // Tab away
    await user.keyboard("[TAB]")
    expect(commentTextBox).toHaveValue(phoneValidityWarning)

    await user.clear(phoneNumberInput)
    await user.click(phoneNumberInput)
    await user.keyboard(phoneNumberUS)
    // Tab away
    await user.keyboard("[TAB]")
    expect(commentTextBox).toHaveValue("")
  })
})
