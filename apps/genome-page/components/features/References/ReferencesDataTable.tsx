import { useState } from "react"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { sort as Asort } from "fp-ts/Array"
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
import {
  ReferencesToolbar,
  orderFunctions,
  OrderFunctionKeys,
} from "./ReferencesToolbar"

interface Properties {
  publications: NonNullable<
    ListPublicationsWithGeneQuery["listPublicationsWithGene"]
  >
}

const ReferencesDataTable = ({ publications }: Properties) => {
  const [order, setOrder] = useState<OrderFunctionKeys>("Newest First")
  const sortedPublications = pipe(publications, Asort(orderFunctions[order]))
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="phenotypes-table">
        <TableHead className={classes.head}>
          <TableRow className={classes.headRow}>
            <TableCell className={classes.referenceColumn}>
              <ReferencesToolbar
                publicationCount={publications.length}
                order={order}
                setOrder={setOrder}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPublications.map((publication) => (
            <PublicationRow publication={publication} key={publication.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { ReferencesDataTable }
