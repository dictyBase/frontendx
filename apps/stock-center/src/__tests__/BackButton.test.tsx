import { test, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { BackButton } from "../components/BackButton"

const mockSetOrderStep = vi.fn()

vi.mock("jotai", async () => {
  const originalModule = (await vi.importActual(
    "jotai",
  )) as typeof import("jotai")

  return {
    ...originalModule,
    useSetAtom: () => mockSetOrderStep,
  }
})

test("BackButton component should call setOrderStep when clicked", async () => {
  render(<BackButton />)

  await userEvent.click(screen.getByRole("button", { name: "Back" }))

  expect(mockSetOrderStep).toHaveBeenCalledOnce()
})
