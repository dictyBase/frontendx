import { OtherError } from "components/errors/OtherError"
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
import { useStyles } from "../../../styles/dataTableStyles"
import { PublicationRow } from "./PublicationRow"

interface Properties {
  data: GeneQuery
}

const ReferencesDataTable = ({ data }: Properties) => {
  const classes = useStyles()

  if (!data.allPublications?.publications) return <OtherError />
  const { publications } = data.allPublications

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
          {publications.map((publication, index) => (
            <PublicationRow publication={publication} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { ReferencesDataTable }
