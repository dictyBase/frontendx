import { render } from "@testing-library/react"
import { none as Onone, some as Osome } from "fp-ts/Option"
import { expect, test, vi } from "vitest"
import {
  foldNodes,
  fromOptionNode,
  intercalateNode,
  joinNodes,
  MonoidNode,
  whenNode,
} from "../index"

const MIDDLE_DOT = " · "

test("MonoidNode satisfies associativity and left/right identity laws in rendered DOM", () => {
  const { concat, empty } = MonoidNode
  const first = <span>Alpha</span>
  const second = <span>Beta</span>
  const third = <span>Gamma</span>

  const leftGrouped = render(<div>{concat(concat(first, second), third)}</div>)
  const rightGrouped = render(<div>{concat(first, concat(second, third))}</div>)
  const leftIdentity = render(<div>{concat(empty, first)}</div>)
  const rightIdentity = render(<div>{concat(first, empty)}</div>)

  expect(leftGrouped.container.textContent).toBe("AlphaBetaGamma")
  expect(rightGrouped.container.textContent).toBe(
    leftGrouped.container.textContent,
  )
  expect(leftIdentity.container.textContent).toBe("Alpha")
  expect(rightIdentity.container.textContent).toBe("Alpha")
})

test("intercalateNode inserts separator and satisfies semigroup associativity", () => {
  const { concat } = intercalateNode(<span>{MIDDLE_DOT}</span>)
  const first = <span>DBS01</span>
  const second = <span>DBS02</span>
  const third = <span>DBS03</span>

  const leftGrouped = render(<div>{concat(concat(first, second), third)}</div>)
  const rightGrouped = render(<div>{concat(first, concat(second, third))}</div>)

  expect(leftGrouped.container.textContent).toBe("DBS01 · DBS02 · DBS03")
  expect(rightGrouped.container.textContent).toBe(
    leftGrouped.container.textContent,
  )
})

test("foldNodes renders empty array as empty fragment and concatenates multiple nodes", () => {
  const emptyResult = render(<div>{foldNodes([])}</div>)
  const populatedResult = render(
    <div>
      {foldNodes([
        <span key="one">One</span>,
        <span key="two">Two</span>,
        <span key="three">Three</span>,
      ])}
    </div>,
  )

  expect(emptyResult.container.textContent).toBe("")
  expect(populatedResult.container.textContent).toBe("OneTwoThree")
})

test("joinNodes omits separator for empty and singleton arrays and separates multiple nodes", () => {
  const joinWithDot = joinNodes(<span>{MIDDLE_DOT}</span>)

  const emptyResult = render(<div>{joinWithDot([])}</div>)
  const singleResult = render(
    <div>{joinWithDot([<span key="solo">Solo</span>])}</div>,
  )
  const multipleResult = render(
    <div>
      {joinWithDot([
        <span key="first">First</span>,
        <span key="second">Second</span>,
        <span key="third">Third</span>,
      ])}
    </div>,
  )

  expect(emptyResult.container.textContent).toBe("")
  expect(singleResult.container.textContent).toBe("Solo")
  expect(multipleResult.container.textContent).toBe("First · Second · Third")
})

test("fromOptionNode renders Some node and empty fragment for None", () => {
  const someResult = render(
    <div>{fromOptionNode(Osome(<span>Present</span>))}</div>,
  )
  const noneResult = render(<div>{fromOptionNode(Onone)}</div>)

  expect(someResult.container.textContent).toBe("Present")
  expect(noneResult.container.textContent).toBe("")
})

test("whenNode lazily evaluates thunk only when condition is true", () => {
  const renderThunk = vi.fn(() => <span>Visible</span>)

  const hiddenResult = render(<div>{whenNode(false)(renderThunk)}</div>)
  expect(hiddenResult.container.textContent).toBe("")
  expect(renderThunk).not.toHaveBeenCalled()

  const visibleResult = render(<div>{whenNode(true)(renderThunk)}</div>)
  expect(visibleResult.container.textContent).toBe("Visible")
  expect(renderThunk).toHaveBeenCalledTimes(1)
})
