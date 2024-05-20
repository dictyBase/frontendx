import { OtherError } from "components/errors/OtherError"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { useStyles } from "../../../styles/dataTableStyles"
import { PublicationRow } from "./PublicationRow"

interface Properties {
  publications: NonNullable<ListPublicationsWithGeneQuery["listPublicationsWithGene"]>
}

const ReferencesDataTable = ({ publications }: Properties) => {
  const classes = useStyles()

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
          {publications.map((publication) => (
            <PublicationRow publication={publication} key={publication.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { ReferencesDataTable }
