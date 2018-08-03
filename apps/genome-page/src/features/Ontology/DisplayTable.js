// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

import pubLinkGenerator from "./utils/pubLinkGenerator"
import evidenceLinkGenerator from "./utils/evidenceLinkGenerator"
import withLinkGenerator from "./utils/withLinkGenerator"
import sourceLinkGenerator from "./utils/sourceLinkGenerator"
import dateConverter from "./utils/dateConverter"

const styles = (theme: Object) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  head: {
    backgroundColor: "#DFE8F6",
  },
  headerCell: {
    color: "#333",
    fontWeight: "600",
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

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** GOA data fetched from QuickGO API */
  goaData: Array<Object>,
}

/**
 * The display table used inside each panel in the GO tabs.
 */

const DisplayTable = (props: Props) => {
  const { classes, goaData } = props

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
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell className={classes.headerCell}>
              GO Term + Extension
            </TableCell>
            <TableCell className={classes.headerCell}>Evidence</TableCell>
            <TableCell className={classes.headerCell}>With</TableCell>
            <TableCell className={classes.headerCell}>Reference</TableCell>
            <TableCell className={classes.headerCell}>Date</TableCell>
            <TableCell className={classes.headerCell}>Source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goaData.map((item: Object, index: number) => {
            return (
              <TableRow className={classes.row} key={index}>
                <TableCell component="th" scope="row">
                  {item.attributes.goterm}
                </TableCell>
                <TableCell>
                  <a
                    className={classes.link}
                    href={evidenceLinkGenerator(item.attributes.evidence_code)}
                    target="_blank">
                    {item.attributes.evidence_code}
                  </a>
                </TableCell>
                <TableCell>
                  {item.attributes.with !== null &&
                    item.attributes.with.map((item: Object) => {
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
                              {xref.db}:{xref.id},&nbsp;
                            </a>
                          )
                        },
                      )
                    })}
                </TableCell>
                <TableCell>
                  <a
                    className={classes.link}
                    href={pubLinkGenerator(item.attributes.publication)}
                    target="_blank">
                    {item.attributes.publication}
                  </a>
                </TableCell>
                <TableCell>{dateConverter(item.attributes.date)}</TableCell>
                <TableCell>
                  <a
                    className={classes.link}
                    href={sourceLinkGenerator(item.attributes.assigned_by)}
                    target="_blank">
                    {item.attributes.assigned_by}
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

export default withStyles(styles)(DisplayTable)
