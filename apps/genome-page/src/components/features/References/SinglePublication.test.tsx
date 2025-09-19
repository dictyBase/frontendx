import { vi, test, expect } from "vitest"
import { userEvent } from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { mockReferencesData } from "mocks/mockReferencesData"
import { SinglePublication } from "./SinglePublication"

const testPublication = mockReferencesData[0]

const mockAssign = vi.fn()
vi.stubGlobal("location", { assign: mockAssign })
test("Navigates to the corresponding Publication app when clicked", async () => {
  const user = userEvent.setup()
  render(<SinglePublication publication={testPublication} />)

  await user.click(screen.getByRole("heading", { name: testPublication.title }))

  // console.log(window.location.hostname)
  expect(mockAssign).toHaveBeenCalledOnce()
})
