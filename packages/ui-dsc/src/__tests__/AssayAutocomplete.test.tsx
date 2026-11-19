import { vi, expect, test, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { useForm, FormProvider, type Resolver } from "react-hook-form"
import { useListPhenotypeAssaysLazyQuery } from "dicty-graphql-schema"
import { AssayAutocomplete } from "../catalog/AssayAutocomplete"

vi.mock("dicty-graphql-schema", () => ({
  useListPhenotypeAssaysLazyQuery: vi.fn(),
}))

type FormValues = {
  assay: string
}

const mockGetAssays = vi.fn()
const WESTERN_BLOT = "Western blot"

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(useListPhenotypeAssaysLazyQuery).mockReturnValue([
    mockGetAssays,
    {
      data: { listPhenotypeAssays: [WESTERN_BLOT, "Northern blot"] },
      loading: false,
    } as any,
  ])
})

const resolver: Resolver<FormValues> = async (values) => ({
  values,
  errors: values.assay
    ? {}
    : { assay: { type: "required", message: "Assay is required" } },
})

const WrappedAssayAutocomplete = () => {
  const methods = useForm<FormValues>({
    resolver,
    defaultValues: { assay: "" },
  })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <AssayAutocomplete />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  )
}

test("should render Assay autocomplete field and trigger lazy query on input change", async () => {
  render(<WrappedAssayAutocomplete />)
  const input = screen.getByLabelText("Assay")
  expect(input).toBeInTheDocument()

  await userEvent.type(input, "West")
  expect(mockGetAssays).toHaveBeenCalledWith({
    variables: { search: "West" },
  })
})

test("should select and clear an option in AssayAutocomplete", async () => {
  render(<WrappedAssayAutocomplete />)
  const input = screen.getByLabelText("Assay")
  await userEvent.click(input)

  const option = await screen.findByRole("option", { name: WESTERN_BLOT })
  await userEvent.click(option)
  expect(input).toHaveValue(WESTERN_BLOT)

  const clearButton = screen.getByTitle("Clear")
  await userEvent.click(clearButton)
  expect(input).toHaveValue("")
})

test("should display validation error helper text when assay has an error", async () => {
  render(<WrappedAssayAutocomplete />)
  await userEvent.click(screen.getByRole("button", { name: "Submit" }))
  expect(screen.getByText("Assay is required")).toBeInTheDocument()
})

test("should render loading indicator when query is loading", () => {
  vi.mocked(useListPhenotypeAssaysLazyQuery).mockReturnValue([
    mockGetAssays,
    { data: undefined, loading: true } as any,
  ])
  render(<WrappedAssayAutocomplete />)
  expect(screen.getByRole("progressbar")).toBeInTheDocument()
})
