import { expect, test } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { userEvent } from "@testing-library/user-event"
import { SeeAllGenesChip } from "./SeeAllGenesChip"

const SEE_10_TEXT = "See all 10"

const publicationId = "pub123"
const geneCount = 10

test("renders the chip with correct text", () => {
  render(
    <MemoryRouter>
      <SeeAllGenesChip publicationId={publicationId} geneCount={geneCount} />,
    </MemoryRouter>,
  )

  // Check if the chip with the correct text is rendered
  expect(screen.getByText(SEE_10_TEXT)).toBeInTheDocument()
})

test("navigates to the publication references page when clicked", async () => {
  const user = userEvent.setup()
  render(
    <MemoryRouter initialEntries={[`/sadA/references`]}>
      <Routes>
        <Route
          path=":id/references"
          element={
            <SeeAllGenesChip
              publicationId={publicationId}
              geneCount={geneCount}
            />
          }
        />
        <Route
          path=":id/references/:publicationId"
          element={<>Related Genes Page</>}
        />
      </Routes>
    </MemoryRouter>,
  )

  // Get chip and click it
  const chip = screen.getByText(SEE_10_TEXT)
  await user.click(chip)

  // Verify router was called with the correct path
  expect(screen.getByText("Related Genes Page")).toBeInTheDocument()
})

test("displays the correct count when geneCount changes", () => {
  const { rerender } = render(
    <MemoryRouter>
      <SeeAllGenesChip publicationId={publicationId} geneCount={15} />,
    </MemoryRouter>,
  )

  expect(screen.getByText("See all 15")).toBeInTheDocument()

  // Rerender with different gene count
  rerender(
    <MemoryRouter>
      <SeeAllGenesChip publicationId={publicationId} geneCount={20} />,
    </MemoryRouter>,
  )

  expect(screen.getByText("See all 20")).toBeInTheDocument()
})
