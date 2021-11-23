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
import { IMockGeneData } from "common/mocks/mockPhenotypesData"

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
    borderRadius: 0,
  },
  head: {
    backgroundColor: "#e6f2ff",
  },
  headRow: {
    "& > th": {
      fontWeight: "bold",
    },
  },
})

interface PhenotypesDataTableProps {
  data: IMockGeneData[]
}

const PhenotypesDataTable = ({ data }: PhenotypesDataTableProps) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="phenotypes-table">
        <TableHead className={classes.head}>
          <TableRow className={classes.headRow}>
            <TableCell>Strain</TableCell>
            <TableCell>Characteristics</TableCell>
            <TableCell>Phenotype</TableCell>
            <TableCell>Assay &amp; Environment</TableCell>
            <TableCell>Reference(s)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, i) => (
            <TableRow key={`${item}#${i}`}>
              <TableCell component="th" scope="row">
                {`${item.strain}\n (${item.id})`}
              </TableCell>
              <TableCell>{item.characteristics}</TableCell>
              <TableCell>{item.phenotype}</TableCell>
              <TableCell>
                <i>To be implemented</i>
              </TableCell>
              <TableCell>
                <b>{item.reference.author}</b>
                &nbsp; '{item.reference.title}' &nbsp;
                <i>{item.reference.name}</i>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PhenotypesDataTable
