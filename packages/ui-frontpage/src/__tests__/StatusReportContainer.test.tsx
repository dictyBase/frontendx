import { test, expect, vi, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { none, some } from "fp-ts/Option"
import { Status, UptimeProperties } from "../types"

// useDictyStatus is exercised in its own test; here we drive the container by
// controlling the Option it returns.
const mockUseDictyStatus = vi.fn()
vi.mock("../hooks/useDictyStatus", () => ({
  useDictyStatus: () => mockUseDictyStatus(),
}))

// eslint-disable-next-line import/first
import { StatusReportContainer } from "../StatusReportContainer"

const summaries: Array<UptimeProperties> = [
  {
    name: "GraphQL API",
    url: "https://graphql.dictybase.dev",
    status: Status.UP,
  },
]

const renderContainer = () =>
  render(
    <MemoryRouter>
      <StatusReportContainer />
    </MemoryRouter>,
  )

afterEach(() => {
  mockUseDictyStatus.mockReset()
})

test("shows the unavailable placeholder when there is no status data", () => {
  mockUseDictyStatus.mockReturnValue(none)
  renderContainer()
  expect(screen.getByText("Site Status Unavailable")).toBeInTheDocument()
})

test("shows the live status popover when status data is present", () => {
  mockUseDictyStatus.mockReturnValue(some(summaries))
  renderContainer()
  expect(screen.getByText("Live Site Status")).toBeInTheDocument()
})

test("reserves a fixed height so the status swap does not shift the layout", () => {
  mockUseDictyStatus.mockReturnValue(none)
  const { container } = renderContainer()
  const wrapper = container.firstChild as HTMLElement
  expect(wrapper).toHaveStyle({ minHeight: "2.5rem" })
})
