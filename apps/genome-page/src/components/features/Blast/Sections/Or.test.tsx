import { vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Or } from "./Or"

vi.mock("dicty-graphql-schema", () => {
  const useGeneQuery = vi.fn()
  return { useGeneQuery }
})

test("should render or", async () => {
  render(<Or />)

  expect(screen.getByText("OR")).toBeInTheDocument()
})
