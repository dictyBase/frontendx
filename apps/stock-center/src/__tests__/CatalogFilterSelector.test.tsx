import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { vi, test, expect } from "vitest"
import { none, some } from "fp-ts/Option"
import type { ReadonlyNonEmptyArray } from "fp-ts/ReadonlyNonEmptyArray"
import {
  CatalogFilterSelector,
  type FilterOption,
} from "../components/CatalogFilterSelector"

const ENTITY_ALL = "all"
const ENTITY_STRAIN = "strain"
const ENTITY_PLASMID = "plasmid"
const RADIO_ROLE = "radio"

const ALL_RESULTS_LABEL = "All Results"
const STRAINS_LABEL = "Strains"
const PLASMIDS_LABEL = "Plasmids"
const ALL_STRAINS_LABEL = "All Strains"
const REGULAR_STRAINS_LABEL = "Regular Strains"
const BACTERIAL_STRAINS_LABEL = "Bacterial Strains"
const GWDI_STRAINS_LABEL = "GWDI Strains"

const ENTITY_OPTIONS: ReadonlyNonEmptyArray<FilterOption> = [
  { value: ENTITY_ALL, label: ALL_RESULTS_LABEL, count: some(29_841) },
  {
    value: ENTITY_STRAIN,
    label: STRAINS_LABEL,
    count: some(28_576),
    groups: [
      { value: ENTITY_ALL, label: ALL_STRAINS_LABEL, count: some(28_576) },
      { value: "regular", label: REGULAR_STRAINS_LABEL, count: some(7055) },
      { value: "bacterial", label: BACTERIAL_STRAINS_LABEL, count: some(15) },
      { value: "gwdi", label: GWDI_STRAINS_LABEL, count: some(21_506) },
    ],
  },
  { value: ENTITY_PLASMID, label: PLASMIDS_LABEL, count: some(1265) },
]

const defaultProperties = {
  options: ENTITY_OPTIONS,
  selectedEntity: ENTITY_ALL,
  selectedGroup: none,
  onChangeEntity: vi.fn(),
  onChangeGroup: vi.fn(),
}

test("should render all entity type options and their counts", () => {
  render(<CatalogFilterSelector {...defaultProperties} />)
  expect(screen.getByText(ALL_RESULTS_LABEL)).toBeInTheDocument()
  expect(screen.getByText("29,841")).toBeInTheDocument()
  expect(screen.getByText(STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText("28,576")).toBeInTheDocument()
  expect(screen.getByText(PLASMIDS_LABEL)).toBeInTheDocument()
  expect(screen.getByText("1,265")).toBeInTheDocument()
})

test("should have All Results selected by default", () => {
  render(<CatalogFilterSelector {...defaultProperties} />)
  const allRadio = screen.getByRole(RADIO_ROLE, {
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

  await user.click(screen.getByRole(RADIO_ROLE, { name: /strains/i }))

  expect(onChangeEntity).toHaveBeenCalled()
})

test("should render groups and their counts when an entity with groups is selected", () => {
  render(
    <CatalogFilterSelector
      {...defaultProperties}
      selectedEntity={ENTITY_STRAIN}
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
      selectedEntity={ENTITY_ALL}
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
      selectedEntity={ENTITY_STRAIN}
      selectedGroup={some("bacterial")}
    />,
  )

  const bacterialRadio = screen.getByRole(RADIO_ROLE, {
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
      selectedEntity={ENTITY_STRAIN}
      selectedGroup={some(ENTITY_ALL)}
      onChangeGroup={onChangeGroup}
    />,
  )

  await user.click(screen.getByRole(RADIO_ROLE, { name: /regular strains/i }))

  expect(onChangeGroup).toHaveBeenCalled()
})

test("should render ellipsis when an option count is none", () => {
  const pendingOptions: ReadonlyNonEmptyArray<FilterOption> = [
    { value: ENTITY_ALL, label: ALL_RESULTS_LABEL, count: none },
    { value: ENTITY_STRAIN, label: STRAINS_LABEL, count: none },
    { value: ENTITY_PLASMID, label: PLASMIDS_LABEL, count: none },
  ]
  render(
    <CatalogFilterSelector {...defaultProperties} options={pendingOptions} />,
  )

  expect(screen.getAllByText("...")).toHaveLength(3)
})

test("should not render a count badge when count is omitted", () => {
  const optionsWithoutCounts: ReadonlyNonEmptyArray<FilterOption> = [
    { value: ENTITY_ALL, label: ALL_RESULTS_LABEL },
    { value: ENTITY_STRAIN, label: STRAINS_LABEL },
    { value: ENTITY_PLASMID, label: PLASMIDS_LABEL },
  ]
  render(
    <CatalogFilterSelector
      {...defaultProperties}
      options={optionsWithoutCounts}
    />,
  )

  const allLabel = screen.getByText(ALL_RESULTS_LABEL).closest("label")
  expect(allLabel).toHaveTextContent(/^All Results$/)
})

test("should render the Only In Stock filter pill and a divider", () => {
  render(<CatalogFilterSelector {...defaultProperties} />)

  const onlyInStockCheckbox = screen.getByRole("checkbox", {
    name: /only in stock/i,
  })
  expect(onlyInStockCheckbox).toBeInTheDocument()
  expect(onlyInStockCheckbox).not.toBeChecked()
  expect(screen.getByRole("separator")).toBeInTheDocument()
})

test("should have Only In Stock checked when onlyInStock is true", () => {
  render(<CatalogFilterSelector {...defaultProperties} onlyInStock />)

  expect(screen.getByRole("checkbox", { name: /only in stock/i })).toBeChecked()
})

test("should call onChangeOnlyInStock when Only In Stock is clicked", async () => {
  const user = userEvent.setup()
  const onChangeOnlyInStock = vi.fn()
  render(
    <CatalogFilterSelector
      {...defaultProperties}
      onChangeOnlyInStock={onChangeOnlyInStock}
    />,
  )

  await user.click(screen.getByRole("checkbox", { name: /only in stock/i }))

  expect(onChangeOnlyInStock).toHaveBeenCalled()
})
