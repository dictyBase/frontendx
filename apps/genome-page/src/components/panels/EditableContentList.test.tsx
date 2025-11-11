import { render, screen } from "@testing-library/react"
import { right } from "fp-ts/TaskEither"
import { EditableContentList } from "./EditableContentList"

const mockUpdate = vi.fn()

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
    <button type="button" onClick={() => onAdd("test")}>
      Add
    </button>
  ),
}))

vi.mock("./DeletableChip", () => ({
  DeletableChip: ({ label, handleDelete }: any) => (
    <div>
      <span>{label}</span>
      <button type="button" onClick={() => handleDelete(label)}>
        Delete
      </button>
    </div>
  ),
}))

test("should render list of items as DeletableChip components", () => {
  mockUpdate.mockReturnValue(() => right({}))

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
  mockUpdate.mockReturnValue(() => right({}))

  const mockInfoList = ["item1"]

  render(
    <EditableContentList
      id="DDB_G0123456"
      field="name_description"
      infoList={mockInfoList}
    />,
  )

  expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument()
})

test("should render empty list with only MorphingButton", () => {
  mockUpdate.mockReturnValue(() => right({}))

  const mockInfoList: Array<string> = []

  render(
    <EditableContentList
      id="DDB_G0123456"
      field="name_description"
      infoList={mockInfoList}
    />,
  )

  expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument()
  expect(screen.queryByText(/item/i)).not.toBeInTheDocument()
})
