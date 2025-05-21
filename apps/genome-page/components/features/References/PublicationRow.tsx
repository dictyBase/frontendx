import { useRouter } from "next/router"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { map as Amap, takeLeft as AtakeLeft } from "fp-ts/Array"
import { Chip, TableCell, TableRow, makeStyles } from "@material-ui/core"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { parseFormattedStringToDomElements } from "@dictybase/ui-common"
import { commaSeparateWithAnd } from "common/utils/strings"
import { SinglePublication } from "./SinglePublication"
import { SeeAllGenesChip } from "./SeeAllGenesChip"

const useStyles = makeStyles({
  cell: { padding: 0 },
})
interface PublicationRowProperties {
  publication: ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]
}

const GENES_LIMIT = 5

const PublicationRow = ({ publication }: PublicationRowProperties) => {
  const router = useRouter()
  const classes = useStyles()
  return (
    <TableRow>
      <TableCell className={classes.cell}>
        <SinglePublication publication={publication} />
      </TableCell>
      {/*
      <TableCell>
        {pipe(
          publication.related_genes,
          AtakeLeft(GENES_LIMIT),
          Amap((gene) => (
            <Chip
              clickable
              onClick={() => router.push(`/${gene.name}`)}
              key={gene.id}
              label={gene.name}
              size="small"
              style={{ margin: "0px 5px 5px 0px" }}
              variant="outlined"
            />
          )),
        )}
        {pipe(
          publication.related_genes.length > GENES_LIMIT,
          Bmatch(
            () => <></>,
            () => (
              <SeeAllGenesChip
                publicationId={publication.id}
                geneCount={publication.related_genes.length}
              />
            ),
          ),
        )}
      </TableCell>
        */}
    </TableRow>
  )
}

export { PublicationRow }
