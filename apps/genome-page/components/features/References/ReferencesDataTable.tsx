import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import {
  Grid,
  Paper,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { SinglePublication } from "./SinglePublication"

interface Properties {
  publications: NonNullable<
    ListPublicationsWithGeneQuery["listPublicationsWithGene"]
  >
}

const ReferencesDataTable = ({ publications }: Properties) => (
  <Grid container direction="column">
    {publications.map((publication) => (
      <Grid item key={publication.id}>
        <SinglePublication publication={publication} />
      </Grid>
    ))}
  </Grid>
)

export { ReferencesDataTable }
