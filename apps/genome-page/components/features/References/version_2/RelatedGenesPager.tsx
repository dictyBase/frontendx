import { ChangeEvent, useState } from "react"
import { pipe } from "fp-ts/function"
import { chunksOf as AchunksOf } from "fp-ts/Array"
import { Grid } from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import { Gene } from "dicty-graphql-schema"
import { RelatedGenesDisplay } from "./RelatedGenesDisplay"
import { RelatedGenesControls } from "./RelatedGenesControls"

const GENES_PER_PAGE = 16

type Properties = { genes: Array<Gene> }
/**
 * The RelatedGenesPager component is responsible for handling the logic of paginating through the list of related_genes
 * and choosing which slice to show at a given time.
 */
const RelatedGenesPager = ({ genes }: Properties) => {
  const [page, setPage] = useState(1)
  const handleChange = (_: ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
  }
  const geneChunks = pipe(genes, AchunksOf(GENES_PER_PAGE))
  const pageCount = geneChunks.length
  const currentChunk = geneChunks[page - 1]

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <RelatedGenesControls />
      </Grid>
      <Grid item>
        <RelatedGenesDisplay genes={currentChunk} />
      </Grid>
      <Grid item>
        <Pagination count={pageCount} page={page} onChange={handleChange} />
      </Grid>
    </Grid>
  )
}

export { RelatedGenesPager }
