import { TableRow, TableCell, Box } from "@material-ui/core"
import { commaSeparate } from "common/utils/strings"
import { Orthologs } from "dicty-graphql-schema"

const PhenotypeRow = ({
  id,
  species,
  uniprotkb,
  gene_product,
  source,
}: Orthologs) => {
  return (
    <TableRow>
      <TableCell>
        {species ? (
          <>
            <Box>{species}</Box>
          </>
        ) : (
          <></>
        )}
      </TableCell>
      <TableCell>
        {id ? (
          <>
            <Box>
              <a href={id.link}>{id.name}</a>
            </Box>
          </>
        ) : (
          <></>
        )}
      </TableCell>
      <TableCell>
        <a href={uniprotkb.link}>{uniprotkb.name}</a>
      </TableCell>
      <TableCell>{gene_product}</TableCell>
      <TableCell>{source ? commaSeparate(source) : ""}</TableCell>
    </TableRow>
  )
}

export default PhenotypeRow
