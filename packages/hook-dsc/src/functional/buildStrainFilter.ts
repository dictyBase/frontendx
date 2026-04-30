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
import { StrainListFilter } from "dicty-graphql-schema"
import { strainGroupFilterOptions } from "../graphql_config"
import { DEFAULT_GROUP } from "../const"
import { get } from "./URLSearchParams"

/**
 * buildStrainListFilter is used in the Strain Catalog. It takes the `URLSearchParams` of the current URL
 * and returns a `StrainListFilter` that can be used in `StrainListQuery` variables.
 */
const buildStrainListFilter = (parameters: URLSearchParams): StrainListFilter =>
  pipe(
    ODo,
    Olet("searchParameters", () => parameters),
    Obind("init", ({ searchParameters }) =>
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
      ),
    ),
    Olet("withName", ({ searchParameters, init }) =>
      pipe(
        searchParameters,
        get("descriptor"),
        Omap((label) => ({ ...init, label })),
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

export { buildStrainListFilter }
