import { StrainListQuery } from "dicty-graphql-schema"
import { Lens } from "monocle-ts"
import { getMonoid } from "fp-ts/Array"
import { left, right, match } from "fp-ts/Either"
import { pipe } from "fp-ts/function"

type StrainList = Pick<StrainListQuery, "listStrains">["listStrains"]
type NotEmptyStrainList = NonNullable<StrainList>
type StrainListPair = [StrainList, NotEmptyStrainList]
type Strains = Pick<NotEmptyStrainList, "strains">["strains"][number]

const whichStrains = ([existS, inS]: StrainListPair) =>
  existS ? right([existS, inS]) : left(inS)

const listStrainsPagination = () => ({
  keyArgs: ["filter"],
  merge(existing: StrainList, incoming: NotEmptyStrainList) {
    const strainLens = Lens.fromProp<NotEmptyStrainList>()("strains")
    const mergeStrains = getMonoid<Strains>()
    const rightFunction = ([existS, inS]: Array<NotEmptyStrainList>) => {
      // eslint-disable-next-line unicorn/prefer-spread
      const mstrains = mergeStrains.concat(existS.strains, inS.strains)
      return strainLens.set(mstrains)(incoming)
    }
    const leftFunction = (inS: NotEmptyStrainList) => inS
    return pipe(
      [existing, incoming],
      whichStrains,
      match(leftFunction, rightFunction),
    )
  },
  read(existing: NotEmptyStrainList) {
    return existing
  },
})

export { listStrainsPagination }
