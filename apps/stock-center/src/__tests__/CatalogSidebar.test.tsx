import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { vi } from "vitest"
import { none, some } from "fp-ts/Option"
import type { ReadonlyNonEmptyArray } from "fp-ts/ReadonlyNonEmptyArray"
import { CatalogSidebar } from "../components/CatalogSidebar"
import type { SidebarOption } from "../components/CatalogSidebar"

const ALL_STRAINS_LABEL = "All Strains"
const REGULAR_STRAINS_LABEL = "Regular Strains"
const BACTERIAL_STRAINS_LABEL = "Bacterial Strains"
const GWDI_STRAINS_LABEL = "GWDI Strains"

const ENTITY_OPTIONS: ReadonlyNonEmptyArray<SidebarOption> = [
  { value: "all", label: "All Results" },
  {
    value: "strain",
    label: "Strains",
    groups: [
      { value: "all", label: ALL_STRAINS_LABEL },
      { value: "regular", label: REGULAR_STRAINS_LABEL },
      { value: "bacterial", label: BACTERIAL_STRAINS_LABEL },
      { value: "gwdi", label: GWDI_STRAINS_LABEL },
    ],
  },
  { value: "plasmid", label: "Plasmids" },
]

const defaultProperties = {
  title: "Stock Type",
  options: ENTITY_OPTIONS,
  selectedEntity: "all",
  selectedGroup: none,
  onChangeEntity: vi.fn(),
  onChangeGroup: vi.fn(),
}

test("should render sidebar title", () => {
  render(<CatalogSidebar {...defaultProperties} />)
  expect(screen.getByText(/stock type/i)).toBeInTheDocument()
})

test("should render all entity type options", () => {
  render(<CatalogSidebar {...defaultProperties} />)
  expect(screen.getByText("All Results")).toBeInTheDocument()
  expect(screen.getByText("Strains")).toBeInTheDocument()
  expect(screen.getByText("Plasmids")).toBeInTheDocument()
})

test("should have All Results selected by default", () => {
  render(<CatalogSidebar {...defaultProperties} />)
  const allRadio = screen.getByRole("radio", {
    name: /all results/i,
  }) as HTMLInputElement
  expect(allRadio).toBeChecked()
})

test("should call onChangeEntity when a different entity is clicked", async () => {
  const user = userEvent.setup()
  const onChangeEntity = vi.fn()
  render(
    <CatalogSidebar {...defaultProperties} onChangeEntity={onChangeEntity} />,
  )

  await user.click(screen.getByRole("radio", { name: /strains/i }))

  expect(onChangeEntity).toHaveBeenCalled()
})

test("should render groups when an entity with groups is selected", () => {
  render(
    <CatalogSidebar
      {...defaultProperties}
      selectedEntity="strain"
      selectedGroup={some("regular")}
    />,
  )

  expect(screen.getByText(ALL_STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText(REGULAR_STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText(BACTERIAL_STRAINS_LABEL)).toBeInTheDocument()
  expect(screen.getByText(GWDI_STRAINS_LABEL)).toBeInTheDocument()
})

test("should not render groups when selected entity has no groups", () => {
  render(
    <CatalogSidebar
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
    <CatalogSidebar
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
    <CatalogSidebar
      {...defaultProperties}
      selectedEntity="strain"
      selectedGroup={some("all")}
      onChangeGroup={onChangeGroup}
    />,
  )

  await user.click(screen.getByRole("radio", { name: /regular strains/i }))

  expect(onChangeGroup).toHaveBeenCalled()
})
