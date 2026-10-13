import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Link as MuiLink,
  Stack,
} from "@mui/material"
import { Link } from "react-router-dom"
import { match } from "ts-pattern"
import { StockEntityType, StockSearchFieldEnum } from "dicty-graphql-schema"
import type { StockSearchResult } from "dicty-graphql-schema"
import { abbreviateStringToLength } from "../utils/abbreviateStringToLength"

const STRAIN_BADGE_COLOR = "#2b6cb0"
const STRAIN_BADGE_BG = "#ebf8ff"
const STRAIN_BADGE_BORDER = "#bee3f8"
const PLASMID_BADGE_COLOR = "#276749"
const PLASMID_BADGE_BG = "#f0fff4"
const PLASMID_BADGE_BORDER = "#c6f6d5"

const SUMMARY_MAX_LENGTH = 120

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
 * Maps a `StockSearchFieldEnum` value to a human-readable label.
 *
 * @param field - The search field enum value.
 * @returns A display-friendly label string.
 */
const formatSearchField = (field: StockSearchFieldEnum): string =>
  match(field)
    .with(StockSearchFieldEnum.Label, () => "Label")
    .with(StockSearchFieldEnum.Name, () => "Name")
    .with(StockSearchFieldEnum.Genes, () => "Gene")
    .with(StockSearchFieldEnum.Depositor, () => "Depositor")
    .with(StockSearchFieldEnum.Dbxrefs, () => "ID")
    .with(StockSearchFieldEnum.Summary, () => "Summary")
    .with(StockSearchFieldEnum.StockId, () => "Stock ID")
    .with(StockSearchFieldEnum.Species, () => "Species")
    .with(StockSearchFieldEnum.Plasmid, () => "Plasmid")
    .with(StockSearchFieldEnum.Names, () => "Names")
    .exhaustive()

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
      ({ strain_label, display_text }) => strain_label || display_text,
    )
    .otherwise(({ display_text }) => display_text)

/**
 * Returns a secondary "matched via" subtitle string for strain results whose
 * matched field text differs from the strain label, or `undefined` when no
 * subtitle is needed.
 *
 * @param result - A `StockSearchResult` item.
 * @returns A subtitle string such as `"Gene: gpaA"`, or `undefined`.
 */
const getMatchSubtitle = (result: StockSearchResult): string | undefined => {
  if (result.entity !== StockEntityType.Strain) return undefined
  if (!result.strain_label || result.strain_label === result.display_text)
    return undefined
  return `${formatSearchField(result.field)}: ${result.display_text}`
}

/**
 * Renders a single table row for a `StockSearchResult`.
 *
 * @param result - The search result to render.
 * @returns A `<TableRow>` element.
 */
const renderResultRow = (result: StockSearchResult) => {
  const { id, entity, summary } = result
  const path = toItemPath(entity)
  const primaryText = getPrimaryText(result)
  const matchSubtitle = getMatchSubtitle(result)

  return (
    <TableRow key={`search-result-${id}`} hover>
      <TableCell>
        <Stack direction="row" gap={5} alignItems="center">
          <Box sx={{ pt: "2px" }}>
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
            {matchSubtitle && (
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#718096",
                  mt: 0.25,
                }}>
                Matched {matchSubtitle}
              </Typography>
            )}
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={{ lineHeight: 1.6 }}>
        {pipe(summary, abbreviateStringToLength(SUMMARY_MAX_LENGTH))}
      </TableCell>
    </TableRow>
  )
}

type SearchResultsTableProperties = {
  /** Array of stock search results to display in the table. */
  results: Array<StockSearchResult>
}

/**
 * Displays a scrollable table of stock search results returned by the
 * `searchStocks` query. Each row shows an entity-type badge, a link to the
 * item detail page, an optional "matched via" subtitle for strain results
 * whose match field differs from the strain label, and a truncated summary.
 *
 * @param results - The `StockSearchResult` items to render.
 */
const SearchResultsTable = ({ results }: SearchResultsTableProperties) => (
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
          <TableCell sx={{ width: "35%" }}>Stock</TableCell>
          <TableCell sx={{ width: "65%" }}>Summary</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{pipe(results, Amap(renderResultRow))}</TableBody>
    </Table>
  </TableContainer>
)

export { SearchResultsTable }
export type { SearchResultsTableProperties }
