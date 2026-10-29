import type { FC } from "react"
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
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material"
import { Link } from "react-router-dom"
import { match, P } from "ts-pattern"
import type { CatalogItem } from "../types"
import { abbreviateStringToLength } from "../utils/abbreviateStringToLength"

const STRAIN_BADGE_COLOR = "#2b6cb0"
const STRAIN_BADGE_BG = "#ebf8ff"
const STRAIN_BADGE_BORDER = "#bee3f8"
const PLASMID_BADGE_COLOR = "#276749"
const PLASMID_BADGE_BG = "#f0fff4"
const PLASMID_BADGE_BORDER = "#c6f6d5"

const SUMMARY_MAX_LENGTH = 120

type EntityBadgeProperties = {
  /** Type name of the catalog item (Strain or Plasmid). */
  typename: "Strain" | "Plasmid"
}

/**
 * Renders a small coloured pill indicating the stock entity type.
 *
 * @param typename - The `__typename` value to display.
 */
const EntityBadge = ({ typename }: EntityBadgeProperties) => {
  const { color, bg, border, label } = match(typename)
    .with("Strain", () => ({
      color: STRAIN_BADGE_COLOR,
      bg: STRAIN_BADGE_BG,
      border: STRAIN_BADGE_BORDER,
      label: "Strain",
    }))
    .with("Plasmid", () => ({
      color: PLASMID_BADGE_COLOR,
      bg: PLASMID_BADGE_BG,
      border: PLASMID_BADGE_BORDER,
      label: "Plasmid",
    }))
    .exhaustive()

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
 * Returns the URL path segment (`"strains"` or `"plasmids"`) for a given catalog item.
 *
 * @param item - The catalog item.
 * @returns The route path segment used to navigate to the item detail page.
 */
const toItemPath = (item: CatalogItem): string =>
  match(item)
    .with({ __typename: "Strain" }, () => "strains")
    .with({ __typename: "Plasmid" }, () => "plasmids")
    .otherwise(() => "strains")

/**
 * Returns the primary display text for a catalog item.
 * For strains, uses the label. For plasmids, uses the name.
 *
 * @param item - A `CatalogItem`.
 * @returns The string to render as the clickable link label.
 */
const getPrimaryText = (item: CatalogItem): string =>
  match(item)
    .with({ __typename: "Strain", label: P.select() }, (label) => label)
    .with({ __typename: "Plasmid", name: P.select() }, (name) => name)
    .otherwise(() => "")

/**
 * Renders a single table row for a `CatalogItem`.
 *
 * @param ActionComponent - Component rendered in the action cell; receives the catalog item.
 * @param item - The catalog item to render.
 * @returns A `<TableRow>` element.
 */
const renderItemRow =
  (ActionComponent: FC<{ item: CatalogItem }>) =>
  // eslint-disable-next-line react/function-component-definition
  (item: CatalogItem) => {
    const { id, summary } = item
    const path = toItemPath(item)
    const primaryText = getPrimaryText(item)
    const typename = match(item)
      .with({ __typename: "Strain" }, () => "Strain" as const)
      .with({ __typename: "Plasmid" }, () => "Plasmid" as const)
      .otherwise(() => "Strain" as const)

    return (
      <TableRow key={`catalog-item-${id}`} hover>
        <TableCell>
          <Stack direction="row" gap={5} alignItems="center">
            <Box>
              <EntityBadge typename={typename} />
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
        <TableCell sx={{ lineHeight: 1.6 }}>
          {pipe(summary ?? "", abbreviateStringToLength(SUMMARY_MAX_LENGTH))}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <ActionComponent item={item} />
        </TableCell>
      </TableRow>
    )
  }

type CatalogResultsTableProperties = {
  /** Array of catalog items to display in the table. */
  items: Array<CatalogItem>
  /**
   * Component rendered in the action cell of each row.
   * Typically `AddToCartButtonHandler`.
   */
  actionComponent: FC<{ item: CatalogItem }>
}

/**
 * Displays a scrollable table of catalog items (strains or plasmids).
 * Each row shows an entity-type badge, a link to the item detail page,
 * the stock ID, a truncated summary, and an action cell rendered by
 * the provided `actionComponent`.
 *
 * Similar to `SearchResultsTable` but designed for direct catalog listings
 * without search-specific fields like "Matching Field".
 *
 * @param items - The catalog items to render.
 * @param actionComponent - Component for the action cell (e.g. add-to-cart button).
 */
const CatalogResultsTable = ({
  items,
  actionComponent,
}: CatalogResultsTableProperties) => (
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
          <TableCell sx={{ width: "30%" }}>Stock</TableCell>
          <TableCell sx={{ width: "60%" }}>Summary</TableCell>
          <TableCell sx={{ width: "10%", textAlign: "center" }} />
        </TableRow>
      </TableHead>
      <TableBody>{pipe(items, Amap(renderItemRow(actionComponent)))}</TableBody>
    </Table>
  </TableContainer>
)

export { CatalogResultsTable }
export type { CatalogResultsTableProperties }
