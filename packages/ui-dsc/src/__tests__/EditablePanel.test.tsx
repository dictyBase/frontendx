import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { EditablePanel } from "../home/EditablePanel"
import { sampleText } from "../mocks/mockContent"

test("renders an editor it receives valid content data", () => {
  render(<EditablePanel slug="" skeletonCount={10} />)

  expect(screen.getByText(sampleText)).toBeInTheDocument()
})
