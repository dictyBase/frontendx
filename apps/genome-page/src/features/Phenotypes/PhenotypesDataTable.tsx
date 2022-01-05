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
import { GeneQuery, Phenotype, Strain } from "dicty-graphql-schema"
import PhenotypeRow from "./PhenotypeRow"
import OtherError from "components/errors/OtherError"
import useStyles from "../../common/styles/dataTableStyles"

interface PhenotypesDataTableProps {
  data: GeneQuery
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
            key={index}
          />
        ) : (
          <PhenotypeRow id={strain.id} phenotype={phenotype} key={index} />
        ),
      )}
    </>
  )
}

const PhenotypesDataTable = ({ data }: PhenotypesDataTableProps) => {
  const classes = useStyles()
  const allStrains = data.allStrains
  if (!allStrains || !allStrains.strains) return <OtherError />

  const strains = allStrains.strains as Strain[]

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
          {strains.map((strain, i) => (
            <StrainRow strain={strain} key={`strain#${i}`} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PhenotypesDataTable
