import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { includes as Sincludes, isString, toLowerCase } from "fp-ts/string"
import { filter as Afilter, exists as Aexists } from "fp-ts/Array"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"

type Publications = NonNullable<
  ListPublicationsWithGeneQuery["listPublicationsWithGene"]
>

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

export { filterPublications }
