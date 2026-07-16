import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { expect, test } from "vitest"
import { CatalogSearchBar } from "../components/CatalogSearchBar"

const TestWrapper = ({
  children,
  initialEntries = ["/"],
}: {
  children: React.ReactNode
  initialEntries?: string[]
}) => (
  <MemoryRouter initialEntries={initialEntries}>
    <Routes>
      <Route path="/" element={children} />
    </Routes>
  </MemoryRouter>
)

test("renders the Search label", () => {
  render(
    <TestWrapper>
      <CatalogSearchBar />
    </TestWrapper>,
  )
  expect(screen.getByText(/^search$/i)).toBeInTheDocument()
})

test("hides the Clear All button when no filters are active", () => {
  render(
    <TestWrapper>
      <CatalogSearchBar />
    </TestWrapper>,
  )
  expect(
    screen.queryByRole("button", { name: /clear all/i }),
  ).not.toBeInTheDocument()
})

test("shows the Clear All button when a non-default type filter is in the URL", () => {
  render(
    <TestWrapper initialEntries={["/?type=BACTERIAL"]}>
      <CatalogSearchBar />
    </TestWrapper>,
  )
  expect(
    screen.getByRole("button", { name: /clear all/i }),
  ).toBeInTheDocument()
})

test("shows a chip with the active type filter label", () => {
  render(
    <TestWrapper initialEntries={["/?type=BACTERIAL"]}>
      <CatalogSearchBar />
    </TestWrapper>,
  )
  expect(screen.getByText(/Type: BACTERIAL/)).toBeInTheDocument()
})

test("does not show type chip when type is the default REGULAR", () => {
  render(
    <TestWrapper initialEntries={["/?type=REGULAR"]}>
      <CatalogSearchBar />
    </TestWrapper>,
  )
  expect(screen.queryByText(/Type:/)).not.toBeInTheDocument()
})

test("clicking Clear All removes the active filter UI", async () => {
  const user = userEvent.setup()
  render(
    <TestWrapper initialEntries={["/?type=GWDI"]}>
      <CatalogSearchBar />
    </TestWrapper>,
  )

  await user.click(screen.getByRole("button", { name: /clear all/i }))

  expect(
    screen.queryByRole("button", { name: /clear all/i }),
  ).not.toBeInTheDocument()
})
