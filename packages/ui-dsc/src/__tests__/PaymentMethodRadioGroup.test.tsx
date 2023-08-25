import { vi, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, FormProvider, type Resolver } from "react-hook-form"
import { PaymentMethodRadioGroup } from "../order/PaymentMethodRadioGroup"

type FormValues = {
  paymentMethod: "purchaseOrder" | "waiver" | "credit" | "wire"
}

const mockSetPaymentMethod = vi.fn()

const resolver: Resolver<FormValues> = async (values) => ({
  values: values.paymentMethod ? values : {},
  errors: values.paymentMethod
    ? {}
    : {
        paymentMethod: {
          type: "required",
          message: "payment method required.",
        },
      },
})

const FormWrapper = () => {
  const methods = useForm({ resolver })
  const watchPaymentMethod = methods.watch("paymentMethod")
  return (
    <FormProvider {...methods}>
      <PaymentMethodRadioGroup setPaymentMethod={mockSetPaymentMethod} />
      <>{watchPaymentMethod}</>
    </FormProvider>
  )
}

test("changes payment method when radio button is clicked", async () => {
  render(<FormWrapper />)

  await userEvent.click(screen.getByRole("radio", { name: "Waiver Requested" }))

  expect(mockSetPaymentMethod).toHaveBeenCalledTimes(1)
  expect(mockSetPaymentMethod).toHaveBeenCalledWith("waiver")
  expect(screen.getByText("waiver")).toBeInTheDocument()

  await userEvent.click(screen.getByRole("radio", { name: "Credit Card" }))

  expect(mockSetPaymentMethod).toHaveBeenCalledTimes(2)
  expect(mockSetPaymentMethod).toHaveBeenCalledWith("credit")
  expect(screen.getByText("credit")).toBeInTheDocument()

  await userEvent.click(screen.getByRole("radio", { name: "Wire Transfer" }))

  expect(mockSetPaymentMethod).toHaveBeenCalledTimes(3)
  expect(mockSetPaymentMethod).toHaveBeenCalledWith("wire")
  expect(screen.getByText("wire")).toBeInTheDocument()
})
