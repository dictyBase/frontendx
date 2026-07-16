import { render, screen } from "@testing-library/react"
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
