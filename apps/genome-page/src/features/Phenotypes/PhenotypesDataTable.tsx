import React from "react"
import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { IMockPhenotypesData } from "mocks/mockPhenotypesData"

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
  data?: IMockPhenotypesData[]
}

/**
 * Checks if the field was repeated, so we can give a "nested" table effect
 */
const isRepeated = (
  data: IMockPhenotypesData[],
  i: number,
  field: "strain" | "characteristics" | "phenotype",
) => {
  if (i === 0) return false

  const cur = data[i]
  const prev = data[i - 1]
  const strainIsRepeated = cur.strain === prev.strain && cur.id === prev.id
  switch (field) {
    case "strain":
      return strainIsRepeated
    case "characteristics":
      return strainIsRepeated && cur.characteristics === prev.characteristics
    case "phenotype":
      return strainIsRepeated && cur.phenotype === prev.phenotype
    default:
      return false
  }
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
          {data?.map((item, i) => (
            <TableRow key={`${item}#${i}`}>
              <TableCell>
                {isRepeated(data, i, "strain") ? (
                  <></>
                ) : (
                  <>
                    <Box>
                      <a href={`/stockcenter/strains/${item.id}`}>
                        {item.strain}
                      </a>
                    </Box>
                    <Box>({item.id})</Box>
                  </>
                )}
              </TableCell>
              <TableCell>
                {isRepeated(data, i, "characteristics")
                  ? ""
                  : item.characteristics}
              </TableCell>
              <TableCell>
                {isRepeated(data, i, "phenotype") ? "" : item.phenotype}
              </TableCell>
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
