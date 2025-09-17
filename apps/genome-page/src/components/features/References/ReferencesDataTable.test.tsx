import { expect, test } from "vitest"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { mockReferencesData } from "mocks/mockReferencesData"
import { ReferencesDataTable } from "./ReferencesDataTable"

const gene = "sadA"
const pathname = `/${gene}/references`

test("Displays text 'Reference' when there is only a single publication item", () => {
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <Routes>
        <Route
          path=":id/references"
          element={
            <ReferencesDataTable
              publications={mockReferencesData.slice(0, 1)}
            />
          }
        />
      </Routes>
    </MemoryRouter>,
  )

  // Renders skeleton loading
  expect(screen.getByText(/1 Reference/)).toBeInTheDocument()
})
test("Displays text 'References' when there are mulitple publication items", () => {
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <Routes>
        <Route
          path=":id/references"
          element={<ReferencesDataTable publications={mockReferencesData} />}
        />
      </Routes>
    </MemoryRouter>,
  )

  // Renders skeleton loading
  expect(screen.getByText(/14 References/)).toBeInTheDocument()
})
