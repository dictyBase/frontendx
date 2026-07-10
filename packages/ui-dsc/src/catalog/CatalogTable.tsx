import { RefObject, FC } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { map as Amap } from "fp-ts/Array"
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
import type { StrainItem, CatalogItem } from "../types"
import { getCatalogItemPathAndDescriptor } from "../utils/getCatalogItemPathAndDescriptor"

type CatalogTableProperties = {
  /** Array of strains to display */
  strains: Array<StrainItem>
  /** Whether more data is being loaded */
  isLoading?: boolean
  /** Ref to attach to the loading indicator for infinite scroll */
  loadMoreRef?: RefObject<HTMLTableRowElement>
  nextCursor: number
  /** component for the action cell (typically add to cart button) */
  actionComponent: FC<{ item: CatalogItem }>
}

const renderCatalogItemRow =
  (ActionComponent: FC<{ item: CatalogItem }>) =>
  // eslint-disable-next-line react/function-component-definition
  (item: CatalogItem) => {
    const { itemDescriptor, itemPath } = getCatalogItemPathAndDescriptor(item)
    const { id, summary } = item
    return (
      <TableRow key={id} hover>
        <TableCell>
          <MuiLink
            component={Link}
            to={`/${itemPath}/${id}`}
            sx={{
              color: "#004080",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: 1.4,
              display: "block",
              "&:hover": {
                textDecoration: "underline",
                color: "#2c5282",
              },
            }}>
            {itemDescriptor}
          </MuiLink>
        </TableCell>
        <TableCell sx={{ lineHeight: 1.6 }}>{summary}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <ActionComponent item={item} />
        </TableCell>
      </TableRow>
    )
  }

const CatalogTable = ({
  strains,
  isLoading = false,
  loadMoreRef,
  nextCursor,
  actionComponent,
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
        {pipe(strains, Amap(renderCatalogItemRow(actionComponent)))}
        {pipe(
          nextCursor === 0,
          Bmatch(
            () => (
              <TableRow
                // className={classes.row}
                key="linear-progess"
                ref={loadMoreRef}>
                <TableCell colSpan={4}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            ),
            () => <></>,
          ),
        )}
      </TableBody>
    </Table>
  </TableContainer>
)

export { CatalogTable }
export type { CatalogTableProperties }
