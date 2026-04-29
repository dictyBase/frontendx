import { pipe } from "fp-ts/function"
import { Eq as SEq } from "fp-ts/string"
import { lookup as Mlookup } from "fp-ts/Map"
import {
  Do as ODo,
  bind as Obind,
  let as Olet,
  map as Omap,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { PlasmidListFilter } from "dicty-graphql-schema"
import { DEFAULT_GROUP, GOLDEN_BRAID_GROUP } from "../const"
import { get } from "./URLSearchParams"

const plasmidGroupFilterEntries = new Map([
  ["regular", DEFAULT_GROUP],
  ["goldenbraid", GOLDEN_BRAID_GROUP],
])

/**
 * buildPlasmidListFilter is used in the Plasmid Catalog. It takes the `URLSearchParams` of the current URL
 * and returns a `PlasmidListFilter` that can be used in `PlasmidListQuery` variables.
 */
const buildPlasmidListFilter = (
  parameters: URLSearchParams,
): PlasmidListFilter =>
  pipe(
    ODo,
    Olet("searchParameters", () => parameters),
    Obind("init", ({ searchParameters }) =>
      pipe(
        searchParameters,
        get("group"),
        OflatMap((v) => pipe(plasmidGroupFilterEntries, Mlookup(SEq)(v))),
      ),
    ),
    Olet("withName", ({ searchParameters, init }) =>
      pipe(
        searchParameters,
        get("descriptor"),
        Omap((name) => ({ ...init, name })),
        OgetOrElse(() => init),
      ),
    ),
    Olet("withSummary", ({ searchParameters, withName }) =>
      pipe(
        searchParameters,
        get("summary"),
        Omap((summary) => ({ ...withName, summary })),
        OgetOrElse(() => withName),
      ),
    ),
    Omap(({ withSummary }) => withSummary),
    OgetOrElse(() => DEFAULT_GROUP),
  )

export { buildPlasmidListFilter }
