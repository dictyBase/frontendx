import { render, screen } from "@testing-library/react"
import { right } from "fp-ts/TaskEither"
import { AuthorizedEmptyInfoList } from "./AuthorizedEmptyInfoList"

const mockCreate = vi.fn()

vi.mock("common/hooks/useAuthorizedCreateGeneGeneralInfo", () => ({
  useAuthorizedCreateGeneGeneralInfo: () => mockCreate,
  Errors: {
    ACCESS_TOKEN_ERROR: 0,
    USER_INFO_ERROR: 1,
    CREATE_FAILURE: 2,
    VALIDATION: 3,
  },
}))

vi.mock("./MorphingCreateButton", () => ({
  MorphingCreateButton: ({ onAdd }: any) => (
    <button type="button" onClick={() => onAdd("test-value")}>
      Create
    </button>
  ),
}))

test("should render MorphingCreateButton", () => {
  mockCreate.mockReturnValue(() => right({}))

  render(<AuthorizedEmptyInfoList id="DDB_G0123456" field="name_description" />)

  expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument()
})
