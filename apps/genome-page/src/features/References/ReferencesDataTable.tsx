import OtherError from "components/errors/OtherError"
import { GeneQuery } from "dicty-graphql-schema"
import { commaSeparateWithAnd } from "common/utils/strings"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { Link } from "react-router-dom"
import useStyles from "../../common/styles/dataTableStyles"

interface Props {
  data: GeneQuery
}

const ReferencesDataTable = ({ data }: Props) => {
  const classes = useStyles()

  if (!data.allPublications) return <OtherError />
  const publications = data.allPublications

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="phenotypes-table">
        <TableHead className={classes.head}>
          <TableRow className={classes.headRow}>
            <TableCell>Reference</TableCell>
            <TableCell>Other Genes Mentioned</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {publications.map((publication, i) => (
            <TableRow key={i}>
              <TableCell>
                <b>
                  {commaSeparateWithAnd(
                    publication.authors.map((a) => a.last_name),
                  )}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ReferencesDataTable
