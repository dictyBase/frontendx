import { useParams } from "react-router-dom"
import { Box, Grid, Typography } from "@mui/material"
import { grey, blueGrey, pink } from "@mui/material/colors"
import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { isString, empty } from "fp-ts/string"
import { map as Amap, filter as Afilter, match as Amatch } from "fp-ts/Array"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
} from "fp-ts/Option"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { formatTitle } from "@dictybase/ui-common"
import { commaSeparateWithAnd } from "common/utils/strings"
import { formatDate } from "./utils/formatDate"
import { RelatedGenesList } from "./RelatedGenesList"

const GENES_LIMIT = 10

type PublicationItem = {
  publication: ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]
}

const SinglePublication = ({
  publication: { id, title, journal, pages, authors, pub_date, related_genes },
}: PublicationItem) => {
  const { id: geneIdParameter } = useParams<{ id: string }>()
  const geneId = match(geneIdParameter)
    .when(isString, (idParameter) => idParameter)
    .otherwise(() => empty)

  const formattedAuthors = pipe(
    authors,
    Amap(({ last_name }) => last_name),
    commaSeparateWithAnd,
  )
  const formattedTitle = formatTitle(title).full
  const formattedDate = pipe(
    pub_date,
    OfromNullable,
    Omap(formatDate),
    OgetOrElse(() => ""),
  )

  const onClick = () => {
    window.location.assign(`${import.meta.env.VITE_PUBLICATION_URL}/${id}`)
  }

  return (
    <Box
      sx={{
        borderBottom: `1px solid ${blueGrey[50]}`,
        transition: "border-left 0.1s ease-in-out",
        "&:hover": {
          borderLeft: `5px solid ${pink[700]}`,
          cursor: "pointer",
          backgroundColor: grey[50],
        },
      }}
      onClick={onClick}>
      <Box sx={{ padding: "2rem", paddingBottom: "0.5rem" }}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: 600, fontSize: "24px" }}>
          {formattedTitle}
        </Typography>
        <Typography
          sx={{
            color: grey[700],
          }}>{`Published in ${journal}, ${pages}, ${formattedDate}`}</Typography>
      </Box>
      <Grid container sx={{ borderTop: `1px solid ${blueGrey[50]}` }}>
        <Grid
          item
          sx={{
            borderRight: `1px inset ${blueGrey[50]}`,
            flexBasis: "30%",
            padding: "2rem",
          }}>
          <Typography gutterBottom>AUTHORS</Typography>
          <Typography gutterBottom sx={{ fontWeight: 500 }}>
            {formattedAuthors}
          </Typography>
        </Grid>
        {pipe(
          related_genes,
          Afilter(({ name }) => name !== geneId),
          Amatch(
            () => <></>,
            (genes) => (
              <Grid
                item
                sx={{
                  border: `1px solid ${blueGrey[50]}`,
                  backgroundColor: grey[50],
                  flexBasis: "70%",
                  padding: "2rem",
                }}>
                <RelatedGenesList
                  publicationId={id}
                  limit={GENES_LIMIT}
                  genes={genes}
                />
              </Grid>
            ),
          ),
        )}
      </Grid>
    </Box>
  )
}

export { SinglePublication }
