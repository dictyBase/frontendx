import { TableRow, TableCell, Box } from "@material-ui/core"
import { commaSeparate } from "common/utils/strings"

interface OrthologsRowProps {
  __typename?: "Orthologs"
  id: string
  species: string
  uniprotkb: string
  gene_product: string
  source?: Array<string> | null | undefined
}

const PhenotypeRow = ({
  id,
  species,
  uniprotkb,
  gene_product,
  source,
}: OrthologsRowProps) => {
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
