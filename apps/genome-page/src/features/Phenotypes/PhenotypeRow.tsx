import { TableRow, TableCell, Box } from "@material-ui/core"
import { commaSeparate, commaSeparateWithAnd } from "common/utils/strings"
import { Phenotype, Publication } from "dicty-graphql-schema"

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
  const { authors, title, journal, issue } =
    phenotype.publication as Publication
  const authorLastNames = authors?.map(
    (a) => a?.last_name as string,
  ) as string[]

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
      <TableCell>
        <b>{commaSeparateWithAnd(authorLastNames)}</b> '{title}'{" "}
        <i>{journal}</i> {issue}
      </TableCell>
    </TableRow>
  )
}

export default PhenotypeRow
