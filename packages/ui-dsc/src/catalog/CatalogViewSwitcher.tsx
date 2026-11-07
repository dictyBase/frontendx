import type { MouseEvent } from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ViewListIcon from "@mui/icons-material/ViewList"
import TableRowsIcon from "@mui/icons-material/TableRows"
import { pipe } from "fp-ts/function"
import { fromNullable as OfromNullable, match as Omatch } from "fp-ts/Option"

/** Available presentation modes for the catalog results area. */
type CatalogView = "list" | "table"

type CatalogViewSwitcherProperties = {
  /** Currently active catalog view mode. */
  view: CatalogView
  /** Callback fired when the user selects a different view mode. */
  onChange: (view: CatalogView) => void
}

/**
 * Renders a toggle button group that switches the catalog results display
 * between the card list view and the tabular view.
 *
 * @param view - Currently active catalog view mode.
 * @param onChange - Callback invoked with the newly selected view mode.
 */
const CatalogViewSwitcher = ({
  view,
  onChange,
}: CatalogViewSwitcherProperties) => {
  const handleChange = (
    _: MouseEvent<HTMLElement>,
    nextView: CatalogView | null,
  ) => {
    pipe(
      nextView,
      OfromNullable,
      Omatch(
        () => {},
        (next) => onChange(next),
      ),
    )
  }

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      size="small"
      aria-label="catalog view mode"
      onChange={handleChange}
      sx={{
        backgroundColor: "background.paper",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
        "& .MuiToggleButton-root": {
          gap: 1,
          px: 2.5,
          py: 1,
          fontSize: "14px",
          fontWeight: 600,
          textTransform: "none",
          color: "text.secondary",
          borderColor: "divider",
          "&.Mui-selected": {
            backgroundColor: "#ebf8ff",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "#dbeafe",
            },
          },
        },
      }}>
      <ToggleButton value="list" aria-label="list view">
        <ViewListIcon fontSize="small" />
        List
      </ToggleButton>
      <ToggleButton value="table" aria-label="table view">
        <TableRowsIcon fontSize="small" />
        Table
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export { CatalogViewSwitcher }
export type { CatalogView, CatalogViewSwitcherProperties }
