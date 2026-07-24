import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright } from "fp-ts/TaskEither"
import { EditableContentList } from "./EditableContentList"

const mockUpdate = vi.fn()

beforeEach(() => {
  mockUpdate.mockClear()
})

vi.mock("common/hooks/useAuthorizedUpdateGeneGeneralInfo", () => ({
  useAuthorizedUpdateGeneGeneralInfo: () => mockUpdate,
  Errors: {
    ACCESS_TOKEN_ERROR: 0,
    USER_INFO_ERROR: 1,
    UPDATE_FAILURE: 2,
    VALIDATION: 3,
  },
}))

vi.mock("./MorphingButton", () => ({
  MorphingButton: ({ onAdd }: any) => (
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

vi.mock("./DeletableChip", () => ({
  DeletableChip: ({ label, handleDelete }: any) => (
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

test("should render list of items as DeletableChip components", () => {
  mockUpdate.mockReturnValue(() => TEright({}))

  const mockInfoList = ["item1", "item2", "item3"]

  render(
    <EditableContentList
      id="DDB_G0123456"
      field="name_description"
      infoList={mockInfoList}
    />,
  )

  expect(screen.getByText("item1")).toBeInTheDocument()
  expect(screen.getByText("item2")).toBeInTheDocument()
  expect(screen.getByText("item3")).toBeInTheDocument()
})

test("should render MorphingButton component", () => {
  mockUpdate.mockReturnValue(() => TEright({}))

  const mockInfoList = ["item1"]

  render(
    <EditableContentList
      id="DDB_G0123456"
      field="name_description"
      infoList={mockInfoList}
    />,
  )

  expect(screen.getByRole("button", { name: /add item/i })).toBeInTheDocument()
})

test("should render empty list with only MorphingButton", () => {
  mockUpdate.mockReturnValue(() => TEright({}))

  const mockInfoList: Array<string> = []

  render(
    <EditableContentList
      id="DDB_G0123456"
      field="name_description"
      infoList={mockInfoList}
    />,
  )

  expect(screen.getByRole("button", { name: /add item/i })).toBeInTheDocument()
  expect(screen.queryByText(/item1/i)).not.toBeInTheDocument()
})

test("should call update when adding a new item", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(() => TEright({}))

  const mockInfoList = ["item1", "item2"]

  render(
    <EditableContentList
      id="DDB_G0123456"
      field="name_description"
      infoList={mockInfoList}
    />,
  )

  const addButton = screen.getByRole("button", { name: /add item/i })
  await user.click(addButton)

  expect(mockUpdate).toHaveBeenCalledWith("DDB_G0123456", {
    name_description: ["item1", "item2", "new item"],
  })
})

test("should call update when deleting an item", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(() => TEright({}))

  const mockInfoList = ["item1", "item2", "item3"]

  render(
    <EditableContentList
      id="DDB_G0123456"
      field="name_description"
      infoList={mockInfoList}
    />,
  )

  const deleteButton = screen.getByRole("button", { name: /delete item2/i })
  await user.click(deleteButton)

  expect(mockUpdate).toHaveBeenCalledWith("DDB_G0123456", {
    name_description: ["item1", "item3"],
  })
})

test("should not call update when adding empty value", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(() => TEright({}))

  const mockInfoList = ["item1"]

  render(
    <EditableContentList
      id="DDB_G0123456"
      field="name_description"
      infoList={mockInfoList}
    />,
  )

  const addEmptyButton = screen.getByRole("button", { name: /add empty/i })
  await user.click(addEmptyButton)

  expect(mockUpdate).not.toHaveBeenCalled()
})

test("should not call update when adding duplicate value", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(() => TEright({}))

  const mockInfoList = ["item1", "item2"]

  render(
    <EditableContentList
      id="DDB_G0123456"
      field="name_description"
      infoList={mockInfoList}
    />,
  )

  const addDuplicateButton = screen.getByRole("button", {
    name: /add duplicate/i,
  })
  await user.click(addDuplicateButton)

  expect(mockUpdate).not.toHaveBeenCalled()
})
