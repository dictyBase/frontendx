import type { FC } from "react"
import { pipe, flow, flip } from "fp-ts/function"
import {
  replace as Sreplace,
  toLowerCase as StoLowerCase,
  Eq as SEq,
  isEmpty as SisEmpty,
} from "fp-ts/string"
import {
  fromPredicate as OfromPredicate,
  filter as Ofilter,
  map as Omap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { map as Amap } from "fp-ts/Array"
import { elem as Setelem } from "fp-ts/Set"
import { not } from "fp-ts/Predicate"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material"
import { Link } from "react-router-dom"
import { match } from "ts-pattern"
import { StockEntityType } from "dicty-graphql-schema"
import type { StockSearchResult } from "dicty-graphql-schema"
import { capitalizeFirstCharacter } from "../utils/stringCapitalizations"
import type { CatalogItem } from "../types"
import { abbreviateStringToLength } from "../utils/abbreviateStringToLength"

const STRAIN_BADGE_COLOR = "#2b6cb0"
const STRAIN_BADGE_BG = "#ebf8ff"
const STRAIN_BADGE_BORDER = "#bee3f8"
const PLASMID_BADGE_COLOR = "#276749"
const PLASMID_BADGE_BG = "#f0fff4"
const PLASMID_BADGE_BORDER = "#c6f6d5"

const SUMMARY_MAX_LENGTH = 120

const normalizeMatchField = flow(
  Sreplace("_", " "),
  StoLowerCase,
  capitalizeFirstCharacter,
)

const excludedFieldValues = new Set(["SUMMARY", "PUBLIC_NOTE"])

// eslint-disable-next-line unicorn/prevent-abbreviations
type curriedElemReturn = (a: string) => (set: Set<string>) => boolean

const isExcluded = flip(Setelem(SEq) as curriedElemReturn)(excludedFieldValues)

const getMatchingFieldValue = (field: string, displayText: string) =>
  pipe(
    field,
    OfromPredicate(not(SisEmpty)),
    Ofilter(not(isExcluded)),
    Omap(() => `: ${displayText}`),
    OgetOrElse(() => ""),
  )

type EntityBadgeProperties = {
  /** Entity type of the stock result (strain or plasmid). */
  entity: StockEntityType
}

/**
 * Renders a small coloured pill indicating the stock entity type.
 *
 * @param entity - The `StockEntityType` value to display.
 */
const EntityBadge = ({ entity }: EntityBadgeProperties) => {
  const { color, bg, border, label } = match(entity)
    .with(StockEntityType.Strain, () => ({
      color: STRAIN_BADGE_COLOR,
      bg: STRAIN_BADGE_BG,
      border: STRAIN_BADGE_BORDER,
      label: "Strain",
    }))
    .with(StockEntityType.Plasmid, () => ({
      color: PLASMID_BADGE_COLOR,
      bg: PLASMID_BADGE_BG,
      border: PLASMID_BADGE_BORDER,
      label: "Plasmid",
    }))
    .otherwise(() => ({
      color: STRAIN_BADGE_COLOR,
      bg: STRAIN_BADGE_BG,
      border: STRAIN_BADGE_BORDER,
      label: "Stock",
    }))

  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        flexShrink: 0,
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        px: "6px",
        py: "2px",
        borderRadius: "4px",
        color,
        backgroundColor: bg,
        border: `1px solid ${border}`,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
      }}>
      {label}
    </Box>
  )
}

/**
 * Returns the URL path segment (`"strains"` or `"plasmids"`) for a given entity type.
 *
 * @param entity - The `StockEntityType` of the search result.
 * @returns The route path segment used to navigate to the item detail page.
 */
const toItemPath = (entity: StockEntityType): string =>
  match(entity)
    .with(StockEntityType.Strain, () => "strains")
    .with(StockEntityType.Plasmid, () => "plasmids")
    .with(StockEntityType.All, () => "strains")
    .exhaustive()

/**
 * Returns the primary display text for a search result row.
 * For strains, the strain label is preferred over the raw matched text.
 *
 * @param result - A `StockSearchResult` item.
 * @returns The string to render as the clickable link label.
 */
const getPrimaryText = (result: StockSearchResult): string =>
  match(result)
    .with(
      { entity: StockEntityType.Strain },
      ({ strain_label, id }) => strain_label || id,
    )
    .otherwise(({ id }) => id)

