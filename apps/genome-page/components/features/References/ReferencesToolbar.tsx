import { Dispatch, SetStateAction } from "react"
import { Grid, Toolbar, Typography, Select, MenuItem } from "@material-ui/core"
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
  contramap(({ title }) => title),
)
const ordByTitleReverse: Ord<PublicationWithGene> = pipe(ordByTitle, ORDreverse)

const orderFunctions = {
  "Newest First": ordByNewest,
  "Oldest First": ordByOldest,
  "Title (A - Z)": ordByTitle,
  "Title (Z - A)": ordByTitleReverse,
}

type OrderFunctionKeys = keyof typeof orderFunctions

type ReferencesToolbarProperties = {
  publicationCount: number
  order: string
  setOrder: Dispatch<SetStateAction<OrderFunctionKeys>>
}

const ReferencesToolbar = ({
  publicationCount,
  order,
  setOrder,
}: ReferencesToolbarProperties) => (
  <Toolbar variant="dense">
    <Grid container>
      <Grid item>
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
      </Grid>
      <Grid item>
        <Select
          labelId="reference-sort-select"
          id="reference-sort-select"
          variant="outlined"
          value={order}
          onChange={({ target: { value } }) => {
            setOrder(value as OrderFunctionKeys)
          }}>
          {pipe(
            orderFunctions,
            Rkeys,
            Amap((label) => <MenuItem value={label}>{label}</MenuItem>),
          )}
        </Select>
      </Grid>
    </Grid>
  </Toolbar>
)

export { ReferencesToolbar, orderFunctions, type OrderFunctionKeys }
