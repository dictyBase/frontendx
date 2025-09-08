import { test, expect } from "vitest"
import userEvent from "@testing-library/user-event"
import { object, string, InferType, StringSchema } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { screen, render } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import { PhoneNumberInput } from "../order/PhoneNumberInput"
import { countryToFlag } from "../utils/countryToFlag"

const defaultValues = {
  phoneCountryCode: "US",
  phone: "",
}
const validationSchema = object().shape({
  phoneCountryCode: string().required(),
  phone: string().required("* Phone number is required"),
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
    screen.getByRole("textbox", { name: "Phone Number" }),
  ).toBeInTheDocument()
})
