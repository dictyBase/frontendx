import { vi, test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright } from "fp-ts/TaskEither"
import { AuthorizedEmptyStrainList } from "../catalog/AuthorizedEmptyStrainList"

const mockUpdate = vi.fn()

beforeEach(() => {
  mockUpdate.mockClear()
})

vi.mock("../catalog/useAuthorizedUpdateStrain", async () => {
  const actual = await vi.importActual<
    typeof import("../catalog/useAuthorizedUpdateStrain")
  >("../catalog/useAuthorizedUpdateStrain")
  return {
    ...actual,
    useAuthorizedUpdateStrain: () => mockUpdate,
  }
})

vi.mock("../catalog/MorphingCreateButton", () => ({
  MorphingCreateButton: ({
    onAdd,
  }: {
    onAdd: (value: string) => () => unknown
  }) => (
    <div>
      <button
        type="button"
        onClick={() => {
          onAdd("test-value")()
        }}>
        Create
      </button>
      <button
        type="button"
        onClick={() => {
          onAdd("")()
        }}>
        Create Empty
      </button>
    </div>
  ),
}))

test("should render MorphingCreateButton and call update on add", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(TEright({}))

  render(<AuthorizedEmptyStrainList id="DBS0236123" field="characteristics" />)

  const createButton = screen.getByRole("button", { name: /^create$/i })
  expect(createButton).toBeInTheDocument()

  await user.click(createButton)
  expect(mockUpdate).toHaveBeenCalledWith("DBS0236123", {
    characteristics: ["test-value"],
  })
})

test("should not call update when value is empty", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(TEright({}))

  render(<AuthorizedEmptyStrainList id="DBS0236123" field="characteristics" />)

  await user.click(screen.getByRole("button", { name: /create empty/i }))
  expect(mockUpdate).not.toHaveBeenCalled()
})
