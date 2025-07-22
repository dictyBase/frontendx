import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import ShoppingCart from "@material-ui/icons/ShoppingCart"
import { ListStrainsWithGeneQuery } from "dicty-graphql-schema"
import { useStyles } from "../../../styles/dataTableStyles"
import { RenderPhenotypes } from "./RenderPhenotypes"

interface PhenotypesDataTableProperties {
  strains: NonNullable<ListStrainsWithGeneQuery["listStrainsWithGene"]>
}

const PhenotypesDataTable = ({ strains }: PhenotypesDataTableProperties) => {
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
          {strains.map((strain) => (
            <RenderPhenotypes strain={strain} key={strain.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { PhenotypesDataTable }
