import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { pipe } from "fp-ts/function"
import { startsWith as SstartsWith, includes as Sincludes } from "fp-ts/string"
import { chunksOf as AchunksOf, filter as Afilter } from "fp-ts/Array"
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
  const [filter, setFilter] = useState("")
  const filteredGenes = pipe(genes, Afilter(({ name }) => Sincludes(filter)(name)))
  const geneChunks = pipe(filteredGenes, AchunksOf(GENES_PER_PAGE))
  const pageCount = geneChunks.length
  const currentChunk = geneChunks[page - 1]

  const handlePageChange = (_: ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
  }

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget: { value }}) => {
    setFilter(value)
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <RelatedGenesControls filter={filter} onChange={handleFilterChange}/>
      </Grid>
      <Grid item>
        <RelatedGenesDisplay genes={currentChunk} />
      </Grid>
      <Grid item>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Grid>
    </Grid>
  )
}

export { RelatedGenesPager }
