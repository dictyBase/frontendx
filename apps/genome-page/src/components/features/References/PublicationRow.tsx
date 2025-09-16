import { TableCell, TableRow, makeStyles } from "@material-ui/core"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { SinglePublication } from "./SinglePublication"

const useStyles = makeStyles({
  cell: { padding: 0 },
})
interface PublicationRowProperties {
  publication: ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]
}

const PublicationRow = ({ publication }: PublicationRowProperties) => {
  const classes = useStyles()
  return (
    <TableRow>
      <TableCell className={classes.cell}>
        <SinglePublication publication={publication} />
      </TableCell>
    </TableRow>
  )
}

export { PublicationRow }
