import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import ShoppingCart from "@mui/icons-material/ShoppingCart"
import { ListStrainsWithGeneQuery } from "dicty-graphql-schema"
import { RenderPhenotypes } from "./RenderPhenotypes"

interface PhenotypesDataTableProperties {
  strains: NonNullable<ListStrainsWithGeneQuery["listStrainsWithGene"]>
}

const PhenotypesDataTable = ({ strains }: PhenotypesDataTableProperties) => (
  <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
    <Table aria-label="phenotypes-table">
      <TableHead sx={{ backgroundColor: "#e6f2ff" }}>
        <TableRow sx={{ "& > th": { fontWeight: "bold" } }}>
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

export { PhenotypesDataTable }
