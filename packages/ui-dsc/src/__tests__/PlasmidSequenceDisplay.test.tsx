import { test, expect } from "vitest"
import { render, screen, getDefaultNormalizer } from "@testing-library/react"
import { mockPlasmidSequence } from "../mocks/mockPlasmidSequence"
import { PlasmidSequenceDisplay } from "../catalog/PlasmidSequenceDisplay"

test("renders plasmid sequence correctly if available", async () => {
  render(<PlasmidSequenceDisplay sequence={mockPlasmidSequence} />)
  expect(
    screen.getByText(mockPlasmidSequence, {
      normalizer: getDefaultNormalizer({ collapseWhitespace: false }),
    }),
  ).toBeInTheDocument()
})
