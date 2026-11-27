import { render, screen } from "@testing-library/react"
import { pipe } from "fp-ts/function"
import type { Predicate } from "fp-ts/Predicate"
import { expect, test } from "vitest"
import {
  contramapView,
  foldViews,
  getViewMonoid,
  getViewSemigroup,
  guardView,
  intercalateNode,
  intercalateViews,
  wrapView,
  type View,
  type Wrapper,
} from "../index"

type StrainSummary = {
  readonly id: string
  readonly label: string
  readonly species: string
  readonly available: boolean
}

type CatalogEntry = {
  readonly strain: StrainSummary
}

const SAMPLE_STRAIN: StrainSummary = {
  id: "DBS0235764",
  label: "axeA2",
  species: "D. discoideum",
  available: true,
}

const IdView = ({ id }: Pick<StrainSummary, "id">) => <span>{id}</span>
const LabelView = ({ label }: Pick<StrainSummary, "label">) => (
  <strong>{label}</strong>
)
const SpeciesView = ({ species }: Pick<StrainSummary, "species">) => (
  <em>{species}</em>
)

const isAvailable: Predicate<StrainSummary> = ({ available }) => available
const badgeWrapper: Wrapper = (node) => (
  <section data-testid="strain-badge">{node}</section>
)

test("getViewMonoid satisfies associativity and identity laws across shared properties", () => {
  const { concat, empty } = getViewMonoid<StrainSummary>()

  const leftGrouped = concat(concat(IdView, LabelView), SpeciesView)
  const rightGrouped = concat(IdView, concat(LabelView, SpeciesView))
  const leftIdentity = concat(empty, LabelView)
  const rightIdentity = concat(LabelView, empty)

  expect(
    render(<div>{leftGrouped(SAMPLE_STRAIN)}</div>).container.textContent,
  ).toBe("DBS0235764axeA2D. discoideum")
  expect(
    render(<div>{rightGrouped(SAMPLE_STRAIN)}</div>).container.textContent,
  ).toBe("DBS0235764axeA2D. discoideum")
  expect(
    render(<div>{leftIdentity(SAMPLE_STRAIN)}</div>).container.textContent,
  ).toBe("axeA2")
  expect(
    render(<div>{rightIdentity(SAMPLE_STRAIN)}</div>).container.textContent,
  ).toBe("axeA2")
})

test("getViewSemigroup lifts custom node semigroup and foldViews handles empty or populated lists", () => {
  const { concat } = getViewSemigroup<StrainSummary>(intercalateNode(" | "))
  const combined = concat(IdView, LabelView)
  const emptyView = foldViews<StrainSummary>([])
  const allViews = foldViews<StrainSummary>([IdView, LabelView])

  expect(
    render(<div>{combined(SAMPLE_STRAIN)}</div>).container.textContent,
  ).toBe("DBS0235764 | axeA2")
  expect(
    render(<div>{emptyView(SAMPLE_STRAIN)}</div>).container.textContent,
  ).toBe("")
  expect(
    render(<div>{allViews(SAMPLE_STRAIN)}</div>).container.textContent,
  ).toBe("DBS0235764axeA2")
})

test("intercalateViews inserts separator only between adjacent views", () => {
  const joinWithSlash = intercalateViews(" / ")
  const emptyJoined = joinWithSlash<StrainSummary>([])
  const singleJoined = joinWithSlash<StrainSummary>([IdView])
  const tripleJoined = joinWithSlash<StrainSummary>([
    IdView,
    LabelView,
    SpeciesView,
  ])

  expect(
    render(<div>{emptyJoined(SAMPLE_STRAIN)}</div>).container.textContent,
  ).toBe("")
  expect(
    render(<div>{singleJoined(SAMPLE_STRAIN)}</div>).container.textContent,
  ).toBe("DBS0235764")
  expect(
    render(<div>{tripleJoined(SAMPLE_STRAIN)}</div>).container.textContent,
  ).toBe("DBS0235764 / axeA2 / D. discoideum")
})

test("contramapView, wrapView, and guardView compose cleanly on View", () => {
  const strainLabelView: View<StrainSummary> = LabelView
  const AvailabilityCardView: View<CatalogEntry> = pipe(
    strainLabelView,
    wrapView(badgeWrapper),
    guardView(isAvailable),
    contramapView((entry: CatalogEntry) => entry.strain),
  )

  const availableRender = render(
    <div>{AvailabilityCardView({ strain: SAMPLE_STRAIN })}</div>,
  )
  expect(screen.getByTestId("strain-badge")).toHaveTextContent("axeA2")
  availableRender.unmount()

  const unavailableRender = render(
    <div>
      {AvailabilityCardView({
        strain: { ...SAMPLE_STRAIN, available: false },
      })}
    </div>,
  )
  expect(unavailableRender.container.textContent).toBe("")
})
