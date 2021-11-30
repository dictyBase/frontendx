import { TableRow, TableCell, Box } from "@material-ui/core"
import { commaSeparate } from "common/utils/strings"
import { Phenotype } from "dicty-graphql-schema"

interface PhenotypeRowProps {
  id: string
  strain?: string
  characteristics?: string[]
  phenotype: Phenotype
}

const PhenotypeRow = ({
  id,
  strain,
  characteristics,
  phenotype,
}: PhenotypeRowProps) => {
  return (
    <TableRow>
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
      <TableCell></TableCell>
    </TableRow>
  )
}

export default PhenotypeRow
