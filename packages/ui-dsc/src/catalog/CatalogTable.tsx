import { RefObject } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  LinearProgress,
  Link as MuiLink,
} from "@mui/material"
import { Link } from "react-router-dom"
import type { StrainItem } from "../types"

type CatalogTableProperties = {
  /** Array of strains to display */
  strains: Array<StrainItem>
  /** Whether more data is being loaded */
  isLoading?: boolean
  /** Ref to attach to the loading indicator for infinite scroll */
  loadMoreRef?: RefObject<HTMLTableRowElement>
  /** Render function for the action cell (typically add to cart button) */
  renderActions?: (strain: StrainItem) => JSX.Element
}

const CatalogTable = ({
  strains,
  isLoading = false,
  loadMoreRef,
  renderActions,
}: CatalogTableProperties) => (
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
          <TableCell sx={{ width: "30%" }}>Strain Descriptor</TableCell>
          <TableCell sx={{ width: "60%" }}>Strain Summary</TableCell>
          <TableCell sx={{ width: "10%", textAlign: "center" }} />
        </TableRow>
      </TableHead>
      <TableBody>
        {strains.map((strain) => (
          <TableRow key={strain.id} hover>
            <TableCell>
              <MuiLink
                component={Link}
                to={`/strains/${strain.id}`}
                sx={{
                  color: "#004080",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "15px",
                  fontFamily: "'Monaco', 'Courier New', monospace",
                  lineHeight: 1.4,
                  textOverflow: "wrap",
                  display: "block",
                  "&:hover": {
                    textDecoration: "underline",
                    color: "#2c5282",
                  },
                }}>
                {strain.label}
              </MuiLink>
            </TableCell>
            <TableCell sx={{ lineHeight: 1.6 }}>
              {strain.summary || ""}
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>
              {renderActions?.(strain)}
            </TableCell>
          </TableRow>
        ))}
        {isLoading && (
          <TableRow ref={loadMoreRef}>
            <TableCell colSpan={3}>
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
)

export { CatalogTable }
export type { CatalogTableProperties }
