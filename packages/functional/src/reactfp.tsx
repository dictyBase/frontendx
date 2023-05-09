import { concatAll, type Monoid } from "fp-ts/Monoid"
import { type ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { Option, map as Omap, Applicative, of as Oof } from "fp-ts/Option"
import { sequence, map as Amap } from "fp-ts/Array"

type Comp = JSX.Element | ReactNode

const reactCompMonoid: Monoid<Comp> = {
  concat: (x: Comp, y: Comp) => (
    <>
      {x}
      {y}
    </>
  ),
  // eslint-disable-next-line react/jsx-no-useless-fragment
  empty: <></>,
}

const fromChildren = (...c: Array<Comp>) =>
  pipe(
    c,
    Amap((ca) => Oof(ca)),
    sequence(Applicative),
  )

const compose = (...v: Comp[]) => ({ children: concatAll(reactCompMonoid)(v) })

const composeChildren = (o: Option<Array<Comp>>) => {
  const conc = concatAll(reactCompMonoid)
  return pipe(
    o,
    Omap((comps) => conc(comps)),
  )
}

export { type Comp, compose, composeChildren, fromChildren }
