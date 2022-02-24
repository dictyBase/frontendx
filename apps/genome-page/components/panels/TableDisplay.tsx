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
import OtherError from "components/errors/OtherError";

type TableDisplayProps = {
    /** Array of Genomic Coordinates for a particular gene */
    data: GenomicCoordinates[] | null | undefined
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
  if(!data) return <OtherError />


  return (
    <TableContainer component={Paper} className={classes.root}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table" className={classes.table}>
        <TableHead>
            <TableRow>
            <TableCell className={classes.tableCell} align="left">Exon</TableCell>
            <TableCell className={classes.tableCell} align="left">Local Coords.</TableCell>
            <TableCell className={classes.tableCell} align="left">Chrom. Coords.</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {data.map((item) => (
            <TableRow key={item.exon}>
                <TableCell className={classes.tableCell} align="left">{item.exon}</TableCell>
                <TableCell className={classes.tableCell} align="left">{item.local_coords}</TableCell>
                <TableCell className={classes.tableCell} align="left">{item.chrom_coords}</TableCell>
            </TableRow>
        ))}
        </TableBody>
        </Table>
    </TableContainer>
  )
}

export default TableDisplay
