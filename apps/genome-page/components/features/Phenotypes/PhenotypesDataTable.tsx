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
import { GeneQuery } from "dicty-graphql-schema"
import { OtherError } from "components/errors/OtherError"
import { useStyles } from "../../../styles/dataTableStyles"
import { RenderPhenotypes } from "./RenderPhenotypes"

interface PhenotypesDataTableProperties {
  data: GeneQuery
}

const PhenotypesDataTable = ({ data }: PhenotypesDataTableProperties) => {
  const classes = useStyles()

  if (!data.allStrains) return <OtherError />
  const { allStrains } = data

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
          {allStrains.strains?.map((strain, index) => (
            <RenderPhenotypes strain={strain} key={`strain#${index}`} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { PhenotypesDataTable }
