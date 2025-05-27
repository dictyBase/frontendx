import { ReactNode, Dispatch, SetStateAction } from "react"
import {
  Toolbar,
  Textfield,
  Typography,
  Select,
  SelectProps,
  MenuItem,
} from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { Ord as NOrd } from "fp-ts/number"
import { Ord as SOrd } from "fp-ts/string"
import { Ord as DOrd } from "fp-ts/Date"
import { map as Amap, sort as Asort } from "fp-ts/Array"
import { fst, snd } from "fp-ts/Tuple"
import { fromEntries as RfromEntries, lookup as Rlookup } from "fp-ts/Record"
import { Ord, contramap, reverse as ORDreverse } from "fp-ts/Ord"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { parse, parseISO, getMilliseconds } from "date-fns/fp"

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

const orderFunctions: Array<[string, Ord<PublicationWithGene>]> = [
  ["Newest First", ordByNewest],
  ["Oldest First", ordByOldest],
  ["Title (A - Z)", ordByTitle],
  ["Title (Z - A)", ordByTitleReverse],
]

type ReferencesToolbarProperties = {
  publicationCount: number
  sorting: [string, Ord<PublicationWithGene>]
  setSorting: Dispatch<SetStateAction<[string, Ord<PublicationWithGene>]>>
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
      value={fst(sorting)}
      onChange={({ target: { value } }) => {
        setSorting(
          pipe(
            orderFunctions,
            RfromEntries,
            Rlookup(value as string),
            OgetOrElse(() => orderFunctions[0][1]),
            (function_) => [value as string, function_],
          ),
        )
      }}>
      {pipe(
        orderFunctions,
        Amap(([label]) => <MenuItem value={label}>{label}</MenuItem>),
      )}
    </Select>
  </Toolbar>
)

export { ReferencesToolbar, orderFunctions }
