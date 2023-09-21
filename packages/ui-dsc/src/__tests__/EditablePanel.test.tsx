import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { EditablePanel } from "../home/EditablePanel"

test("renders an editor it receives valid content data", () => {
  render(<EditablePanel slug="" skeletonCount={10} />)

  expect(screen.getByText(/Content coming soon/)).toBeInTheDocument()
})
