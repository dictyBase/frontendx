import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { vi, test, expect } from "vitest"
import { none, some } from "fp-ts/Option"
import type { ReadonlyNonEmptyArray } from "fp-ts/ReadonlyNonEmptyArray"
import {
  CatalogFilterSelector,
  type FilterOption,
} from "../components/CatalogFilterSelector"

const ALL_STRAINS_LABEL = "All Strains"
const REGULAR_STRAINS_LABEL = "Regular Strains"
const BACTERIAL_STRAINS_LABEL = "Bacterial Strains"
const GWDI_STRAINS_LABEL = "GWDI Strains"

const ENTITY_OPTIONS: ReadonlyNonEmptyArray<FilterOption> = [
  { value: "all", label: "All Results", count: 29_841 },
  {
    value: "strain",
    label: "Strains",
    count: 28_576,
    groups: [
      { value: "all", label: ALL_STRAINS_LABEL, count: 28_576 },
      { value: "regular", label: REGULAR_STRAINS_LABEL, count: 7055 },
      { value: "bacterial", label: BACTERIAL_STRAINS_LABEL, count: 15 },
      { value: "gwdi", label: GWDI_STRAINS_LABEL, count: 21_506 },
    ],
  },
  { value: "plasmid", label: "Plasmids", count: 1265 },
]

const defaultProperties = {
  options: ENTITY_OPTIONS,
  selectedEntity: "all",
  selectedGroup: none,
  onChangeEntity: vi.fn(),
  onChangeGroup: vi.fn(),
}

test("should render all entity type options and their counts", () => {
  render(<CatalogFilterSelector {...defaultProperties} />)
  expect(screen.getByText("All Results")).toBeInTheDocument()
  expect(screen.getByText("29,841")).toBeInTheDocument()
  expect(screen.getByText("Strains")).toBeInTheDocument()
  expect(screen.getByText("28,576")).toBeInTheDocument()
  expect(screen.getByText("Plasmids")).toBeInTheDocument()
  expect(screen.getByText("1,265")).toBeInTheDocument()
})

test("should have All Results selected by default", () => {
  render(<CatalogFilterSelector {...defaultProperties} />)
  const allRadio = screen.getByRole("radio", {
    name: /all results/i,
  }) as HTMLInputElement
  expect(allRadio).toBeChecked()
})

test("should call onChangeEntity when a different entity is clicked", async () => {
  const user = userEvent.setup()
  const onChangeEntity = vi.fn()
  render(
    <CatalogFilterSelector
      {...defaultProperties}
      onChangeEntity={onChangeEntity}
    />,
  )

  await user.click(screen.getByRole("radio", { name: /strains/i }))

  expect(onChangeEntity).toHaveBeenCalled()
})

test("should render groups and their counts when an entity with groups is selected", () => {
  render(
    <CatalogFilterSelector
      {...defaultProperties}
      selectedEntity="strain"
      selectedGroup={some("regular")}
    />,
  )

  expect(screen.getByText(ALL_STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText(REGULAR_STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText("7,055")).toBeInTheDocument()
  expect(screen.getByText(BACTERIAL_STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText("15")).toBeInTheDocument()
  expect(screen.getByText(GWDI_STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText("21,506")).toBeInTheDocument()
})

test("should not render groups when selected entity has no groups", () => {
  render(
    <CatalogFilterSelector
      {...defaultProperties}
      selectedEntity="all"
      selectedGroup={none}
    />,
  )

  expect(screen.queryByText(ALL_STRAINS_LABEL)).not.toBeInTheDocument()
  expect(screen.queryByText(REGULAR_STRAINS_LABEL)).not.toBeInTheDocument()
})

test("should have the specified group selected when provided", () => {
  render(
    <CatalogFilterSelector
      {...defaultProperties}
      selectedEntity="strain"
      selectedGroup={some("bacterial")}
    />,
  )

  const bacterialRadio = screen.getByRole("radio", {
    name: /bacterial strains/i,
  }) as HTMLInputElement
  expect(bacterialRadio).toBeChecked()
})

test("should call onChangeGroup when a group option is clicked", async () => {
  const user = userEvent.setup()
  const onChangeGroup = vi.fn()
  render(
    <CatalogFilterSelector
      {...defaultProperties}
      selectedEntity="strain"
      selectedGroup={some("all")}
      onChangeGroup={onChangeGroup}
    />,
  )

  await user.click(screen.getByRole("radio", { name: /regular strains/i }))

  expect(onChangeGroup).toHaveBeenCalled()
})
