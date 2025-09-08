import { test, expect } from "vitest"
import { userEvent } from "@testing-library/user-event"
import { object, string } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { screen, render } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import { PhoneNumberInput } from "../order/PhoneNumberInput"
import { AdditionalInformation } from "../order/AdditionalInformation"
import { countryToFlag } from "../utils/countryToFlag"

const phoneValidityWarning =
  "The phone number entered for the shipping information appears to be invalid. Please double-check the phone number and make sure the country code is correct."

const phoneNumberKR = "010-6200-0000"
const phoneNumberUS = "(630) 530 8440"
const phoneInputName = "Phone Number"

const defaultValues = {
  phoneCountryCode: "US",
  phone: "",
  additionalInformation: "",
}

const validationSchema = object().shape({
  phoneCountryCode: string().required(),
  phone: string().required("* Phone number is required"),
  additionalInformation: string(),
})

const TestComponent = () => {
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues,
  })

  return (
    <FormProvider {...methods}>
      <PhoneNumberInput name="phone" label="Phone Number" />
      <AdditionalInformation />
    </FormProvider>
  )
}

test("renders a dropdown of countries", async () => {
  const user = userEvent.setup()
  render(<TestComponent />)
  await user.click(screen.getByRole("button", { name: countryToFlag("US") }))
  expect(screen.getByRole("listbox")).toBeVisible()
})

test("renders an text input field", async () => {
  render(<TestComponent />)
  expect(
    screen.getByRole("textbox", { name: phoneInputName }),
  ).toBeInTheDocument()
})

test("Appends a warning message to the `Comments` field if the phone number is invalid", async () => {
  const user = userEvent.setup()
  render(<TestComponent />)

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
  render(<TestComponent />)

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
  render(<TestComponent />)

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
