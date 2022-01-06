import { TableCell, TableRow } from "@material-ui/core"
import { commaSeparateWithAnd } from "common/utils/strings"
import { Link } from "react-router-dom"

interface PublicationRowProps {
  publication: {
    __typename?: "PublicationWithGene"
    id: string
    doi?: string | undefined
    title: string
    journal: string
    pub_date?: any | undefined
    volume?: string | undefined
    pages?: string | undefined
    pub_type: string
    source: string
    issue?: string | undefined
    related_genes: Array<{ __typename?: "Gene"; id: string; name: string }>
    authors: Array<{
      __typename?: "Author"
      last_name: string
      rank?: string | undefined
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
        {publication.issue}
      </TableCell>

      <TableCell>
        {publication.related_genes.map((gene, i) => (
          <>
            <Link to={`/gene/${gene.id}`} key={`${gene.id}_${i}`}>
              {gene.name}
            </Link>
            {i !== publication.related_genes.length - 1 ? ", " : ""}
          </>
        ))}
      </TableCell>
    </TableRow>
  )
}

export default PublicationRow
