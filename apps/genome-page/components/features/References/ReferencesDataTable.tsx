import { useState } from "react"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { includes as Sincludes, isString, toLowerCase } from "fp-ts/string"
import {
  sort as Asort,
  filter as Afilter,
  findFirst as AfindFirst,
  exists as Aexists,
} from "fp-ts/Array"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { useStyles } from "styles/dataTableStyles"
import { PublicationRow } from "./PublicationRow"
import { ReferencesToolbar } from "./ReferencesToolbar"
import { useSearchParameters } from "./useSearchWithRouter"
import { orderFunctions, type OrderFunctionKeys } from "./referenceOrderHelpers"

type Publications = NonNullable<
  ListPublicationsWithGeneQuery["listPublicationsWithGene"]
>

interface Properties {
  publications: Publications
}

const SEARCH_FIELDS = ["title", "author", "gene"]

const filterByTitle = (searchTerm: string) => (publications: Publications) =>
  pipe(
    publications,
    Afilter(({ title }) =>
      pipe(title, toLowerCase, Sincludes(toLowerCase(searchTerm))),
    ),
  )

const filterByAuthor = (searchTerm: string) => (publications: Publications) =>
  pipe(
    publications,
    Afilter(({ authors }) =>
      pipe(
        authors,
        Aexists(({ last_name }) =>
          pipe(last_name, toLowerCase, Sincludes(toLowerCase(searchTerm))),
        ),
      ),
    ),
  )

const filterByGene = (searchTerm: string) => (publications: Publications) =>
  pipe(
    publications,
    Afilter(({ related_genes }) =>
      pipe(
        related_genes,
        Aexists(({ name }) =>
          pipe(name, toLowerCase, Sincludes(toLowerCase(searchTerm))),
        ),
      ),
    ),
  )

const filterPublications = (
  publications: Publications,
  searchParameters: Record<string, NonNullable<string | string[] | undefined>>,
) => {
  const titleParameter = pipe(
    searchParameters.title,
    isString,
    Bmatch(
      () => "",
      () => searchParameters.title as string,
    ),
  )
  const authorParameter = pipe(
    searchParameters.author,
    isString,
    Bmatch(
      () => "",
      () => searchParameters.author as string,
    ),
  )
  const geneParameter = pipe(
    searchParameters.gene,
    isString,
    Bmatch(
      () => "",
      () => searchParameters.gene as string,
    ),
  )

  return pipe(
    publications,
    filterByTitle(titleParameter),
    filterByAuthor(authorParameter),
    filterByGene(geneParameter),
  )
}

const ReferencesDataTable = ({ publications }: Properties) => {
  const [order, setOrder] = useState<OrderFunctionKeys>("Newest First")
  const [searchParameters] = useSearchParameters(SEARCH_FIELDS)
  const filtered = filterPublications(publications, searchParameters)
  const sortedPublications = pipe(filtered, Asort(orderFunctions[order]))
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="phenotypes-table">
        <TableHead className={classes.head}>
          <TableRow className={classes.headRow}>
            <TableCell className={classes.referenceColumn}>
              <ReferencesToolbar
                publicationCount={publications.length}
                searchFields={SEARCH_FIELDS}
                order={order}
                setOrder={setOrder}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPublications.map((publication) => (
            <PublicationRow publication={publication} key={publication.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export { ReferencesDataTable }
