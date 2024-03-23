import {
  StrainListQuery,
  ListStrainsWithPhenotypeQuery,
  PlasmidListFilterQuery,
} from "dicty-graphql-schema"
import { Lens } from "monocle-ts"
import { getMonoid } from "fp-ts/Array"
import { left, right, match } from "fp-ts/Either"
import { pipe } from "fp-ts/function"

type StrainList = Pick<StrainListQuery, "listStrains">["listStrains"]
type NotEmptyStrainList = NonNullable<StrainList>
type StrainListPair = [StrainList, NotEmptyStrainList]
type NotEmptyStrainListPair = [NotEmptyStrainList, NotEmptyStrainList]
type Strains = Pick<NotEmptyStrainList, "strains">["strains"][number]

type PlasmidList = Pick<PlasmidListFilterQuery, "listPlasmids">["listPlasmids"]
type NotEmptyPlasmidList = NonNullable<PlasmidList>
type PlasmidListPair = [PlasmidList, NotEmptyPlasmidList]
type NotEmptyPlasmidListPair = [NotEmptyPlasmidList, NotEmptyPlasmidList]
type Plasmids = Pick<NotEmptyPlasmidList, "plasmids">["plasmids"][number]

type ListStrainsWithAnnotation = Pick<
  ListStrainsWithPhenotypeQuery,
  "listStrainsWithAnnotation"
>["listStrainsWithAnnotation"]
type NotEmptyListStrainsWithAnnotation = NonNullable<ListStrainsWithAnnotation>

const whichStrains = ([existS, inS]: StrainListPair) =>
  existS ? right([existS, inS] as NotEmptyStrainListPair) : left(inS)

const whichPlasmids = ([existP, inP]: PlasmidListPair) =>
  existP ? right([existP, inP] as NotEmptyPlasmidListPair) : left(inP)

const listStrainsPagination = () => ({
  keyArgs: ["filter"],
  merge(existing: StrainList, incoming: NotEmptyStrainList) {
    const strainLens = Lens.fromProp<NotEmptyStrainList>()("strains")
    const mergeStrains = getMonoid<Strains>()
    const rightFunction = ([existS, inS]: NotEmptyStrainListPair) => {
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

const listPlasmidsPagination = () => ({
  keyArgs: ["filter"],
  merge(existing: PlasmidList, incoming: NotEmptyPlasmidList) {
    const plasmidLens = Lens.fromProp<NotEmptyPlasmidList>()("plasmids")
    const mergeStrains = getMonoid<Plasmids>()
    const rightFunction = ([existS, inS]: NotEmptyPlasmidListPair) => {
      // eslint-disable-next-line unicorn/prefer-spread
      const mplasmids = mergeStrains.concat(existS.plasmids, inS.plasmids)
      return plasmidLens.set(mplasmids)(incoming)
    }
    const leftFunction = (inP: NotEmptyPlasmidList) => inP
    return pipe(
      [existing, incoming],
      whichPlasmids,
      match(leftFunction, rightFunction),
    )
  },
  read(existing: NotEmptyPlasmidList) {
    return existing
  },
})

const listStrainsWithAnnotationPagination = () => ({
  keyArgs: ["type", "annotation"],
  merge(
    existing: NotEmptyListStrainsWithAnnotation,
    incoming: NotEmptyListStrainsWithAnnotation,
  ) {
    let strains: NotEmptyListStrainsWithAnnotation["strains"] = []
    let totalCount: NotEmptyListStrainsWithAnnotation["totalCount"] = 0
    if (existing) {
      strains = [...strains, ...existing.strains]
      totalCount = existing.totalCount
    }
    if (incoming) {
      strains = [...strains, ...incoming.strains]
      totalCount += incoming.totalCount
    }
    return {
      ...incoming,
      strains,
      totalCount,
    }
  },
  read(existing: NotEmptyListStrainsWithAnnotation) {
    return existing
  },
})

export {
  listStrainsPagination,
  listStrainsWithAnnotationPagination,
  listPlasmidsPagination,
}
