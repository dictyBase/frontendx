import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { includes as Sincludes, isString, toLowerCase } from "fp-ts/string"
import { filter as Afilter, exists as Aexists } from "fp-ts/Array"
import { some, none, match as Omatch } from "fp-ts/Option"
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

const pass = (publications: Publications) => publications

const filterPublications = (
  publications: Publications,
  searchParameters: Record<string, NonNullable<string | string[] | undefined>>,
) => {
  const titleParameter = pipe(
    searchParameters.title,
    isString,
    Bmatch(
      () => none,
      () => some(searchParameters.title as string),
    ),
  )
  const authorParameter = pipe(
    searchParameters.author,
    isString,
    Bmatch(
      () => none,
      () => some(searchParameters.author as string),
    ),
  )
  const geneParameter = pipe(
    searchParameters.gene,
    isString,
    Bmatch(
      () => none,
      () => some(searchParameters.gene as string),
    ),
  )

  return pipe(
    publications,
    pipe(
      titleParameter,
      Omatch(
        () => pass,
        (t) => filterByTitle(t),
      ),
    ),
    pipe(
      authorParameter,
      Omatch(
        () => pass,
        (a) => filterByAuthor(a),
      ),
    ),
    pipe(
      geneParameter,
      Omatch(
        () => pass,
        (g) => filterByGene(g),
      ),
    ),
  )
}

export { filterPublications }
