import { useRouter } from "next/router"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { map as Amap, takeLeft as AtakeLeft } from "fp-ts/Array"
import { Chip, TableCell, TableRow } from "@material-ui/core"
import { commaSeparateWithAnd } from "common/utils/strings"
import { SeeAllGenesChip } from "./SeeAllGenesChip"

interface PublicationRowProperties {
  publication: {
    __typename?: "PublicationWithGene"
    id: string
    doi?: string | null
    title: string
    journal: string
    pub_date?: any | null
    volume?: string | null
    pages?: string | null
    pub_type: string
    source: string
    issue?: string | null
    related_genes: Array<{ __typename?: "Gene"; id: string; name: string }>
    authors: Array<{
      __typename?: "Author"
      last_name: string
      rank?: string | null
    }>
  }
}

const GENES_LIMIT = 5

const PublicationRow = ({ publication }: PublicationRowProperties) => {
  const router = useRouter()
  return (
    <TableRow>
      <TableCell>
        <b>
          {commaSeparateWithAnd(publication.authors.map((a) => a.last_name))}
        </b>
        &nbsp; &apos;{publication.title}&apos; &nbsp;
        <i>{publication.journal}</i>
        ,&nbsp;{publication.pages}
      </TableCell>
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
    </TableRow>
  )
}

export { PublicationRow }
