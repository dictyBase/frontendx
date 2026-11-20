import { vi, expect, test, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { useForm, FormProvider, type Resolver } from "react-hook-form"
import { useListPhenotypeEnvironmentsLazyQuery } from "dicty-graphql-schema"
import { EnvironmentAutocomplete } from "../catalog/EnvironmentAutocomplete"

vi.mock("dicty-graphql-schema", () => ({
  useListPhenotypeEnvironmentsLazyQuery: vi.fn(),
}))

type FormValues = {
  environment: string
}

const mockGetEnvironments = vi.fn()
const CAFFEINE_ENV = "in the presence of caffeine"

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useListPhenotypeEnvironmentsLazyQuery).mockReturnValue([
    mockGetEnvironments,
    {
      data: {
        listPhenotypeEnvironments: [CAFFEINE_ENV, "in darkness"],
      },
      loading: false,
    } as any,
  ])
})

const resolver: Resolver<FormValues> = async (values) => ({
  values,
  errors: values.environment
    ? {}
    : {
        environment: {
          type: "required",
          message: "Environment is required",
        },
      },
})

const WrappedEnvironmentAutocomplete = () => {
  const methods = useForm<FormValues>({
    resolver,
    defaultValues: { environment: "" },
  })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <EnvironmentAutocomplete />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}

test("should render Environment autocomplete field and trigger lazy query on input change", async () => {
  render(<WrappedEnvironmentAutocomplete />)
  const input = screen.getByLabelText("Environment")
  expect(input).toBeInTheDocument()

  await userEvent.type(input, "caffeine")
  expect(mockGetEnvironments).toHaveBeenCalledWith({
    variables: { search: "caffeine" },
  })
})

test("should select and clear an option in EnvironmentAutocomplete", async () => {
  render(<WrappedEnvironmentAutocomplete />)
  const input = screen.getByLabelText("Environment")
  await userEvent.click(input)

  const option = await screen.findByRole("option", {
    name: CAFFEINE_ENV,
  })
  await userEvent.click(option)
  expect(input).toHaveValue(CAFFEINE_ENV)

  const clearButton = screen.getByTitle("Clear")
  await userEvent.click(clearButton)
  expect(input).toHaveValue("")
})

test("should display validation error helper text when environment has an error", async () => {
  render(<WrappedEnvironmentAutocomplete />)
  await userEvent.click(screen.getByRole("button", { name: "Submit" }))
  expect(screen.getByText("Environment is required")).toBeInTheDocument()
})

test("should render loading indicator when query is loading", () => {
  vi.mocked(useListPhenotypeEnvironmentsLazyQuery).mockReturnValue([
    mockGetEnvironments,
    { data: undefined, loading: true } as any,
  ])
  render(<WrappedEnvironmentAutocomplete />)
  expect(screen.getByRole("progressbar")).toBeInTheDocument()
})
