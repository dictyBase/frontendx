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
import dateConverter from "../utils/dateConverter"
import qualifierFormatter from "../utils/qualifierFormatter"
import sourceLinkGenerator from "../utils/sourceLinkGenerator"
import getSorting from "./utils/getSorting"
import { changeTableOrder, sortTableBy } from "../goaActions"
import styles from "./DisplayTableStyles"

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

export class DisplayTable extends Component<Props> {
  handleRequestSort = (event: SyntheticEvent<*>, property: string) => {
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
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
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
                    {item.extensions !== null &&
                      item.extensions.map((item: Object, i: string) => (
                        <Fragment key={i}>
                          <span>
                            {" "}
                            <em>{item.relation}</em>{" "}
                            {!item.name && (
                              <a
                                className={classes.link}
                                href={withLinkGenerator(item.id, item.db)}
                                target="_blank">
                                ({item.db}:{item.id})
                              </a>
                            )}
                            {item.name && (
                              <a
                                className={classes.link}
                                href={withLinkGenerator(
                                  item.id,
                                  item.db,
                                  item.name,
                                )}
                                target="_blank">
                                ({item.name})
                              </a>
                            )}
                          </span>
                          <br />
                        </Fragment>
                      ))}
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
                      item.with.map((item: Object, i: string) => (
                        <Fragment key={i}>
                          <span>
                            {!item.name && (
                              <a
                                className={classes.link}
                                href={withLinkGenerator(item.id, item.db)}
                                target="_blank">
                                {item.db}:{item.id}
                              </a>
                            )}
                            {item.name && (
                              <a
                                className={classes.link}
                                href={withLinkGenerator(
                                  item.id,
                                  item.db,
                                  item.name,
                                )}
                                target="_blank">
                                {item.name}
                              </a>
                            )}
                          </span>
                          <br />
                        </Fragment>
                      ))}
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
