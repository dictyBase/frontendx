// @flow
import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import EnhancedTableHead from "./EnhancedTableHead"
import pubLinkGenerator from "../utils/pubLinkGenerator"
import evidenceLinkGenerator from "../utils/evidenceLinkGenerator"
import withLinkGenerator from "../utils/withLinkGenerator"
import sourceLinkGenerator from "../utils/sourceLinkGenerator"
import dateConverter from "../utils/dateConverter"

const styles = (theme: Object) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  row: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
  },
  link: {
    textDecoration: "none",
    "&:visited": {
      color: "#0000CE",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
})

// helper function for table sorting
const getSorting = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
}

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** GOA data fetched from QuickGO API */
  goaData: Array<Object>,
}

/**
 * The display table used inside each panel in the GO tabs.
 */

class DisplayTable extends Component<Props> {
  state = {
    order: "asc",
    orderBy: "evidence_code",
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = "desc"

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc"
    }

    this.setState({ order, orderBy })
  }

  render() {
    const { order, orderBy } = this.state
    const { classes, goaData } = this.props

    // get array for item.attributes, easier for sorting table
    const goaDataAttributes = goaData.map((item: Object) => {
      return item.attributes
    })

    return (
      <Paper className={classes.root}>
        <Table>
          <colgroup>
            <col style={{ width: "25%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {goaDataAttributes
              .sort(getSorting(order, orderBy))
              .map((item: Object, index: number) => {
                return (
                  <TableRow className={classes.row} key={index}>
                    <TableCell component="th" scope="row">
                      {item.goterm}
                    </TableCell>
                    <TableCell>
                      <a
                        className={classes.link}
                        href={evidenceLinkGenerator(item.evidence_code)}
                        target="_blank">
                        {item.evidence_code}
                      </a>
                    </TableCell>
                    <TableCell>
                      {item.with !== null &&
                        item.with.map((item: Object) => {
                          return item.connectedXrefs.map(
                            (xref: Object, i: string) => {
                              if (item.connectedXrefs.length === i + 1) {
                                return (
                                  <a
                                    key={i}
                                    className={classes.link}
                                    href={withLinkGenerator(xref.id)}
                                    target="_blank">
                                    {xref.db}:{xref.id}
                                  </a>
                                )
                              }
                              return (
                                <a
                                  key={i}
                                  className={classes.link}
                                  href={withLinkGenerator(xref.id)}
                                  target="_blank">
                                  {xref.db}:{xref.id}, &nbsp;
                                </a>
                              )
                            },
                          )
                        })}
                    </TableCell>
                    <TableCell>
                      <a
                        className={classes.link}
                        href={pubLinkGenerator(item.publication)}
                        target="_blank">
                        {item.publication}
                      </a>
                    </TableCell>
                    <TableCell>{dateConverter(item.date)}</TableCell>
                    <TableCell>
                      <a
                        className={classes.link}
                        href={sourceLinkGenerator(item.assigned_by)}
                        target="_blank">
                        {item.assigned_by}
                      </a>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(DisplayTable)
