import { Dispatch, SetStateAction } from "react"
import { Toolbar, Typography, Select, MenuItem } from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { Ord as SOrd } from "fp-ts/string"
import { Ord as DOrd } from "fp-ts/Date"
import { map as Amap } from "fp-ts/Array"
import { keys as Rkeys } from "fp-ts/Record"
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
  contramap((publicationItem) => publicationItem.title),
)
const ordByTitleReverse: Ord<PublicationWithGene> = pipe(ordByTitle, ORDreverse)

const orderFunctions = {
  "Newest First": ordByNewest,
  "Oldest First": ordByOldest,
  "Title (A - Z)": ordByTitle,
  "Title (Z - A)": ordByTitleReverse,
}

type ReferencesToolbarProperties = {
  publicationCount: number
  sorting: string
  setSorting: Dispatch<SetStateAction<keyof typeof orderFunctions>>
}

const ReferencesToolbar = ({
  publicationCount,
  sorting,
  setSorting,
}: ReferencesToolbarProperties) => (
  <Toolbar variant="dense">
    <Typography>
      {publicationCount}{" "}
      {pipe(
        publicationCount > 1,
        Bmatch(
          () => "Reference",
          () => "References",
        ),
      )}
    </Typography>
    <Select
      labelId="reference-sort-select"
      id="reference-sort-select"
      variant="outlined"
      value={sorting}
      onChange={({ target: { value } }) => {
        setSorting(value as keyof typeof orderFunctions)
      }}>
      {pipe(
        orderFunctions,
        Rkeys,
        Amap((label) => <MenuItem value={label}>{label}</MenuItem>),
      )}
    </Select>
  </Toolbar>
)

export { ReferencesToolbar, orderFunctions }
