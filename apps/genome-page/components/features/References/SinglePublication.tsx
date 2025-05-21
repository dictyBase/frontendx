import { useRouter } from "next/router"
import {
  makeStyles,
  Grid,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@material-ui/core"
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
  grid: {
    borderTop: `1px solid ${blueGrey[50]}`,
  },
  authorsGrid: {
    flexGrow: 1,
    paddingTop: "1rem",
    paddingBottom: "1rem",
    // border: `1px solid ${blueGrey[50]}`,
  },
  idGrid: {
    paddingTop: "1rem",
    paddingBottom: "1rem",
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
    paddingLeft: "1rem",
    paddingRight: "1rem",
    transition: "border-left 0.1s ease-in-out",
    "&:hover": {
      borderLeft: `5px solid ${orange[900]}`,
      cursor: "pointer",
    },
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  title: {
    fontWeight: 600,
    fontSize: "24px",
    // fontFamily: "'Playfair Display Variable', serif",
  },
  publication: {
    color: grey[700],
    marginBottom: theme.spacing(1),
  },
  identifiers: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
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
    marginBottom: theme.spacing(2),
    color: blueGrey[900],
  },
  button: {
    width: "12rem",
    borderRadius: "1rem",
  },
}))

const GENES_LIMIT = 10

type PublicationItem = {
  publication: ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]
}

const SinglePublication = ({
  publication: { title, journal, id, authors, pub_date, related_genes },
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
    <Card elevation={0} className={classes.card} onClick={onClick}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h2" gutterBottom className={classes.title}>
          {formattedTitle}
        </Typography>
        <Typography
          className={
            classes.publication
          }>{`Published in ${journal}, ${formattedDate}`}</Typography>
        <Grid container className={classes.grid}>
          <Grid item className={classes.authorsGrid}>
            <Typography gutterBottom className={classes.identifiers}>
              AUTHORS
            </Typography>
            <Typography gutterBottom className={classes.authors}>
              {formattedAuthors}
            </Typography>
          </Grid>
          <Grid item className={classes.idGrid}>
            <Typography gutterBottom className={classes.identifiers}>
              IDENTIFIER
            </Typography>
            <Typography gutterBottom className={classes.identifiers}>
              PMID: {id}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h3" gutterBottom className={classes.subheading}>
          Related Genes
        </Typography>
        {pipe(
          related_genes,
          AtakeLeft(GENES_LIMIT),
          Amap((gene) => (
            <Chip
              onClick={(event) => {
                event.stopPropagation()
                router.push(`/${gene.name}`)
              }}
              clickable
              key={gene.id}
              label={gene.name}
              size="medium"
              style={{ margin: "0px 5px 5px 0px" }}
              className={classes.chip}
              variant="outlined"
            />
          )),
        )}
        {pipe(
          related_genes.length > GENES_LIMIT,
          Bmatch(
            () => <></>,
            () => (
              <SeeAllGenesChip
                publicationId={id}
                geneCount={related_genes.length}
              />
            ),
          ),
        )}
      </CardContent>
    </Card>
  )
}

export { SinglePublication }
