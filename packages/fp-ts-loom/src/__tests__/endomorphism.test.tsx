import { useState } from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import type { Endomorphism } from "fp-ts/Endomorphism"
import type { Predicate } from "fp-ts/Predicate"
import { expect, test } from "vitest"
import {
  buildFrom,
  foldEndomorphisms,
  foldWrappers,
  getEndomorphismMonoid,
  MonoidWrapper,
  MonoidWrapperOuter,
  nestWrappers,
  whenEndomorphism,
  type Wrapper,
} from "../index"

type CounterState = {
  readonly count: number
  readonly dirty: boolean
}

type RawQuery = {
  readonly page: number
  readonly filter: string
}

type TableConfiguration = {
  readonly offset: number
  readonly limit: number
  readonly search: string
}

const increment: Endomorphism<number> = (value) => value + 1
const double: Endomorphism<number> = (value) => value * 2
const subtractThree: Endomorphism<number> = (value) => value - 3
const isPositive: Predicate<number> = (value) => value > 0

const incrementState: Endomorphism<CounterState> = (state) => ({
  ...state,
  count: state.count + 2,
})
const multiplyState: Endomorphism<CounterState> = (state) => ({
  ...state,
  count: state.count * 3,
})
const markDirty: Endomorphism<CounterState> = (state) => ({
  ...state,
  dirty: true,
})

const withOuterShell: Wrapper = (node) => (
  <div data-testid="outer-shell">{node}</div>
)
const withInnerCard: Wrapper = (node) => (
  <article data-testid="inner-card">{node}</article>
)

test("getEndomorphismMonoid satisfies monoid laws and composes left-to-right", () => {
  const { concat, empty } = getEndomorphismMonoid<number>()

  const leftGrouped = concat(concat(increment, double), subtractThree)
  const rightGrouped = concat(increment, concat(double, subtractThree))
  const leftIdentity = concat(empty, increment)
  const rightIdentity = concat(increment, empty)

  expect(leftGrouped(4)).toBe(7)
  expect(rightGrouped(4)).toBe(7)
  expect(leftIdentity(4)).toBe(5)
  expect(rightIdentity(4)).toBe(5)
})

test("foldEndomorphisms composes React setState transitions in sequence", () => {
  const CounterHarness = () => {
    const [state, setState] = useState<CounterState>({
      count: 1,
      dirty: false,
    })
    const handleApply = () => {
      setState(foldEndomorphisms([incrementState, multiplyState, markDirty]))
    }
    return (
      <button type="button" onClick={handleApply}>
        {`${state.count}:${String(state.dirty)}`}
      </button>
    )
  }

  render(<CounterHarness />)
  const button = screen.getByRole("button")
  expect(button).toHaveTextContent("1:false")

  fireEvent.click(button)
  expect(button).toHaveTextContent("9:true")
})

test("MonoidWrapper wraps inner-to-outer while MonoidWrapperOuter and nestWrappers wrap outer-to-inner", () => {
  const innerFirst = foldWrappers([withInnerCard, withOuterShell])(
    <span>Payload</span>,
  )
  const firstRender = render(innerFirst)
  const outerFromInnerFirst = screen.getByTestId("outer-shell")
  const innerFromInnerFirst = screen.getByTestId("inner-card")
  expect(outerFromInnerFirst).toContainElement(innerFromInnerFirst)
  expect(innerFromInnerFirst).toHaveTextContent("Payload")
  firstRender.unmount()

  const outerFirst = nestWrappers([withOuterShell, withInnerCard])(
    <span>TreeOrder</span>,
  )
  render(outerFirst)
  const outerElement = screen.getByTestId("outer-shell")
  const innerElement = screen.getByTestId("inner-card")
  expect(outerElement).toContainElement(innerElement)
  expect(innerElement).toHaveTextContent("TreeOrder")

  const emptyWrapped = MonoidWrapper.empty(<span>Unchanged</span>)
  const emptyOuterWrapped = MonoidWrapperOuter.empty(<span>Unchanged</span>)
  expect(emptyWrapped).toEqual(<span>Unchanged</span>)
  expect(emptyOuterWrapped).toEqual(<span>Unchanged</span>)
})

test("whenEndomorphism applies transition only when predicate holds", () => {
  const doubleWhenPositive = whenEndomorphism(isPositive)(double)

  expect(doubleWhenPositive(5)).toBe(10)
  expect(doubleWhenPositive(0)).toBe(0)
  expect(doubleWhenPositive(-3)).toBe(-3)
})

test("buildFrom evaluates recipes against input and folds endomorphisms in list order", () => {
  const defaultConfiguration: TableConfiguration = {
    offset: 0,
    limit: 25,
    search: "",
  }

  const fromQuery = buildFrom<RawQuery, TableConfiguration>(
    defaultConfiguration,
    [
      ({ page }) =>
        (configuration) => ({
          ...configuration,
          offset: (page - 1) * configuration.limit,
        }),
      ({ filter }) =>
        (configuration) => ({
          ...configuration,
          search: filter.trim(),
        }),
    ],
  )

  expect(fromQuery({ page: 3, filter: "  discoidin  " })).toEqual({
    offset: 50,
    limit: 25,
    search: "discoidin",
  })

  const fromEmptyRecipes = buildFrom<RawQuery, TableConfiguration>(
    defaultConfiguration,
    [],
  )
  expect(fromEmptyRecipes({ page: 5, filter: "ignored" })).toEqual(
    defaultConfiguration,
  )
})
