import OtherError from "components/errors/OtherError"
import { GeneQuery } from "dicty-graphql-schema"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import useStyles from "../../../styles/dataTableStyles"
import PublicationRow from "./PublicationRow"

interface Props {
  data: GeneQuery
}

const ReferencesDataTable = ({ data }: Props) => {
  const classes = useStyles()

  if (!data.allPublications?.publications) return <OtherError />
  const publications = data.allPublications.publications

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
            <PublicationRow publication={publication} key={i} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ReferencesDataTable
