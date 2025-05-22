import { useRouter } from "next/router"
import { makeStyles, Box, Grid, Chip, Typography } from "@material-ui/core"
import { grey, blueGrey, orange, teal } from "@material-ui/core/colors"
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

const useStyles = makeStyles((theme) => ({
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
  leadText: {
    color: "#0b3861",
    paddingRight: "10px",
  },
  sourceContent: {
    color: "#0b3861",
  },
  sourceTitle: {
    fontWeight: 800,
    textAlign: "center",
  },
  link: {
    fontSize: "22px",
  },
  card: {
    borderBottom: `1px solid ${blueGrey[100]}`,
    transition: "border-left 0.1s ease-in-out",
    "&:hover": {
      borderLeft: `5px solid ${orange[900]}`,
      cursor: "pointer",
    },
  },
  title: {
    fontWeight: 600,
    fontSize: "24px",
    // fontFamily: "'Playfair Display Variable', serif",
  },
  publication: {
    color: grey[700],
    // marginBottom: theme.spacing(1),
  },
  authors: {
    fontWeight: 500,
  },
  chip: {
    backgroundColor: teal[50],
  },
  subheading: {
    fontWeight: 600,
    fontSize: "20px",
    // fontFamily: "'Playfair Display Variable', serif",
  },
  abstract: {
    fontSize: "16px",
    // fontFamily: "'Inter Tight Variable', sans-serif",
    // marginBottom: theme.spacing(2),
    color: blueGrey[900],
  },
  button: {
    width: "12rem",
    borderRadius: "1rem",
  },
  titleContainer: {
    padding: "2rem",
    paddingBottom: "0.5rem",
  },
}))

const GENES_LIMIT = 10

type SinglePublicationBottomProperties = {
  id: ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]["id"]
  authors: ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]["authors"]
  relatedGenes: ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]["related_genes"]
}

const SinglePublicationBottom = ({
  id,
  authors,
  relatedGenes,
}: SinglePublicationBottomProperties) => {
  const classes = useStyles()
  const router = useRouter()
  const formattedAuthors = pipe(
    authors,
    Amap(({ last_name }) => last_name),
    commaSeparateWithAnd,
  )
  return (
    <Grid container direction="row" className={classes.gridContainer}>
      <Grid item className={classes.authorsGrid}>
        <Box>
          <Typography gutterBottom>AUTHORS</Typography>
          <Typography gutterBottom className={classes.authors}>
            {formattedAuthors}
          </Typography>
        </Box>
      </Grid>
      <Grid item className={classes.relatedGenesGrid}>
        <Typography variant="h3" gutterBottom className={classes.subheading}>
          Mentioned Genes
        </Typography>
        <Grid container spacing={1}>
          {pipe(
            relatedGenes,
            AtakeLeft(GENES_LIMIT),
            Amap((gene) => (
              <Grid item key={gene.id}>
                <Chip
                  onClick={(event) => {
                    event.stopPropagation()
                    router.push(`/${gene.name}`)
                  }}
                  clickable
                  label={gene.name}
                  size="medium"
                  className={classes.chip}
                  variant="outlined"
                />
              </Grid>
            )),
          )}
          {pipe(
            relatedGenes.length > GENES_LIMIT,
            Bmatch(
              () => <></>,
              () => (
                <Grid item>
                  <SeeAllGenesChip
                    publicationId={id}
                    geneCount={relatedGenes.length}
                  />
                </Grid>
              ),
            ),
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export { SinglePublicationBottom }
