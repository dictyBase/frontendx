import { pipe } from "fp-ts/function"
import { Ord as SOrd } from "fp-ts/string"
import { Ord as DOrd } from "fp-ts/Date"
import { Ord, contramap, reverse as ORDreverse } from "fp-ts/Ord"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { parseISO } from "date-fns/fp"

type PublicationWithGene =
  ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]

const ordByOldest: Ord<PublicationWithGene> = pipe(
  DOrd,
  contramap(({ pub_date }) =>
    pipe(
      pub_date,
      OfromNullable,
      OgetOrElse(() => ""),
      parseISO,
    ),
  ),
)

const ordByNewest: Ord<PublicationWithGene> = pipe(ordByOldest, ORDreverse)

const ordByTitle: Ord<PublicationWithGene> = pipe(
  SOrd,
  contramap(({ title }) => title),
)
const ordByTitleReverse: Ord<PublicationWithGene> = pipe(ordByTitle, ORDreverse)

const orderFunctions = {
  "Newest First": ordByNewest,
  "Oldest First": ordByOldest,
  "Title (A to Z)": ordByTitle,
  "Title (Z to A)": ordByTitleReverse,
}

type OrderFunctionKeys = keyof typeof orderFunctions

export { orderFunctions, ordByOldest, type PublicationWithGene, type OrderFunctionKeys }
