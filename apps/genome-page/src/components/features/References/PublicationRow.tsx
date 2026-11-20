import { TableCell, TableRow } from "@mui/material"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { SinglePublication } from "./SinglePublication"

interface PublicationRowProperties {
  publication: ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]
}

const PublicationRow = ({ publication }: PublicationRowProperties) => (
  <TableRow>
    <TableCell sx={{ padding: 0 }}>
      <SinglePublication publication={publication} />
    </TableCell>
  </TableRow>
)

export { PublicationRow }
