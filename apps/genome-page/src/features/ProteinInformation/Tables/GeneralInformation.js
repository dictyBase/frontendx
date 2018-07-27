import React, { Component } from "react"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { fetchData } from "../proteinActions"
import { styles } from "./TableStyles"

class GeneralInformation extends Component {
  componentDidMount() {
    this.props.fetchData("https://api.myjson.com/bins/171k6m")
  }
  render() {
    const { classes } = this.props
    const { data } = this.props.protein

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>
                General Information
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
                Gene Product
              </TableCell>
              <TableCell className={classes.tableRightData}>
                {data.geneProduct}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableLeftData}>
                Alternative Protein Names
              </TableCell>
              <TableCell className={classes.tableRightData}>
                {data.alternativeProteinNames}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableLeftData}>
                dictyBase ID
              </TableCell>
              <TableCell className={classes.tableRightData}>
                {data.dictybaseId}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableLeftData}>
                Description
              </TableCell>
              <TableCell className={classes.tableRightData}>
                {data.description}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableLeftData}>
                Protein Length
              </TableCell>
              <TableCell className={classes.tableRightData}>
                {data.proteinLength}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableLeftData}>
                Molecular Weight
              </TableCell>
              <TableCell className={classes.tableRightData}>
                {data.molecularWeight}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableLeftData}>
                AA Composition
              </TableCell>
              <TableCell className={classes.tableRightData}>
                {data.aaComposition}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableLeftData}>
                Subcellular Location*
              </TableCell>
              <TableCell className={classes.tableRightData}>
                {data.subcellularComposition}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableLeftData}>
                Protein Existence*
              </TableCell>
              <TableCell className={classes.tableRightData}>
                {data.proteinExistence}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                className={classes.tableLeftData}>
                Note
              </TableCell>
              <TableCell className={classes.tableRightData}>
                <strong>{data.note}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

const mapStateToProps = ({ protein }) => ({ protein })

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(fetchData(url)),
  }
}
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GeneralInformation),
)
