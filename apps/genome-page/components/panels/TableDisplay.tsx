import React from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from "@mui/material/Paper";
import { GenomicCoordinates } from 'dicty-graphql-schema';
import { makeStyles } from "@material-ui/core/styles"

type TableDisplayProps = {
    /** Array of GO annotations for a particular gene */
    data: GenomicCoordinates[]
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    marginTop: 30,
    overflowX: 'hidden',
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5
  }
})


/**
 * Table Display component that display product info data
 */
const TableDisplay = ({ data }: TableDisplayProps) => {
  const classes = useStyles()


  return (
    <TableContainer component={Paper} className={classes.root}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className={classes.table}>
        <TableHead>
            <TableRow>
            <TableCell className={classes.tableCell} align="right">Exon</TableCell>
            <TableCell className={classes.tableCell} align="right">Local Coords.</TableCell>
            <TableCell className={classes.tableCell} align="right">Chrom. Coords.</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {data.map((item) => (
            <TableRow key={item.exon}>
                <TableCell className={classes.tableCell} align="right">{item.exon}</TableCell>
                <TableCell className={classes.tableCell} align="right">{item.local_coords}</TableCell>
                <TableCell className={classes.tableCell} align="right">{item.chrom_coords}</TableCell>
            </TableRow>
        ))}
        </TableBody>
        </Table>
    </TableContainer>
  )
}

export default TableDisplay
