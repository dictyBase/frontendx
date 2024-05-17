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
import { Strain } from "dicty-graphql-schema"
import { OtherError } from "components/errors/OtherError"
import { useStyles } from "../../../styles/dataTableStyles"
import { RenderPhenotypes } from "./RenderPhenotypes"

interface PhenotypesDataTableProperties {
  strains: Array<Strain>
}

const PhenotypesDataTable = ({ strains }: PhenotypesDataTableProperties) => {
  const classes = useStyles()

  if (!strains) return <OtherError />

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
