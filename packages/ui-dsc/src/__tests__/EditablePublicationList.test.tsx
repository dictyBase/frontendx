import { vi, test, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { right as TEright } from "fp-ts/TaskEither"
import {
  EditablePublicationList,
  PublicationItem,
} from "../catalog/EditablePublicationList"

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
          onAdd("99999999")()
        }}>
        Add Publication
      </button>
      <button
        type="button"
        onClick={() => {
          onAdd("11084033")()
        }}>
        Add Duplicate Publication
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
    <button
      type="button"
      onClick={() => {
        handleDelete(label)()
      }}>
      Delete {label}
    </button>
  ),
}))

const mockPublications: Array<PublicationItem> = [
  {
    id: "11084033",
    pub_date: "2000-11-17T00:00:00.000Z",
    title: "Myosin I phosphorylation is increased by chemotactic stimulation.",
    journal: "The Journal of biological chemistry",
    volume: "276",
    pages: "5235-5239",
    doi: "10.1074/jbc.m008319200",
    authors: [{ last_name: "Gliksman" }],
  },
]

test("renders publication display and delete/add controls", () => {
  mockUpdate.mockReturnValue(TEright({}))

  render(
    <EditablePublicationList id="DBS0236123" publications={mockPublications} />,
  )

  expect(screen.getByTestId("publication-display")).toBeInTheDocument()
  expect(
    screen.getByRole("button", { name: /delete 11084033/i }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole("button", { name: /add publication/i }),
  ).toBeInTheDocument()
})

test("calls update when adding or deleting a publication", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(TEright({}))

  render(
    <EditablePublicationList id="DBS0236123" publications={mockPublications} />,
  )

  await user.click(screen.getByRole("button", { name: /^add publication$/i }))
  expect(mockUpdate).toHaveBeenCalledWith("DBS0236123", {
    publications: ["11084033", "99999999"],
  })

  await user.click(screen.getByRole("button", { name: /delete 11084033/i }))
  expect(mockUpdate).toHaveBeenCalledWith("DBS0236123", {
    publications: [],
  })
})

test("does not call update when adding duplicate publication id", async () => {
  const user = userEvent.setup()
  mockUpdate.mockReturnValue(TEright({}))

  render(
    <EditablePublicationList id="DBS0236123" publications={mockPublications} />,
  )

  await user.click(
    screen.getByRole("button", { name: /add duplicate publication/i }),
  )
  expect(mockUpdate).not.toHaveBeenCalled()
})
