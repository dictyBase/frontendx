import { pipe } from "fp-ts/function"
import { Eq as SEq } from "fp-ts/string"
import { lookup as Mlookup } from "fp-ts/Map"
import {
  type Option,
  fromNullable as OfromNullable,
  Do as ODo,
  bind as Obind,
  let as Olet,
  map as Omap,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { PlasmidType, PlasmidListFilter } from "dicty-graphql-schema"

const DEFAULT_GROUP = { plasmid_type: PlasmidType.Regular }
const GOLDEN_BRAID_GROUP = { plasmid_type: PlasmidType.GoldenBraid }

const plasmidGroupFilterEntries = new Map([
  ["regular", DEFAULT_GROUP],
  ["goldenbraid", GOLDEN_BRAID_GROUP],
])

const get: (k: string) => (fa: URLSearchParams) => Option<string> =
  (k) => (fa) =>
    pipe(fa.get(k), OfromNullable)

const buildPlasmidListFilter = (
  parameters: URLSearchParams,
): PlasmidListFilter =>
  pipe(
    ODo,
    Olet("searchParameters", () => parameters),
    Obind(
      "init",
      ({ searchParameters }): Option<PlasmidListFilter> =>
        pipe(
          searchParameters,
          get("group"),
          OflatMap((v) => pipe(plasmidGroupFilterEntries, Mlookup(SEq)(v))),
        ),
    ),
    Olet("withName", ({ searchParameters, init }) =>
      pipe(
        searchParameters,
        get("Descriptor"),
        Omap((name) => ({ ...init, name })),
        OgetOrElse(() => init),
      ),
    ),
    Olet("withSummary", ({ searchParameters, withName }) =>
      pipe(
        searchParameters,
        get("Summary"),
        Omap((summary) => ({ ...withName, summary })),
        OgetOrElse(() => withName),
      ),
    ),
    Omap(({ withSummary }) => withSummary),
    OgetOrElse(() => DEFAULT_GROUP),
  )

export { buildPlasmidListFilter }
