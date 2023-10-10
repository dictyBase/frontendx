import { ReactNode } from "react"
import { describe, test, expect } from "vitest"
import { useForm, FormProvider } from "react-hook-form"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PaymentMethod } from "../order/PaymentMethod"

type FormWrapperProperties = {
  children: ReactNode
}

const FormWrapper = ({ children }: FormWrapperProperties) => {
  const methods = useForm({ defaultValues: { paymentMethod: "purchaseOrder" } })

  return <FormProvider {...methods}>{children}</FormProvider>
}

describe("OrderForm/Payment/PaymentMethod", () => {
  describe("initial render", () => {
    test("renders four radio buttons", () => {
      render(
        <FormWrapper>
          <PaymentMethod />
        </FormWrapper>,
      )
      const radios = screen.getAllByRole("radio")
      expect(radios).toHaveLength(4)
    })

    test("renders one text field", () => {
      render(
        <FormWrapper>
          <PaymentMethod />
        </FormWrapper>,
      )
      expect(screen.getByRole("textbox")).toBeInTheDocument()
    })
  })

  describe("radio button interactions", () => {
    test("removes textbox when clicking waiver", async () => {
      render(
        <FormWrapper>
          <PaymentMethod />
        </FormWrapper>,
      )
      const waiver = screen.getByRole("radio", {
        name: "Waiver Requested",
      })
      await userEvent.click(waiver)
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
    })

    test("removes textbox when clicking credit", async () => {
      render(
        <FormWrapper>
          <PaymentMethod />
        </FormWrapper>,
      )
      const credit = screen.getByRole("radio", {
        name: "Credit Card",
      })
      await userEvent.click(credit)
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
    })

    test("removes textbox when clicking wire", async () => {
      render(
        <FormWrapper>
          <PaymentMethod />
        </FormWrapper>,
      )
      const wire = screen.getByRole("radio", {
        name: "Wire Transfer",
      })
      await userEvent.click(wire)
      expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
    })
  })
})
