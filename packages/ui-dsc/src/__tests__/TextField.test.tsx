import { test, expect } from "vitest"
import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, FormProvider, type Resolver } from "react-hook-form"
import { TextField } from "../order/TextField"

type FormValues = {
  firstName: string
}

const errorMessage = "First name is required"

const resolver: Resolver<FormValues> = async (values) => ({
  values: values.firstName ? values : {},
  errors: values.firstName
    ? {}
    : {
        firstName: {
          type: "required",
          message: errorMessage,
        },
      },
})

const WrappedTextField = () => {
  const methods = useForm({ resolver })
  const { handleSubmit } = methods
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(() => {})}>
        <TextField name="firstName" label="First Name" />
        <button type="submit"> Submit </button>
      </form>
    </FormProvider>
  )
}

test("invalid input results in error", async () => {
  render(<WrappedTextField />)

  await userEvent.click(screen.getByRole("button"))

  const fieldLabel = screen.getAllByText("First Name")[0]
  const helperText = screen.getByText(errorMessage)

  expect(fieldLabel).toHaveClass("Mui-error")
  expect(helperText).toBeInTheDocument()
})

test("valid input does not result in error", async () => {
  render(<WrappedTextField />)

  await userEvent.click(screen.getByRole("textbox"))
  await userEvent.keyboard("Kevin")
  await userEvent.click(screen.getByRole("button"))

  const fieldLabel = screen.getAllByText("First Name")[0]
  const helperText = screen.queryByText(errorMessage)

  expect(fieldLabel).not.toHaveClass("Mui-error")
  expect(helperText).toBeNull()
})
