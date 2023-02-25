import type { Monoid } from "fp-ts/Monoid"
import { concatAll } from "fp-ts/Monoid"
import type { ReactNode } from "react"

type A = JSX.Element | ReactNode

const reactMonoid: Monoid<A> = {
  concat: (x: A, y: A) => (
    <>
      {x}
      {y}
    </>
  ),
  empty: <></>,
}

const compose = (...v: A[]) => {
  return { children: concatAll(reactMonoid)(v) }
}

export default compose
