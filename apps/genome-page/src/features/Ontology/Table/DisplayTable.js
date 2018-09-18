// @flow
import React, { Component, Fragment } from "react"
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
import removeUnderscores from "../utils/removeUnderscores"
import dateConverter from "../utils/dateConverter"
import qualifierFormatter from "../utils/qualifierFormatter"

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
    color: "#4C5E81",
    "&:visited": {
      color: "#4C5E81",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
})

// helper function for table sorting
const getSorting = (order, orderBy) =>
  order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** GOA data fetched from QuickGO API */
  goaData: Array<Object>,
}

type State = {
  /** The order to sort the column */
  order: string,
  /** The item to be ordered by */
  orderBy: string,
}

/**
 * The display table used inside each panel in the GO tabs.
 */

class DisplayTable extends Component<Props, State> {
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

    // get array for item.attributes, helps for sorting table
    const goaDataAttributes = goaData.map((item: Object) => item.attributes)

    return (
      <Paper className={classes.root}>
        <Table>
          <colgroup>
            <col style={{ width: "25%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {goaDataAttributes
              .sort(getSorting(order, orderBy))
              .map((item: Object, index: number) => (
                <TableRow className={classes.row} key={index}>
                  <TableCell component="th" scope="row">
                    {qualifierFormatter(item.qualifier)} {item.goterm}
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
                      item.with.map((item: Object) =>
                        item.connectedXrefs.map((xref: Object, i: string) => (
                          <Fragment key={i}>
                            <span>
                              <a
                                className={classes.link}
                                href={withLinkGenerator(xref.id)}
                                target="_blank">
                                {xref.db}:{xref.id}
                              </a>
                            </span>
                            <br />
                          </Fragment>
                        )),
                      )}
                  </TableCell>
                  <TableCell>
                    {item.extensions !== null &&
                      item.extensions.map((item: Object) =>
                        item.connectedXrefs.map((xref: Object, i: string) => (
                          <Fragment key={i}>
                            <span>
                              {" "}
                              <em>{removeUnderscores(xref.relation)}</em>{" "}
                              <a
                                className={classes.link}
                                href={withLinkGenerator(xref.id)}
                                target="_blank">
                                ({xref.db}:{xref.id})
                              </a>
                            </span>
                            <br />
                          </Fragment>
                        )),
                      )}
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(DisplayTable)
