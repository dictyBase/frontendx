import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { useForm, FormProvider, type Resolver } from "react-hook-form"
import { PhenotypeReferenceField } from "../catalog/PhenotypeReferenceField"

type FormValues = {
  publication: string
}

const resolver: Resolver<FormValues> = async (values) => ({
  values,
  errors: values.publication
    ? {}
    : {
        publication: {
          type: "required",
          message: "* Reference Publication is required",
        },
      },
})

const WrappedPhenotypeReferenceField = () => {
  const methods = useForm<FormValues>({
    resolver,
    defaultValues: { publication: "" },
  })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <PhenotypeReferenceField />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}

test("should render the Reference text field and accept input", async () => {
  render(<WrappedPhenotypeReferenceField />)
  const input = screen.getByLabelText("* Reference")
  expect(input).toBeInTheDocument()

  await userEvent.type(input, "12345678")
  expect(input).toHaveValue("12345678")
})

test("should display validation error helper text when publication is empty on submit", async () => {
  render(<WrappedPhenotypeReferenceField />)
  await userEvent.click(screen.getByRole("button", { name: "Submit" }))
  expect(
    screen.getByText("* Reference Publication is required"),
  ).toBeInTheDocument()
})
