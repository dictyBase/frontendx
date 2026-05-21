import { FC } from "react"
import { test, expect } from "vitest"
import { userEvent } from "@testing-library/user-event"
import { object, string } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { screen, render } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import { PostalCodeInput } from "../order/PostalCodeInput"
import { AdditionalInformation } from "../order/AdditionalInformation"
import { INVALID_POSTAL_CODE_MESSAGE } from "../const"

const postalCodeInputName = "Postal Code"
const validPostalCode = "37450"
const invalidPostalCode = "A1"
const defaultCountry = "United States"

const defaultValues = {
  zip: "",
  country: defaultCountry,
  additionalInformation: "",
}

const validationSchema = object().shape({
  zip: string(),
  country: string(),
  additionalInformation: string(),
})

const TestComponent: FC<{
  values?: { zip: string; country: string; additionalInformation: string }
}> = ({ values = defaultValues }) => {
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    values,
  })

  return (
    <FormProvider {...methods}>
      <PostalCodeInput name="zip" label="Postal Code" />
      <AdditionalInformation />
    </FormProvider>
  )
}

test("Does not append a warning message to the `Comments` field if the postal code is valid", async () => {
  const user = userEvent.setup()
  render(<TestComponent />)

  const postalCodeInput = screen.getByRole("textbox", {
    name: postalCodeInputName,
  })

  const commentTextBox = screen.getByRole("textbox", {
    name: "Comments:",
  })

  // US postal code
  await user.click(postalCodeInput)
  await user.keyboard(validPostalCode)
  // Tab away
  await user.keyboard("[TAB]")
  expect(commentTextBox).toHaveValue("")
})

test("Appends a warning message to the `Comments` field if the postal code is invalid", async () => {
  const user = userEvent.setup()
  render(<TestComponent />)

  const postalCodeInput = screen.getByRole("textbox", {
    name: postalCodeInputName,
  })

  const commentTextBox = screen.getByRole("textbox", {
    name: "Comments:",
  })

  // US postal code
  await user.click(postalCodeInput)
  await user.keyboard(invalidPostalCode)
  // Tab away
  await user.keyboard("[TAB]")
  expect(commentTextBox).toHaveValue(INVALID_POSTAL_CODE_MESSAGE)
})

test("Removes the warning message from the `Comments` if a valid input is entered after an invalid one", async () => {
  const user = userEvent.setup()
  render(
    <TestComponent
      values={{
        country: defaultCountry,
        zip: "",
        additionalInformation: INVALID_POSTAL_CODE_MESSAGE,
      }}
    />,
  )

  const postalCodeInput = screen.getByRole("textbox", {
    name: postalCodeInputName,
  })

  const commentTextBox = screen.getByRole("textbox", {
    name: "Comments:",
  })

  // US postal code
  await user.click(postalCodeInput)
  await user.keyboard(validPostalCode)
  // Tab away
  await user.keyboard("[TAB]")
  expect(commentTextBox).toHaveValue("")
})

test("Does nothing if postal code is valid, but the warning comment is not present", async () => {
  const user = userEvent.setup()
  render(
    <TestComponent
      values={{
        country: defaultCountry,
        zip: "",
        additionalInformation: "Unrelated comment",
      }}
    />,
  )

  const postalCodeInput = screen.getByRole("textbox", {
    name: postalCodeInputName,
  })

  const commentTextBox = screen.getByRole("textbox", {
    name: "Comments:",
  })

  // US postal code
  await user.click(postalCodeInput)
  await user.keyboard(validPostalCode)
  // Tab away
  await user.keyboard("[TAB]")
  expect(commentTextBox).toHaveValue("Unrelated comment")
})
