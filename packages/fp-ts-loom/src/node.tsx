import type { ReactNode } from "react"
import { match as Bmatch } from "fp-ts/boolean"
import { pipe } from "fp-ts/function"
import { concatAll as MconcatAll, type Monoid } from "fp-ts/Monoid"
import { getOrElse as OgetOrElse, type Option } from "fp-ts/Option"
import { matchLeft as RAmatchLeft } from "fp-ts/ReadonlyArray"
import {
  concatAll as SconcatAll,
  intercalate as Sintercalate,
  type Semigroup,
} from "fp-ts/Semigroup"

/**
 * `Monoid` instance for `ReactNode` that concatenates nodes inside a React fragment
 * with an empty fragment `<></>` as identity.
 */
const MonoidNode: Monoid<ReactNode> = {
  concat: (first: ReactNode, second: ReactNode): ReactNode => (
    <>
      {first}
      {second}
    </>
  ),
  empty: <></>,
}

/**
 * Creates a `Semigroup<ReactNode>` that inserts `separator` between every two nodes
 * via `Semigroup.intercalate`.
 */
const intercalateNode = (separator: ReactNode): Semigroup<ReactNode> =>
  pipe(MonoidNode, Sintercalate(separator))

/**
 * Folds a `ReadonlyArray<ReactNode>` into a single `ReactNode` using `MonoidNode`.
 */
const foldNodes: (nodes: ReadonlyArray<ReactNode>) => ReactNode =
  MconcatAll(MonoidNode)

/**
 * Joins a `ReadonlyArray<ReactNode>` with `separator` between adjacent elements,
 * returning `MonoidNode.empty` (`<></>`) when the array is empty.
 */
type NodeJoiner = (nodes: ReadonlyArray<ReactNode>) => ReactNode

const joinNodes = (separator: ReactNode): NodeJoiner => {
  const joinWithSeparator: NodeJoiner = (nodes) =>
    pipe(
      nodes,
      RAmatchLeft(
        (): ReactNode => MonoidNode.empty,
        (head, tail) =>
          pipe(tail, SconcatAll(intercalateNode(separator))(head)),
      ),
    )
  return joinWithSeparator
}

/**
 * Unwraps an `Option<ReactNode>`, rendering `MonoidNode.empty` (`<></>`) on `None`
 * so `null` never enters JSX trees.
 */
const fromOptionNode: (node: Option<ReactNode>) => ReactNode = OgetOrElse(
  (): ReactNode => MonoidNode.empty,
)

/**
 * Lazily evaluates `render` when `condition` is `true`, or returns `MonoidNode.empty` (`<></>`)
 * when `false`, using `fp-ts/boolean` `match`.
 */
type RenderThunk = () => ReactNode
type ConditionalRender = (render: RenderThunk) => ReactNode

const whenNode = (condition: boolean): ConditionalRender => {
  const renderWhenTrue: ConditionalRender = (render) =>
    pipe(
      condition,
      Bmatch((): ReactNode => MonoidNode.empty, render),
    )
  return renderWhenTrue
}

export {
  MonoidNode,
  intercalateNode,
  foldNodes,
  joinNodes,
  fromOptionNode,
  whenNode,
}
