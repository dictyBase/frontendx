import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
// import EnhancedTableHead from "./EnhancedTableHead"
import ExtensionsDisplay from "./ExtensionsDisplay"
import WithDisplay from "./WithDisplay"
import pubLinkGenerator from "../utils/pubLinkGenerator"
import evidenceLinkGenerator from "../utils/evidenceLinkGenerator"
import dateConverter from "../utils/dateConverter"
import qualifierFormatter from "../utils/qualifierFormatter"
import sourceLinkGenerator from "../utils/sourceLinkGenerator"
// import getSorting from "./utils/getSorting"
import { GeneGOA } from "common/@types/gene-data"

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  row: {
    "&:nth-of-type(even)": {
      // backgroundColor: theme.palette.background.default,
    },
  },
  link: {
    textDecoration: "none",
    color: "#4C5E81",
    "&:visited": {
      color: "#4C5E81",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
  head: {
    backgroundColor: "#e6f2ff",
  },
  headerCell: {
    color: "#333",
    fontWeight: 600,
  },
})

type Props = {
  /** GO Annotations */
  data: Array<GeneGOA>
}

/**
 * The display table used inside each panel in the GO tabs.
 */

const DisplayTable = ({ data }: Props) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Table>
        <colgroup>
          <col style={{ width: "25%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        {/* <EnhancedTableHead
            order={goa.tableOrder}
            orderBy={goa.tableSortBy}
            onRequestSort={this.handleRequestSort}
          /> */}
        <TableBody>
          {data
            // .sort(getSorting(goa.tableOrder, goa.tableSortBy))
            .map((item: GeneGOA, index: number) => (
              <TableRow className={classes.row} key={index}>
                <TableCell component="th" scope="row">
                  {qualifierFormatter(item.qualifier)} {item.go_term}
                </TableCell>

                <TableCell>
                  <ExtensionsDisplay extensions={item.extensions} />
                </TableCell>

                <TableCell>
                  <a
                    className={classes.link}
                    href={evidenceLinkGenerator(item.evidence_code)}
                    target="_blank"
                    rel="noopener noreferrer">
                    {item.evidence_code}
                  </a>
                </TableCell>

                <TableCell>
                  <WithDisplay withData={item.with} />
                </TableCell>

                <TableCell>
                  <a
                    className={classes.link}
                    href={pubLinkGenerator(item.publication)}
                    target="_blank"
                    rel="noopener noreferrer">
                    {item.publication}
                  </a>
                </TableCell>

                <TableCell>{dateConverter(item.date)}</TableCell>

                <TableCell>
                  <a
                    className={classes.link}
                    href={sourceLinkGenerator(item.assigned_by)}
                    target="_blank"
                    rel="noopener noreferrer">
                    {item.assigned_by}
                  </a>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default DisplayTable
