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
import ShoppingCart from "@material-ui/icons/ShoppingCart"
import { Phenotype, Strain } from "dicty-graphql-schema"
import PhenotypeRow from "./PhenotypeRow"

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
  data: Strain[]
}

const StrainRow = ({ strain }: { strain: Strain }) => {
  const phenotypes = strain.phenotypes as Phenotype[]
  const characteristics = strain.characteristics as string[] | undefined
  return (
    <>
      {phenotypes.map((phenotype, index) =>
        index === 0 ? (
          <PhenotypeRow
            id={strain.id}
            strain={strain.label}
            characteristics={characteristics}
            phenotype={phenotype}
            in_stock={strain.in_stock}
          />
        ) : (
          <PhenotypeRow id={strain.id} phenotype={phenotype} />
        ),
      )}
    </>
  )
}

const PhenotypesDataTable = ({ data }: PhenotypesDataTableProps) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="phenotypes-table">
        <TableHead className={classes.head}>
          <TableRow className={classes.headRow}>
            <TableCell>
              <ShoppingCart />
            </TableCell>
            <TableCell>Strain</TableCell>
            <TableCell>Characteristics</TableCell>
            <TableCell>Phenotype</TableCell>
            <TableCell>Reference(s)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((strain) => (
            <StrainRow strain={strain} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PhenotypesDataTable
