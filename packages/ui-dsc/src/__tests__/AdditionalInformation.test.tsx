import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import { AdditionalInformation } from "../order/AdditionalInformation"

const TestComponent = () => {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <AdditionalInformation />
    </FormProvider>
  )
}

test("Renders a text input", () => {
  render(<TestComponent />)
  expect(screen.getByRole("textbox")).toBeInTheDocument()
})
