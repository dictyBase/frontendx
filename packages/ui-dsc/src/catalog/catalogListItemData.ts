import { pipe } from "fp-ts/function"
import { replace as Sreplace, toLowerCase as StoLowerCase } from "fp-ts/string"
import {
  type Option,
  some as Osome,
  none as Onone,
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { match } from "ts-pattern"
import { StockEntityType, StockSearchFieldEnum } from "dicty-graphql-schema"
import type { StockSearchResult } from "dicty-graphql-schema"
import { capitalizeFirstCharacter } from "../utils/stringCapitalizations"
import type { CatalogItem } from "../types"
import { STRAINS_PATH, PLASMIDS_PATH } from "./constants"

/** The two stock entity kinds a catalog list item can represent. */
type CatalogEntityType = "Strain" | "Plasmid"

/**
 * The search-specific part of a {@link CatalogListItemData}: which field
 * matched the query, the matched value, and its relevance score.
 */
type CatalogListItemMatch = {
  /** The stock field that matched the search query. */
  field: StockSearchFieldEnum
  /** The matched value as returned by the search. */
  displayText: string
  /** Relevance score of the match, higher is more relevant. */
  score: number
}

/**
 * The view model rendered by {@link CatalogListItem}. Produced by either
 * {@link fromStockSearchResult} (search results, includes a `match`) or
 * {@link fromCatalogItem} (plain catalog browsing, no `match`).
 */
type CatalogListItemData = {
  /** Stock id, e.g. `"DBP0000785"`. */
  id: string
  /** Whether the item is a strain or a plasmid. */
  entity: CatalogEntityType
  /** Primary display title: the strain label or the plasmid name. */
  title: string
  /** Stock summary/description. */
  summary: string
  /** Whether the item is currently in stock. */
  inStock: boolean
  /** The underlying catalog item, forwarded to the action component. */
  item: CatalogItem
  /** The matched search field, present only for search results. */
  match: Option<CatalogListItemMatch>
}

/** Match fields whose matched value is not useful to display, i.e. it
 * duplicates the summary shown in the card body. */
const EXCLUDED_MATCH_FIELDS = new Set<StockSearchFieldEnum>([
  StockSearchFieldEnum.Summary,
  StockSearchFieldEnum.PublicNote,
])

/**
 * Reports whether a matched field's value should be hidden from the match
 * footer (shown as just the field name instead).
 *
 * @param field - The `StockSearchFieldEnum` of the match.
 * @returns `true` for `SUMMARY` and `PUBLIC_NOTE`, `false` otherwise.
 */
const isExcludedMatchField = (field: StockSearchFieldEnum): boolean =>
  EXCLUDED_MATCH_FIELDS.has(field)

/**
 * Converts a `StockSearchFieldEnum` value into a human readable label, e.g.
 * `"GENETIC_MODIFICATION"` becomes `"Genetic modification"`.
 *
 * @param field - The `StockSearchFieldEnum` value to format.
 * @returns The field name in sentence case.
 */
const matchFieldLabel = (field: StockSearchFieldEnum): string =>
  pipe(
    field as string,
    Sreplace("_", " "),
    StoLowerCase,
    capitalizeFirstCharacter,
  )

/**
 * Returns the url path segment used to link to an item's detail page.
 *
 * @param entity - The catalog entity type.
 * @returns `"strains"` or `"plasmids"`.
 */
const toEntityPath = (entity: CatalogEntityType): string =>
  match(entity)
    .with("Strain", () => STRAINS_PATH)
    .with("Plasmid", () => PLASMIDS_PATH)
    .exhaustive()

/**
 * Maps a `StockEntityType` (the GraphQL search entity filter, which also
 * includes `All`) to the two-valued {@link CatalogEntityType} a list item
 * actually renders as.
 *
 * @param entity - The `StockEntityType` of a search result.
 * @returns `"Plasmid"` for plasmid results, `"Strain"` otherwise.
 */
const toCatalogEntityType = (entity: StockEntityType): CatalogEntityType =>
  match(entity)
    .with(StockEntityType.Plasmid, () => "Plasmid" as const)
    .otherwise(() => "Strain" as const)

/**
 * Converts a `StockSearchResult` into the `CatalogItem` shape expected by
 * action components (e.g. `AddToCartButtonHandler`).
 *
 * @param result - The search result to convert.
 * @returns A `StrainItem` or `PlasmidItem`.
 */
const toCatalogItemFromResult = (result: StockSearchResult): CatalogItem =>
  match(result)
    .with({ entity: StockEntityType.Plasmid }, (r) => ({
      __typename: "Plasmid" as const,
      id: r.id,
      name: r.stock_label,
      summary: r.summary,
      in_stock: r.in_stock,
    }))
    .otherwise((r) => ({
      __typename: "Strain" as const,
      id: r.id,
      label: r.stock_label,
      summary: r.summary,
      in_stock: r.in_stock,
    }))

/**
 * Builds the {@link CatalogListItemData} view model for a full-text search
 * result, including its {@link CatalogListItemMatch}.
 *
 * @param result - The `StockSearchResult` to convert.
 * @returns The view model rendered by `CatalogListItem`.
 */
const fromStockSearchResult = (
  result: StockSearchResult,
): CatalogListItemData => ({
  id: result.id,
  entity: toCatalogEntityType(result.entity),
  title: result.stock_label,
  summary: result.summary,
  inStock: result.in_stock,
  item: toCatalogItemFromResult(result),
  match: Osome({
    field: result.field,
    displayText: result.display_text,
    score: result.score,
  }),
})

/**
 * Returns the primary display title for a catalog item: the strain label or
 * the plasmid name.
 *
 * @param item - A `CatalogItem`.
 * @returns The title string, or an empty string when the item's `__typename`
 *   is missing.
 */
const getCatalogItemTitle = (item: CatalogItem): string =>
  match(item)
    .with({ __typename: "Strain" }, ({ label }) => label)
    .with({ __typename: "Plasmid" }, ({ name }) => name)
    .otherwise(() => "")

/**
 * Returns the {@link CatalogEntityType} of a catalog item.
 *
 * @param item - A `CatalogItem`.
 * @returns `"Plasmid"` for plasmid items, `"Strain"` otherwise (including
 *   when `__typename` is missing).
 */
const getCatalogItemEntity = (item: CatalogItem): CatalogEntityType =>
  match(item)
    .with({ __typename: "Plasmid" }, () => "Plasmid" as const)
    .otherwise(() => "Strain" as const)

/**
 * Builds the {@link CatalogListItemData} view model for a plain catalog item
 * (i.e. browsing results with no search match).
 *
 * @param item - The `CatalogItem` to convert.
 * @returns The view model rendered by `CatalogListItem`, with `match` set to `none`.
 */
const fromCatalogItem = (item: CatalogItem): CatalogListItemData => ({
  id: item.id,
  entity: getCatalogItemEntity(item),
  title: getCatalogItemTitle(item),
  summary: pipe(
    item.summary,
    OfromNullable,
    OgetOrElse(() => ""),
  ),
  inStock: item.in_stock,
  item,
  match: Onone,
})

export {
  fromStockSearchResult,
  fromCatalogItem,
  toEntityPath,
  matchFieldLabel,
  isExcludedMatchField,
  type CatalogEntityType,
  type CatalogListItemMatch,
  type CatalogListItemData,
}
