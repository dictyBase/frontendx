import { TableRow, TableCell, Box, IconButton, Tooltip } from "@mui/material"
import { pipe } from "fp-ts/function"
import { fromNullable as OfromNullable, match as Omatch } from "fp-ts/Option"
import { RemoveShoppingCart, ShoppingCart } from "@mui/icons-material"
import { commaSeparate } from "common/utils/strings"
import { PublicationCellContents } from "./PublicationCellContents"

interface PhenotypeRowProperties {
  id: string
  strain?: string
  characteristics?: string[] | null | undefined
  phenotype: {
    __typename?: "Phenotype"
    phenotype: string
    publication?:
      | {
          __typename?: "Publication"
          id: string
          title: string
          journal: string
          pages?: string | null | undefined
          volume?: string | null | undefined
          pub_date?: any | null | undefined
          authors: Array<{
            __typename?: "Author"
            last_name: string
            rank?: string | null | undefined
          }>
        }
      | null
      | undefined
  }
  in_stock?: boolean
}

const renderInStock = (in_stock: boolean) => (
  <Tooltip title={in_stock ? "Strain available" : "Strain unavailable"}>
    <span>
      <IconButton size="small" disabled={!in_stock}>
        {in_stock ? <ShoppingCart color="secondary" /> : <RemoveShoppingCart />}
      </IconButton>
    </span>
  </Tooltip>
)

const PhenotypeRow = ({
  id,
  strain,
  characteristics,
  phenotype,
  in_stock,
}: PhenotypeRowProperties) => {
  const { publication } = phenotype
  return (
    <TableRow>
      <TableCell>
        {in_stock === undefined ? <></> : renderInStock(in_stock)}
      </TableCell>
      <TableCell>
        {strain ? (
          <>
            <Box>
              <a href={`${import.meta.env.VITE_STOCKCENTER_URL}/strains/${id}`}>
                {strain}
              </a>
            </Box>
            <Box>({id})</Box>
          </>
        ) : (
          <></>
        )}
      </TableCell>
      <TableCell>
        {characteristics ? commaSeparate(characteristics) : ""}
      </TableCell>
      <TableCell>{phenotype.phenotype}</TableCell>
      <TableCell>
        {pipe(
          publication,
          OfromNullable,
          Omatch(
            () => <></>,
            (p) => <PublicationCellContents publication={p} />,
          ),
        )}
      </TableCell>
    </TableRow>
  )
}

export { PhenotypeRow }
