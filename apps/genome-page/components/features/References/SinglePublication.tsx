import { useRouter } from "next/router"
import { makeStyles, Box, Grid, Chip, Typography } from "@material-ui/core"
import { grey, blueGrey, orange, teal, pink } from "@material-ui/core/colors"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { map as Amap, takeLeft as AtakeLeft } from "fp-ts/Array"
import { parseISO, format } from "date-fns/fp"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
} from "fp-ts/Option"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { formatTitle } from "@dictybase/ui-common"
import { commaSeparateWithAnd } from "common/utils/strings"
import { SeeAllGenesChip } from "./SeeAllGenesChip"

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
  card: {
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
  chip: {
    backgroundColor: teal[50],
    "&:hover": {
      boxShadow: `1px 1px 2px ${grey[500]}`,
      backgroundColor: `${teal[100]} !important`,
    },
  },
  subheading: {
    fontWeight: 600,
    fontSize: "20px",
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
    <Box className={classes.card} onClick={onClick}>
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
        <Grid item className={classes.relatedGenesGrid}>
          <Typography variant="h3" gutterBottom className={classes.subheading}>
            Mentioned Genes
          </Typography>
          <Grid container spacing={1}>
            {pipe(
              related_genes,
              AtakeLeft(GENES_LIMIT),
              Amap((gene) => (
                <Grid item key={gene.id}>
                  <Chip
                    onClick={(event) => {
                      event.stopPropagation()
                      router.push(`/${gene.name}`)
                    }}
                    clickable
                    size="medium"
                    variant="outlined"
                    label={gene.name}
                    className={classes.chip}
                  />
                </Grid>
              )),
            )}
            {pipe(
              related_genes.length > GENES_LIMIT,
              Bmatch(
                () => <></>,
                () => (
                  <Grid item>
                    <SeeAllGenesChip
                      publicationId={id}
                      geneCount={related_genes.length}
                    />
                  </Grid>
                ),
              ),
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export { SinglePublication }
