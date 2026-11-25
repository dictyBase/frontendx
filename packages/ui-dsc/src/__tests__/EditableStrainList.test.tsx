import { vi, test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright } from "fp-ts/TaskEither"
import { EditableStrainList } from "../catalog/EditableStrainList"

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

vi.mock("../catalog/MorphingButton", () => ({
  MorphingButton: ({ onAdd }: { onAdd: (value: string) => () => unknown }) => (
    <div>
      <button
        type="button"
        onClick={() => {
          onAdd("new item")()
        }}>
        Add Item
      </button>
      <button
        type="button"
        onClick={() => {
          onAdd("")()
        }}>
        Add Empty
      </button>
      <button
        type="button"
        onClick={() => {
          onAdd("item1")()
        }}>
        Add Duplicate
      </button>
    </div>
  ),
}))

vi.mock("../catalog/DeletableChip", () => ({
  DeletableChip: ({
    label,
    handleDelete,
  }: {
    label: string
    handleDelete: (value: string) => () => unknown
  }) => (
    <div>
      <span>{label}</span>
      <button
        type="button"
        onClick={() => {
          handleDelete(label)()
        }}>
        Delete {label}
      </button>
    </div>
  ),
}))

test("should render list of items and MorphingButton", () => {
  mockUpdate.mockReturnValue(TEright({}))

  render(
    <EditableStrainList
      id="DBS0236123"
      field="names"
      infoList={["item1", "item2"]}
    />,
  )

  expect(screen.getByText("item1")).toBeInTheDocument()
  expect(screen.getByText("item2")).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /add item/i })).toBeInTheDocument()
})

test("should call update when adding a new item", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(TEright({}))

  render(
    <EditableStrainList
      id="DBS0236123"
      field="names"
      infoList={["item1", "item2"]}
    />,
  )

  await user.click(screen.getByRole("button", { name: /add item/i }))

  expect(mockUpdate).toHaveBeenCalledWith("DBS0236123", {
    names: ["item1", "item2", "new item"],
  })
})

test("should call update when deleting an item", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(TEright({}))

  render(
    <EditableStrainList
      id="DBS0236123"
      field="names"
      infoList={["item1", "item2", "item3"]}
    />,
  )

  await user.click(screen.getByRole("button", { name: /delete item2/i }))

  expect(mockUpdate).toHaveBeenCalledWith("DBS0236123", {
    names: ["item1", "item3"],
  })
})

test("should not call update when adding empty or duplicate value", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(TEright({}))

  render(
    <EditableStrainList
      id="DBS0236123"
      field="names"
      infoList={["item1", "item2"]}
    />,
  )

  await user.click(screen.getByRole("button", { name: /add empty/i }))
  await user.click(screen.getByRole("button", { name: /add duplicate/i }))

  expect(mockUpdate).not.toHaveBeenCalled()
})
