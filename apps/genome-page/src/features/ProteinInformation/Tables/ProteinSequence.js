import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { styles } from "./TableStyles"

const ProteinSequence = props => {
  const { classes } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>
              Protein Sequence
            </TableCell>
            <TableCell className={classes.tableHeader} />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell
              component="th"
              scope="row"
              className={classes.tableLeftData}>
              Protein Sequence
            </TableCell>
            <TableCell className={classes.tableRightData}>
              >DDB0238349|DDB_G0272004 |Protein|gene: p2xA on chromosome: 2
              position 1165671 to 1167128<br />
              MGFSFDWDDIFQYSTVKIVRIRDRRLGILHLSFLVGIVAYIVVYSAIIKKGYLFTEVPIG<br />
              SVRTSLKGPNTFASNLTYCSNQQHNGSTYPFTPLECNYWDEQLALFPVGQDSTFTCTTRV<br />
              RLSKQEANCNFTDPTCKFVDEPGSAKNIYIADIESFTILIDHTMYASSSGSQFNAVDLHG<br />
              YILNQDGDEVQIDANGTSIGVSGKPDIMTIGQLLSFGGVSLDQASPVDSNVSIRYDGVVL<br />
              FVFITYSNTYTYSTSDFKYVYSVQQIANTIYDVPETIILESIHSRLLYKRHGIRVIFIQT<br />
              GTIGSFHFQTLLLTLVSGLGLLAVATTVVDQLAIRLLPQRKSYSSLKFQVTESMSNPMKK<br />
              RITTDEGEDVLYTRIEGL*
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(ProteinSequence)