/**
 * Converts a `StockSearchResult` to a `CatalogItem` so it can be passed to
 * action components (e.g. `AddToCartButtonHandler`) that expect the standard
 * catalog item shape.
 *
 * Strain results use `strain_label` (falling back to `display_text`) as the
 * `label` field. Plasmid results use `display_text` as the `name` field.
 *
 * @param result - The search result to convert.
 * @returns A `CatalogItem` (`StrainItem` or `PlasmidItem`) with all required fields.
 */
const toStockCatalogItem = (result: StockSearchResult): CatalogItem =>
  match(result)
    .with({ entity: StockEntityType.Strain }, (r) => ({
      __typename: "Strain" as const,
      id: r.id,
      label: r.strain_label || r.display_text,
      summary: r.summary,
      in_stock: r.in_stock,
    }))
    .with({ entity: StockEntityType.Plasmid }, (r) => ({
      __typename: "Plasmid" as const,
      id: r.id,
      name: r.display_text,
      summary: r.summary,
      in_stock: r.in_stock,
    }))
    .otherwise((r) => ({
      __typename: "Strain" as const,
      id: r.id,
      label: r.display_text,
      summary: r.summary,
      in_stock: r.in_stock,
    }))

/**
 * Renders a single table row for a `StockSearchResult`.
 *
 * @param ActionComponent - Component rendered in the action cell; receives the
 *   result converted to a `CatalogItem`.
 * @param result - The search result to render.
 * @returns A `<TableRow>` element.
 */
const renderResultRow =
  (ActionComponent: FC<{ item: CatalogItem }>) =>
  // eslint-disable-next-line react/function-component-definition
  (result: StockSearchResult) => {
    const { id, entity, summary, field, display_text } = result
    const path = toItemPath(entity)
    const primaryText = getPrimaryText(result)
    const catalogItem = toStockCatalogItem(result)

    return (
      <TableRow key={`search-result-${id}`} hover>
        <TableCell>
          <Stack direction="row" gap={5} alignItems="center">
            <Box>
              <EntityBadge entity={entity} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <MuiLink
                component={Link}
                to={`/${path}/${id}`}
                sx={{
                  display: "block",
                  color: "#004080",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: 1.4,
                  wordBreak: "break-word",
                  "&:hover": {
                    textDecoration: "underline",
                    color: "#2c5282",
                  },
                }}>
                {primaryText}
              </MuiLink>
              <Typography
                sx={{ fontSize: "0.75rem", color: "#718096", mt: 0.25 }}>
                {id}
              </Typography>
            </Box>
          </Stack>
        </TableCell>
        <TableCell sx={{ lineHeight: 1.6, wordBreak: "break-word" }}>
          <Typography variant="caption">{`${normalizeMatchField(
            field,
          )}`}</Typography>
          {`${getMatchingFieldValue(field, display_text)}`}
        </TableCell>
        <TableCell sx={{ lineHeight: 1.6 }}>
          {pipe(summary, abbreviateStringToLength(SUMMARY_MAX_LENGTH))}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <ActionComponent item={catalogItem} />
        </TableCell>
      </TableRow>
    )
  }

type SearchResultsTableProperties = {
  /** Array of stock search results to display in the table. */
  results: Array<StockSearchResult>
  /**
   * Component rendered in the action cell of each row.
   * Receives the result converted to a `CatalogItem`.
   * Typically `AddToCartButtonHandler`.
   */
  actionComponent: FC<{ item: CatalogItem }>
}

/**
 * Displays a scrollable table of stock search results returned by the
 * `searchStocks` query. Each row shows an entity-type badge, a link to the
 * item detail page, the stock ID, a truncated summary, and an action cell
 * rendered by the provided `actionComponent`.
 *
 * @param results - The `StockSearchResult` items to render.
 * @param actionComponent - Component for the action cell (e.g. add-to-cart button).
 */
const SearchResultsTable = ({
  results,
  actionComponent,
}: SearchResultsTableProperties) => (
  <TableContainer
    sx={{
      maxHeight: "700px",
      overflowY: "auto",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    }}>
    <Table stickyHeader sx={{ tableLayout: "fixed" }}>
      <TableHead>
        <TableRow>
          <TableCell>Stock</TableCell>
          <TableCell>Matching Field</TableCell>
          <TableCell sx={{ width: "40%" }}>Summary</TableCell>
          <TableCell sx={{ width: "10%", textAlign: "center" }} />
        </TableRow>
      </TableHead>
      <TableBody>
        {pipe(results, Amap(renderResultRow(actionComponent)))}
      </TableBody>
    </Table>
  </TableContainer>
)

export { SearchResultsTable, toStockCatalogItem }
export type { SearchResultsTableProperties }
