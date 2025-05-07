import Typography from "@material-ui/core/Typography"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { ReferencesDataTable } from "./ReferencesDataTable"

interface ReferencesContainerProperties {
  publications: NonNullable<
    ListPublicationsWithGeneQuery["listPublicationsWithGene"]
  >
}

const ReferencesContainer = ({
  publications,
}: ReferencesContainerProperties) => (
  <Typography component="div">
    <ReferencesDataTable publications={publications} />
  </Typography>
)

export { ReferencesContainer }
