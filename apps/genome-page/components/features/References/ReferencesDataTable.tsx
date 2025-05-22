import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { useStyles } from "styles/dataTableStyles"
import { PublicationRow } from "./PublicationRow"

interface Properties {
  publications: NonNullable<
    ListPublicationsWithGeneQuery["listPublicationsWithGene"]
  >
}

const ReferencesDataTable = ({ publications }: Properties) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="phenotypes-table">
        <TableHead className={classes.head}>
          <TableRow className={classes.headRow}>
            <TableCell className={classes.referenceColumn}>
              {publications.length}{" "}
              {pipe(
                publications.length > 1,
                Bmatch(
                  () => "Reference",
                  () => "References",
                ),
              )}
            </TableCell>
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
