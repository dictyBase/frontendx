import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { includes as Sincludes } from "fp-ts/string"
import {
  chunksOf as AchunksOf,
  filter as Afilter,
  lookup as Alookup,
} from "fp-ts/Array"
import { match as Omatch } from "fp-ts/Option"
import { Grid, makeStyles } from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import { Gene } from "dicty-graphql-schema"
import { RelatedGenesDisplay } from "./RelatedGenesDisplay"
import { EmptyGenesDisplay } from "./EmptyGenesDisplay"
import { RelatedGenesControls } from "./RelatedGenesControls"

const GENES_PER_PAGE = 16

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
})

type Properties = { genes: Array<Gene> }
/**
 * The RelatedGenesPager component is responsible for handling the logic of paginating through the list of related_genes
 * and choosing which slice to show at a given time.
 */
const RelatedGenesPager = ({ genes }: Properties) => {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")
  const filteredGenes = pipe(
    genes,
    Afilter(({ id, name }) => Sincludes(filter)(name) || Sincludes(filter)(id)),
  )
  const geneChunks = pipe(filteredGenes, AchunksOf(GENES_PER_PAGE))
  const pageCount = geneChunks.length

  const handlePageChange = (_: ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
  }

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setFilter(value)
    setPage(1)
  }

  const classes = useStyles()
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      className={classes.container}
    >
      <Grid item>
        <RelatedGenesControls filter={filter} onChange={handleFilterChange} />
      </Grid>
      <Grid item>
        {pipe(
          geneChunks,
          Alookup(page - 1),
          Omatch(
            () => <EmptyGenesDisplay />,
            (genes) => <RelatedGenesDisplay genes={genes} maxCount={GENES_PER_PAGE} />,
          ),
        )}
      </Grid>
      <Grid item>
        {pipe(
          pageCount > 0,
          Bmatch(
            () => <></>,
            () => (
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
              />
            ),
          ),
        )}
      </Grid>
    </Grid>
  )
}

export { RelatedGenesPager }
