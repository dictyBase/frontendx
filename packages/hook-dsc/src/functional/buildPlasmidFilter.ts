import { pipe } from "fp-ts/function"
import { findFirst as AfindFirst } from "fp-ts/Array"
import { Do as IDo, let as Ilet } from "fp-ts/Identity"
import {
  map as Omap,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { PlasmidListFilter } from "dicty-graphql-schema"
import {
  plasmidGroupFilterOptions,
  DEFAULT_PLASMID_GROUP,
} from "../graphql_config"
import { get } from "./UrlSearchParameters"

/**
 * buildPlasmidListFilter is used in the Plasmid Catalog. It takes the `URLSearchParams` of the current URL
 * and returns a `PlasmidListFilter` that can be used in `PlasmidListQuery` variables.
 */
const buildPlasmidListFilter = (
  parameters: URLSearchParams,
): PlasmidListFilter =>
  pipe(
    IDo,
    Ilet("searchParameters", () => parameters),
    Ilet("init", () => DEFAULT_PLASMID_GROUP as PlasmidListFilter),
    Ilet("withGroup", ({ init, searchParameters }) =>
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
        OgetOrElse(() => init),
      ),
    ),
    Ilet("withName", ({ searchParameters, withGroup }) =>
      pipe(
        searchParameters,
        get("descriptor"),
        Omap((name) => ({ ...withGroup, name })),
        OgetOrElse(() => withGroup),
      ),
    ),
    Ilet("withSummary", ({ searchParameters, withName }) =>
      pipe(
        searchParameters,
        get("summary"),
        Omap((summary) => ({ ...withName, summary })),
        OgetOrElse(() => withName),
      ),
    ),
    ({ withSummary }) => withSummary,
  )
export { buildPlasmidListFilter }
