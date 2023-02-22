import type { Monoid } from "fp-ts/Monoid"
import { concatAll } from "fp-ts/Monoid"

const reactMonoid: Monoid<JSX.Element> = {
  concat: (x: JSX.Element, y: JSX.Element) => (
    <>
      {x}
      {y}
    </>
  ),
  empty: <></>,
}

const composeComponents = (...components: Array<JSX.Element>) =>
  concatAll(reactMonoid)(components)

export default composeComponents
