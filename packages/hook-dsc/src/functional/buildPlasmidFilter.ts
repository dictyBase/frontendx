import { pipe } from "fp-ts/function"
import { findFirst as AfindFirst } from "fp-ts/Array"
import {
  Do as ODo,
  bind as Obind,
  let as Olet,
  map as Omap,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { PlasmidListFilter } from "dicty-graphql-schema"
import {
  plasmidGroupFilterOptions,
  DEFAULT_PLASMID_GROUP,
} from "../graphql_config"
import { get } from "./UrlSearchParams"

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
        OflatMap((v) =>
          pipe(
            plasmidGroupFilterOptions,
            AfindFirst(({ value }) => value === v),
            Omap(({ graphqlFilter }) => graphqlFilter),
          ),
        ),
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
    OgetOrElse(() => DEFAULT_PLASMID_GROUP),
  )

export { buildPlasmidListFilter }
