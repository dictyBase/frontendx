import { describe, test, expect } from "vitest"
import { pipe } from "fp-ts/function"
import { filter, map, reduce } from "fp-ts/Array"
import { screen, render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, FormProvider, type Resolver } from "react-hook-form"
import { CountryDropdown, countryToFlag } from "../order/CountryDropdown"

type FormValues = {
  country: string
  payerCountry: string
}

const convertToObjectArray = (values: FormValues): Array<[string, string]> => [
  ["country", values.country],
  ["payerCountry", values.payerCountry],
]

const getErrors = (values: FormValues) =>
  pipe(
    values,
    convertToObjectArray,
    filter(([, value]) => !value),
    map(([fieldName]) => ({
      [fieldName]: { type: "required", message: `${fieldName} is required` },
    })),
    reduce({}, (accumulator, current) => ({ ...accumulator, ...current })),
  )

const resolver: Resolver<FormValues> = async (values) => ({
  values,
  errors: getErrors(values),
})

const WrappedCountryDropdown = ({ fieldName }: { fieldName: string }) => {
  const methods = useForm({ resolver })
  const { handleSubmit } = methods
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(() => {})}>
        <CountryDropdown fieldName={fieldName} />
        <button type="submit"> Submit </button>
      </form>
    </FormProvider>
  )
}

describe("CountryDropdown", () => {
  test("invalid input results in error", async () => {
    render(<WrappedCountryDropdown fieldName="country" />)

    await userEvent.click(screen.getByText("Submit"))

    const fieldLabel = screen.getAllByText("Country")[0]
    const helperText = screen.getByText("country is required")

    expect(fieldLabel).toHaveClass("Mui-error")
    expect(helperText).toBeInTheDocument()
  })

  test("valid input does not result in error", async () => {
    render(<WrappedCountryDropdown fieldName="country" />)

    await userEvent.click(screen.getByTitle("Open"))
    await userEvent.click(screen.getByText(/Brazil/))
    await userEvent.click(screen.getByText("Submit"))

    const fieldLabel = screen.getAllByText("Country")[0]
    const helperText = screen.queryByText("country is required")

    expect(fieldLabel).not.toHaveClass("Mui-error")
    expect(helperText).toBeNull()
  })
  test(`passing "payerCountry" to fieldName prop registers the field to "payerCountry" form property`, async () => {
    render(<WrappedCountryDropdown fieldName="payerCountry" />)

    await userEvent.click(screen.getByTitle("Open"))
    await userEvent.click(screen.getByText(/Brazil/))
    await userEvent.click(screen.getByText("Submit"))

    const fieldLabel = screen.getAllByText("Country")[0]
    const helperText = screen.queryByText("payerCountry is required")

    expect(fieldLabel).not.toHaveClass("Mui-error")
    expect(helperText).toBeNull()
  })
})

describe("countryToFlag", () => {
  test("should return expected string", () => {
    expect(countryToFlag("IS")).toBe("🇮🇸")
  })
  test("should return isoCode if String.fromCodePoint is invalid", () => {
    // @ts-ignore
    global.String.fromCodePoint = undefined
    expect(countryToFlag("IS")).toBe("IS")
  })
})
