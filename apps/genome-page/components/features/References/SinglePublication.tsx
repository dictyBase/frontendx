import { useRouter } from "next/router"
import { makeStyles, Box, Grid, Typography } from "@material-ui/core"
import { grey, blueGrey, pink } from "@material-ui/core/colors"
import { match } from "ts-pattern"
import { pipe } from "fp-ts/function"
import { isString, empty } from "fp-ts/string"
import { map as Amap, filter as Afilter, match as Amatch } from "fp-ts/Array"
import { parseISO, format } from "date-fns/fp"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
} from "fp-ts/Option"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { formatTitle } from "@dictybase/ui-common"
import { commaSeparateWithAnd } from "common/utils/strings"
import { RelatedGenesList } from "./RelatedGenesList"

const useStyles = makeStyles({
  gridContainer: {
    borderTop: `1px solid ${blueGrey[50]}`,
  },
  authorsGrid: {
    borderRight: `1px inset ${blueGrey[50]}`,
    flexBasis: "30%",
    padding: "2rem",
  },
  relatedGenesGrid: {
    border: `1px solid ${blueGrey[50]}`,
    backgroundColor: grey[50],
    flexBasis: "70%",
    padding: "2rem",
  },
  root: {
    borderBottom: `1px solid ${blueGrey[50]}`,
    transition: "border-left 0.1s ease-in-out",
    "&:hover": {
      borderLeft: `5px solid ${pink[700]}`,
      cursor: "pointer",
      backgroundColor: grey[50],
    },
  },
  title: {
    fontWeight: 600,
    fontSize: "24px",
  },
  publication: {
    color: grey[700],
  },
  authors: {
    fontWeight: 500,
  },
  titleContainer: {
    padding: "2rem",
    paddingBottom: "0.5rem",
  },
})

const GENES_LIMIT = 10

type PublicationItem = {
  publication: ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]
}

const SinglePublication = ({
  publication: { id, title, journal, pages, authors, pub_date, related_genes },
}: PublicationItem) => {
  const classes = useStyles()
  const router = useRouter()
  const geneId = match(router.query.id)
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
    Omap(parseISO),
    Omap(format("PPP")),
    OgetOrElse(() => ""),
  )

  const onClick = () => {
    window.location.assign(`${process.env.NEXT_PUBLIC_PUBLICATION_URL}/${id}`)
  }

  return (
    <Box className={classes.root} onClick={onClick}>
      <Box className={classes.titleContainer}>
        <Typography variant="h2" gutterBottom className={classes.title}>
          {formattedTitle}
        </Typography>
        <Typography
          className={
            classes.publication
          }>{`Published in ${journal}, ${pages}, ${formattedDate}`}</Typography>
      </Box>
      <Grid container className={classes.gridContainer}>
        <Grid item className={classes.authorsGrid}>
          <Typography gutterBottom>AUTHORS</Typography>
          <Typography gutterBottom className={classes.authors}>
            {formattedAuthors}
          </Typography>
        </Grid>
        {pipe(
          related_genes,
          Afilter(({ name }) => name !== geneId),
          Amatch(
            () => <></>,
            (genes) => (
              <Grid item className={classes.relatedGenesGrid}>
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
