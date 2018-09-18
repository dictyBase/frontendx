// @flow
import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
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
import getSorting from "./utils/getSorting"
import { changeTableOrder, sortTableBy } from "../goaActions"

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

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** GOA data fetched from QuickGO API */
  goaData: Array<Object>,
  /** The goa slice of state */
  goa: Object,
  /** Action to change the table order (asc or desc) */
  changeTableOrder: Function,
  /** Action to sort the table by column ID */
  sortTableBy: Function,
}

/**
 * The display table used inside each panel in the GO tabs.
 */

class DisplayTable extends Component<Props> {
  handleRequestSort = (event, property) => {
    const { goa, changeTableOrder, sortTableBy } = this.props
    const orderBy = property
    let order = "desc"

    if (goa.tableSortBy === property && goa.tableOrder === "desc") {
      order = "asc"
    }

    changeTableOrder(order)
    sortTableBy(orderBy)
  }

  render() {
    const { classes, goaData, goa } = this.props

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
            order={goa.tableOrder}
            orderBy={goa.tableSortBy}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {goaDataAttributes
              .sort(getSorting(goa.tableOrder, goa.tableSortBy))
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

const mapStateToProps = ({ goa }) => ({ goa })

export default connect(
  mapStateToProps,
  { changeTableOrder, sortTableBy },
)(withStyles(styles)(DisplayTable))
