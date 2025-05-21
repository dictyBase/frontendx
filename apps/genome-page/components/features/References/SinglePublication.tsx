import {
  makeStyles,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { match as Bmatch } from "fp-ts/boolean"
import { map as Amap, takeLeft as AtakeLeft } from "fp-ts/Array"
import { parseISO, format } from "date-fns/fp"
import {
  fromNullable as OfromNullable,
  getOrElse as OgetOrElse,
  map as Omap,
} from "fp-ts/Option"
import { grey, blueGrey, lightBlue, orange } from "@material-ui/core/colors"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"
import { shortenAllNames, formatTitle } from "@dictybase/ui-common"
import { SeeAllGenesChip } from "./SeeAllGenesChip"

const useStyles = makeStyles((theme) => ({
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
    // borderLeft: `5px solid ${theme.palette.primary.main}`,
    // borderRight: `1px solid ${grey[400]}`,
    // borderTop: `1px solid ${grey[400]}`,
    // borderBottom: `1px solid ${grey[400]}`,
    // boxShadow: theme.shadows[4],
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
    marginBottom: theme.spacing(1),
  },
  chip: {
    color: blueGrey[800],
    border: `1px solid ${grey[200]}`,
    backgroundColor: lightBlue[50],
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

const GENES_LIMIT = 5

type PublicationItem = {
  publication: ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]
}

const SinglePublication = ({
  publication: { title, journal, id, authors, pub_date, related_genes },
}: PublicationItem) => {
  const classes = useStyles()
  // const formattedAuthors = shortenAllNames(authors)
  const formattedAuthors = pipe(
    authors,
    Amap(({ last_name }) => last_name),
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
    window.location.assign(`${import.meta.env.VITE_APP_PUBLICATION_URL}/${id}`)
  }
  return (
    <Card elevation={0} className={classes.card} onClick={onClick}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom className={classes.title}>
          {formattedTitle}
        </Typography>
        <Typography
          className={
            classes.publication
          }>{`Published in ${journal}, ${formattedDate}`}</Typography>
        <Typography className={classes.identifiers}>PMID: {id}</Typography>
        <Grid container spacing={1} className={classes.authors}>
          {pipe(
            formattedAuthors,
            Amap((author) => (
              <Grid item>
                <Chip size="small" label={author} className={classes.chip} />
              </Grid>
            )),
          )}
        </Grid>
        <Typography className={classes.subheading}>Related Genes</Typography>
        {pipe(
          related_genes,
          AtakeLeft(GENES_LIMIT),
          Amap((gene) => (
            <Chip
              clickable
              key={gene.id}
              label={gene.name}
              size="medium"
              style={{ margin: "0px 5px 5px 0px" }}
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
