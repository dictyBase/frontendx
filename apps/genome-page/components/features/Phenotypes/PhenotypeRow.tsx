import {
  TableRow,
  TableCell,
  Box,
  IconButton,
  Tooltip,
} from "@material-ui/core"
import { RemoveShoppingCart, ShoppingCart } from "@material-ui/icons"
import { commaSeparate, commaSeparateWithAnd } from "common/utils/strings"
import OtherError from "components/errors/OtherError"

interface PhenotypeRowProps {
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
    <IconButton size="small" disabled={in_stock ? false : true}>
      {in_stock ? <ShoppingCart color="secondary" /> : <RemoveShoppingCart />}
    </IconButton>
  </Tooltip>
)

const PhenotypeRow = ({
  id,
  strain,
  characteristics,
  phenotype,
  in_stock,
}: PhenotypeRowProps) => {
  const publication = phenotype.publication
  if (!publication) return <OtherError />

  const { authors, title, journal, pages } = publication
  const authorLastNames = authors.map((a) => a.last_name)

  return (
    <TableRow>
      <TableCell>
        {in_stock !== undefined ? renderInStock(in_stock) : <></>}
      </TableCell>
      <TableCell>
        {strain ? (
          <>
            <Box>
              <a href={`/stockcenter/strains/${id}`}>{strain}</a>
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
        <b>{commaSeparateWithAnd(authorLastNames)}</b> &nbsp;
        <span>'{title}'</span> &nbsp;
        <i>{journal}</i> &nbsp; <span>{pages}</span>
      </TableCell>
    </TableRow>
  )
}

export default PhenotypeRow
