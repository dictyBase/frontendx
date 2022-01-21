import { Chip, TableCell, TableRow } from "@material-ui/core"
import { commaSeparateWithAnd } from "common/utils/strings"

interface PublicationRowProps {
  publication: {
    __typename?: "PublicationWithGene"
    id: string
    doi?: string | null
    title: string
    journal: string
    pub_date?: any | null
    volume?: string | null
    pages?: string | null
    pub_type: string
    source: string
    issue?: string | null
    related_genes: Array<{ __typename?: "Gene"; id: string; name: string }>
    authors: Array<{
      __typename?: "Author"
      last_name: string
      rank?: string | null
    }>
  }
}

const PublicationRow = ({ publication }: PublicationRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <b>
          {commaSeparateWithAnd(publication.authors.map((a) => a.last_name))}
        </b>
        &nbsp; '{publication.title}' &nbsp;
        <i>{publication.journal}</i>
        &nbsp;
        {publication.pages}
      </TableCell>

      <TableCell>
        {publication.related_genes.map((gene, i) => (
          <Chip
            label={gene.name}
            size="small"
            style={{ margin: "0px 5px 5px 0px" }}
            variant="outlined"
          />
        ))}
      </TableCell>
    </TableRow>
  )
}

export default PublicationRow
