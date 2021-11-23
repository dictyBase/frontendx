import React from "react"
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
    borderRadius: 0,
  },
  head: {
    backgroundColor: "#e6f2ff",
  },
})

interface PhenotypesDataTableProps {
  data: any
}

const PhenotypesDataTable = ({ data }: PhenotypesDataTableProps) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="phenotypes-table">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>Strain</TableCell>
            <TableCell>Characteristics</TableCell>
            <TableCell>Phenotype</TableCell>
            <TableCell>Assay &amp; Environment</TableCell>
            <TableCell>Reference(s)</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {data.map((item: any) => (
            <TableRow key={item.name}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.calories}</TableCell>
              <TableCell align="right">{item.fat}</TableCell>
              <TableCell align="right">{item.carbs}</TableCell>
              <TableCell align="right">{item.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  )
}

export default PhenotypesDataTable
