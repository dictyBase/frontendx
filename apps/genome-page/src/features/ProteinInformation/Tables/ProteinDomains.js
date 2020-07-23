import React, { Component } from "react"
import ProtVista from "ProtVista"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
// styling for ProtVista module
import "ProtVista/style/main.css"

const styles = (theme) => ({
  root: {
    width: "100%",
    overflowX: "scroll",
  },
  table: {
    minWidth: 700,
  },
  tableHeader: {
    backgroundColor: "#4C5E81",
    color: "#fff",
    fontSize: "1.2em",
  },
  tableLeftData: {
    backgroundColor: "#DFE8F6",
    minWidth: 150,
  },
  tableRightData: {
    width: "80%",
    paddingTop: "20px",
    paddingBottom: "10px",
  },
})

class ProteinDomains extends Component {
  constructor(props) {
    super(props)
    this.protRef = React.createRef()
  }
  componentDidMount() {
    new ProtVista({
      el: this.protRef.current,
      uniprotacc: "P05067",

      exclusions: [
        "SEQUENCE_INFORMATION",
        "STRUCTURAL",
        "TOPOLOGY",
        "MUTAGENESIS",
        "MOLECULE_PROCESSING",
        "PROTEOMICS",
        "VARIATION",
        "ANTIGEN",
      ],
    })
  }
  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>
                Protein Domains
              </TableCell>
              <TableCell className={classes.tableHeader} />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.tableLeftData}>
                Protein Domains
              </TableCell>
              <TableCell className={classes.tableRightData}>
                <div ref={this.protRef} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(ProteinDomains)
