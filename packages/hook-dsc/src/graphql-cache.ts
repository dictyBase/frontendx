import { StrainListQuery } from "dicty-graphql-schema"
import { Lens } from "monocle-ts"
import { getMonoid } from "fp-ts/Array"
import * as E from "fp-ts/Either"
import { pipe } from "fp-ts/function"

type StrainList = Pick<StrainListQuery, "listStrains">["listStrains"]
type NotEmptyStrainList = NonNullable<StrainList>
type StrainListPair = [StrainList, NotEmptyStrainList]
type Strains = Pick<NotEmptyStrainList, "strains">["strains"][number]

const listStrainsPagination = () => ({
  keyArgs: ["filter"],
  merge(existing: StrainList, incoming: NotEmptyStrainList) {
    const strainLens = Lens.fromProp<NotEmptyStrainList>()("strains")
    const mergeStrains = getMonoid<Strains>()
    const whichStrains = ([existing, incoming]: StrainListPair) => {
      return existing ? E.right([existing, incoming]) : E.left(incoming)
    }
    const rightFn = ([existing, incoming]: Array<NotEmptyStrainList>) => {
      const mstrains = mergeStrains.concat(existing.strains, incoming.strains)
      return strainLens.set(mstrains)(incoming)
    }
    const leftFn = (incoming: NotEmptyStrainList) => incoming
    return pipe([existing, incoming], whichStrains, E.match(leftFn, rightFn))
  },
  read(existing: NotEmptyStrainList) {
    return existing
  },
})

export { listStrainsPagination }
