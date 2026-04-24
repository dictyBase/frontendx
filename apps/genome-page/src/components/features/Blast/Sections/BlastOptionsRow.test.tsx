import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { BlastOptionsRow } from "./BlastOptionsRow"

vi.mock("dicty-graphql-schema", () => {
  const useGeneQuery = vi.fn()
  return { useGeneQuery }
})

test("should render blast options row", async () => {
  render(<BlastOptionsRow />)

  expect(screen.getByText("Options")).toBeInTheDocument()
  expect(screen.getByText("E-value")).toBeInTheDocument()
  expect(screen.getByText("Number of alignments to show")).toBeInTheDocument()
  expect(screen.getByText("Word Size")).toBeInTheDocument()
  expect(screen.getByText("Matrix")).toBeInTheDocument()
  expect(screen.getByText("Gapped alignment")).toBeInTheDocument()
  expect(
    screen.getByText("DUST filter for BLASTN, SEG filter for all others."),
  ).toBeInTheDocument()
})
