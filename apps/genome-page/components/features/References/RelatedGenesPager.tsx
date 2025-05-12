import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { pipe } from "fp-ts/function"
import { MonoidAny as BMonoidAny } from "fp-ts/boolean"
import { includes as Sincludes, Ord as SOrd, toLowerCase } from "fp-ts/string"
import { Ord, contramap } from "fp-ts/Ord"
import {
  chunksOf as AchunksOf,
  filter as Afilter,
  lookup as Alookup,
  sort as Asort,
} from "fp-ts/Array"
import { match as Omatch } from "fp-ts/Option"
import { Grid, makeStyles } from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"
import { Gene } from "dicty-graphql-schema"
import { RelatedGenesDisplay } from "./RelatedGenesDisplay"
import { EmptyGenesDisplay } from "./EmptyGenesDisplay"
import { RelatedGenesControls } from "./RelatedGenesControls"
import { GeneGroups } from "./GeneGroupSelect"

const ordByGeneName: Ord<Gene> = pipe(
  SOrd,
  contramap(({ name }) => name),
)

const GENES_PER_PAGE = 16

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  displayGrid: {
    paddingLeft: "0 !important",
    paddingRight: "0 !important",
  },
  pager: {
    alignSelf: "center",
  },
})

const groupPredicates = {
  [GeneGroups.ALL]: () => true,
  [GeneGroups.NAMED]: ({ name }: Gene) => !Sincludes("DDB_")(name),
  [GeneGroups.UNNAMED]: ({ name }: Gene) => Sincludes("DDB_")(name),
}

const caseInsensitiveIncludes = (filter: string) => (term: string) =>
  pipe(term, toLowerCase, Sincludes(toLowerCase(filter)))

type Properties = { genes: Array<Gene> }
/**
 * The RelatedGenesPager component is responsible for handling the logic of paginating through the list of related_genes
 * and choosing which slice to show at a given time.
 */
const RelatedGenesPager = ({ genes }: Properties) => {
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")
  const [group, setGroup] = useState(GeneGroups.ALL)

  const filteredGenes = pipe(
    genes,
    Afilter(groupPredicates[group]),
    Afilter(({ id, name }) =>
      BMonoidAny.concat(
        pipe(name, caseInsensitiveIncludes(filter)),
        pipe(id, caseInsensitiveIncludes(filter)),
      ),
    ),
  )
  const geneChunks = pipe(
    filteredGenes,
    Asort(ordByGeneName),
    AchunksOf(GENES_PER_PAGE),
  )
  const pageCount = geneChunks.length

  const handlePageChange = (_: ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
  }

  const handleGroupChange: ChangeEventHandler<{ value: unknown }> = ({
    target: { value },
  }) => {
    setGroup(value as GeneGroups)
    setPage(1)
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
      className={classes.container}>
      <Grid item>
        <RelatedGenesControls
          filteredGeneCount={filteredGenes.length}
          totalGeneCount={genes.length}
          filter={filter}
          onFilterChange={handleFilterChange}
          group={group}
          onGroupChange={handleGroupChange}
        />
      </Grid>
      <Grid item className={classes.displayGrid}>
        {pipe(
          geneChunks,
          Alookup(page - 1),
          Omatch(
            () => <EmptyGenesDisplay maxCount={GENES_PER_PAGE} />,
            (chunk) => (
              <RelatedGenesDisplay genes={chunk} maxCount={GENES_PER_PAGE} />
            ),
          ),
        )}
      </Grid>
      <Grid item className={classes.pager}>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Grid>
    </Grid>
  )
}

export { RelatedGenesPager }
