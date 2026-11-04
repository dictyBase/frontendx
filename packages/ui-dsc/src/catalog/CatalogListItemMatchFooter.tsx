import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { match as Bmatch } from "fp-ts/boolean"
import { pipe } from "fp-ts/function"
import { MatchFieldIcon } from "./MatchFieldIcon"
import {
  matchFieldLabel,
  isExcludedMatchField,
  type CatalogListItemMatch,
} from "./catalogListItemData"
import { formatFormattedString } from "../utils/formatFormattedString"

type CatalogListItemMatchFooterProperties = {
  /** The search match this footer describes. */
  match: CatalogListItemMatch
}

/**
 * Renders the matched search field, its matched value (quoted, unless the
 * field is excluded from display), and the relevance score. Shown below the
 * body of a {@link CatalogListItem} when it was produced from a search
 * result.
 *
 * @param match - The field, matched value, and score to render.
 */
const CatalogListItemMatchFooter = ({
  match,
}: CatalogListItemMatchFooterProperties) => {
  const { field, displayText, score } = match

  return (
    <Box
      sx={{
        borderTop: 1,
        borderColor: "divider",
        mt: 1.5,
        px: 2,
        pt: 1.25,
        pb: 1.5,
      }}>
      <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
        <MatchFieldIcon
          field={field}
          sx={{ fontSize: "1rem", color: "text.secondary" }}
        />
        <Typography
          component="span"
          sx={{ fontWeight: 700, fontSize: "0.8rem" }}>
          {matchFieldLabel(field)}
        </Typography>
        {pipe(
          isExcludedMatchField(field),
          Bmatch(
            () => (
              <Typography
                component="span"
                sx={{
                  fontStyle: "italic",
                  color: "text.secondary",
                  fontSize: "0.8rem",
                }}>
                “{formatFormattedString(displayText)}”
              </Typography>
            ),
            () => <></>,
          ),
        )}
        <Box
          component="span"
          aria-hidden
          sx={{ borderLeft: 1, borderColor: "divider", alignSelf: "stretch" }}
        />
        <Typography
          component="span"
          sx={{ color: "text.disabled", fontSize: "0.75rem" }}>
          {`score ${score.toFixed(1)}`}
        </Typography>
      </Stack>
    </Box>
  )
}

export { CatalogListItemMatchFooter }
export type { CatalogListItemMatchFooterProperties }
