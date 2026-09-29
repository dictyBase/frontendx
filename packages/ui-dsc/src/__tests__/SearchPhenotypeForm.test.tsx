import { vi, test, expect, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { SearchPhenotypeForm } from "../catalog/SearchPhenotypeForm"

const navigateMock = vi.fn()
let mockName: string | undefined

vi.mock("react-router-dom", async () => {
  const originalModule =
    await vi.importActual<typeof import("react-router-dom")>("react-router-dom")
  return {
    ...originalModule,
    useNavigate: () => navigateMock,
    useParams: () => ({ name: mockName }),
  }
})

beforeEach(() => {
  navigateMock.mockClear()
  mockName = undefined
})

test("renders a text input labelled Phenotype", () => {
  render(
    <MemoryRouter>
      <SearchPhenotypeForm />
    </MemoryRouter>,
  )
  expect(screen.getByLabelText("Phenotype")).toBeInTheDocument()
})

test("renders a disabled search button when input is empty", () => {
  render(
    <MemoryRouter>
      <SearchPhenotypeForm />
    </MemoryRouter>,
  )
  const button = screen.getByRole("button", { name: "Search" })
  expect(button).toBeDisabled()
})

test("enables search button when text is entered", async () => {
  render(
    <MemoryRouter>
      <SearchPhenotypeForm />
    </MemoryRouter>,
  )
  const input = screen.getByLabelText("Phenotype")
  await userEvent.type(input, "wild type")
  const button = screen.getByRole("button", { name: "Search" })
  expect(button).not.toBeDisabled()
})

test("navigates to phenotype route on submit with encoded URL segment", async () => {
  render(
    <MemoryRouter>
      <SearchPhenotypeForm />
    </MemoryRouter>,
  )
  const input = screen.getByLabelText("Phenotype")
  await userEvent.type(input, "abolished protein phosphorylation")
  const button = screen.getByRole("button", { name: "Search" })
  await userEvent.click(button)
  expect(navigateMock).toHaveBeenCalledWith(
    "/phenotypes/abolished+protein+phosphorylation",
  )
})

test("navigates when selecting an option from the autocomplete", async () => {
  render(
    <MemoryRouter>
      <SearchPhenotypeForm />
    </MemoryRouter>,
  )
  const input = screen.getByLabelText("Phenotype")
  await userEvent.type(input, "aberrant aggreg")
  // the dropdown should show matching options
  const option = await screen.findByRole("option", {
    name: "aberrant aggregation",
  })
  await userEvent.click(option)
  expect(navigateMock).toHaveBeenCalledWith("/phenotypes/aberrant+aggregation")
})

test("navigates on Enter when no matching options are shown", async () => {
  render(
    <MemoryRouter>
      <SearchPhenotypeForm />
    </MemoryRouter>,
  )
  const input = screen.getByLabelText("Phenotype") as HTMLInputElement
  await userEvent.clear(input)
  await userEvent.type(input, "custom phenotype query")
  // Close any dropdown, then fire Enter directly on the input
  await userEvent.keyboard("{Escape}")
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" })
  expect(navigateMock).toHaveBeenCalledWith(
    "/phenotypes/custom+phenotype+query",
  )
})

test("does not navigate if input is only whitespace", async () => {
  render(
    <MemoryRouter>
      <SearchPhenotypeForm />
    </MemoryRouter>,
  )
  const input = screen.getByLabelText("Phenotype")
  await userEvent.type(input, "   ")
  const button = screen.getByRole("button", { name: "Search" })
  expect(button).toBeDisabled()
  await userEvent.keyboard("{Enter}")
  expect(navigateMock).not.toHaveBeenCalled()
})

test("prefills input from url name param when present", () => {
  mockName = "wild+type"
  render(
    <MemoryRouter>
      <SearchPhenotypeForm />
    </MemoryRouter>,
  )
  const input = screen.getByLabelText("Phenotype")
  expect(input).toHaveValue("wild type")
})
