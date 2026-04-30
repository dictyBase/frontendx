import { pipe } from "fp-ts/function"
import { findFirst as AfindFirst } from "fp-ts/Array"
import { Do as IDo, let as Ilet } from "fp-ts/Identity"
import {
  map as Omap,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { StrainListFilter } from "dicty-graphql-schema"
import {
  strainGroupFilterOptions,
  DEFAULT_STRAIN_GROUP,
} from "../graphql_config"
import { get } from "./UrlSearchParameters"

/**
 * buildStrainListFilter is used in the Strain Catalog. It takes the `URLSearchParams` of the current URL
 * and returns a `StrainListFilter` that can be used in `StrainListQuery` variables.
 */
const buildStrainListFilter = (parameters: URLSearchParams) =>
  pipe(
    IDo,
    Ilet("searchParameters", () => parameters),
    Ilet("init", () => DEFAULT_STRAIN_GROUP as StrainListFilter),
    Ilet("withGroup", ({ init, searchParameters }) =>
      pipe(
        searchParameters,
        get("group"),
        OflatMap((v) =>
          pipe(
            strainGroupFilterOptions,
            AfindFirst(({ value }) => value === v),
            Omap(({ graphqlFilter }) => graphqlFilter),
          ),
        ),
        OgetOrElse(() => init),
      ),
    ),
    Ilet("withLabel", ({ searchParameters, withGroup }) =>
      pipe(
        searchParameters,
        get("descriptor"),
        Omap((label) => ({ ...withGroup, label })),
        OgetOrElse(() => withGroup),
      ),
    ),
    Ilet("withSummary", ({ searchParameters, withLabel }) =>
      pipe(
        searchParameters,
        get("summary"),
        Omap((summary) => ({ ...withLabel, summary })),
        OgetOrElse(() => withLabel),
      ),
    ),
    ({ withSummary }) => withSummary,
  )

export { buildStrainListFilter }
