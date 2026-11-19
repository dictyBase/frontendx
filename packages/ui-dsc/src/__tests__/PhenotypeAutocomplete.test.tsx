import { vi, expect, test, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { useForm, FormProvider, type Resolver } from "react-hook-form"
import { useListPhenotypesLazyQuery } from "dicty-graphql-schema"
import { PhenotypeAutocomplete } from "../catalog/PhenotypeAutocomplete"

vi.mock("dicty-graphql-schema", () => ({
  useListPhenotypesLazyQuery: vi.fn(),
}))

type FormValues = {
  phenotype: string
}

const mockGetPhenotypes = vi.fn()
const ABERRANT_AGGREGATION = "aberrant aggregation"

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useListPhenotypesLazyQuery).mockReturnValue([
    mockGetPhenotypes,
    {
      data: {
        listPhenotypes: [ABERRANT_AGGREGATION, "wild type"],
      },
      loading: false,
    } as any,
  ])
})

const resolver: Resolver<FormValues> = async (values) => ({
  values,
  errors: values.phenotype
    ? {}
    : {
        phenotype: {
          type: "required",
          message: "* Phenotype is required",
        },
      },
})

const WrappedPhenotypeAutocomplete = () => {
  const methods = useForm<FormValues>({
    resolver,
    defaultValues: { phenotype: "" },
  })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <PhenotypeAutocomplete />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}

test("should render Phenotype autocomplete field and trigger lazy query on input change", async () => {
  render(<WrappedPhenotypeAutocomplete />)
  const input = screen.getByLabelText("* Phenotype")
  expect(input).toBeInTheDocument()

  await userEvent.type(input, "aberrant")
  expect(mockGetPhenotypes).toHaveBeenCalledWith({
    variables: { search: "aberrant" },
  })
})

test("should select and clear an option in PhenotypeAutocomplete", async () => {
  render(<WrappedPhenotypeAutocomplete />)
  const input = screen.getByLabelText("* Phenotype")
  await userEvent.click(input)

  const option = await screen.findByRole("option", {
    name: ABERRANT_AGGREGATION,
  })
  await userEvent.click(option)
  expect(input).toHaveValue(ABERRANT_AGGREGATION)

  const clearButton = screen.getByTitle("Clear")
  await userEvent.click(clearButton)
  expect(input).toHaveValue("")
})

test("should display validation error helper text when phenotype has an error", async () => {
  render(<WrappedPhenotypeAutocomplete />)
  await userEvent.click(screen.getByRole("button", { name: "Submit" }))
  expect(screen.getByText("* Phenotype is required")).toBeInTheDocument()
})

test("should render loading indicator when query is loading", () => {
  vi.mocked(useListPhenotypesLazyQuery).mockReturnValue([
    mockGetPhenotypes,
    { data: undefined, loading: true } as any,
  ])
  render(<WrappedPhenotypeAutocomplete />)
  expect(screen.getByRole("progressbar")).toBeInTheDocument()
})
