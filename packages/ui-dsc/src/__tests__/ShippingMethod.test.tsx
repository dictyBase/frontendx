import { ReactNode } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ShippingMethod } from "../order/ShippingMethod"

type FormWrapperProperties = {
  children: ReactNode
}

const FormWrapper = ({ children }: FormWrapperProperties) => {
  const methods = useForm()

  return <FormProvider {...methods}>{children}</FormProvider>
}

describe("initial render", () => {
  test("renders four radio buttons", () => {
    render(
      <FormWrapper>
        <ShippingMethod />
      </FormWrapper>,
    )
    const radios = screen.getAllByRole("radio")
    expect(radios).toHaveLength(4)
  })

  test("renders one text field", () => {
    render(
      <FormWrapper>
        <ShippingMethod />
      </FormWrapper>,
    )
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })
})

describe("radio button interactions", () => {
  test("removes textbox when clicking prepaid", async () => {
    render(
      <FormWrapper>
        <ShippingMethod />
      </FormWrapper>,
    )
    const waiver = screen.getByRole("radio", {
      name: "Send prepaid shipping label",
    })
    await userEvent.click(waiver)
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
  })
})
