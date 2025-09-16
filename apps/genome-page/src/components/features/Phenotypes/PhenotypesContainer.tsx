import Typography from "@material-ui/core/Typography"
import { ListStrainsWithGeneQuery } from "dicty-graphql-schema"
import { PhenotypesDataTable } from "./PhenotypesDataTable"

interface PhenotypesContainerProperties {
  strains: NonNullable<ListStrainsWithGeneQuery["listStrainsWithGene"]>
}
const PhenotypesContainer = ({ strains }: PhenotypesContainerProperties) => (
  <Typography component="div">
    <PhenotypesDataTable strains={strains} />
  </Typography>
)

export { PhenotypesContainer }
