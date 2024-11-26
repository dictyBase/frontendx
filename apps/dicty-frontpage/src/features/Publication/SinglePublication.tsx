import {
  makeStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Grid,
  Typography,
} from "@material-ui/core"
import { pipe } from "fp-ts/function"
import { map as Amap } from "fp-ts/Array"
import { parseISO, format } from "date-fns/fp"
import { grey, blueGrey, lightBlue } from "@material-ui/core/colors"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"
import { shortenAllNames } from "@dictybase/ui-common"
import { formatTitle } from "../../common/utils/citation"

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
    borderLeft: `10px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[4],
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  cardActions: {
    // justifyContent: "flex-end",
  },
  title: {
    fontWeight: 600,
    fontSize: "24px",
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
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
  abstractHeading: {
    fontWeight: 600,
    fontSize: "20px",
    fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  },
  abstract: {
    fontSize: "16px",
    fontFamily:
      "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
    marginBottom: theme.spacing(2),
    color: blueGrey[900],
  },
  button: {
    width: "12rem",
    borderRadius: "1rem",
  },
}))

type SinglePublicationProperties = {
  data: PublicationItem
}

const SinglePublication = ({ data }: SinglePublicationProperties) => {
  const { abstract, journal, pubmedId, publishDate, authors } = data
  const classes = useStyles()
  const formattedAuthors = shortenAllNames(authors)
  const title = formatTitle(data.title).full
  const formattedDate = pipe(publishDate, parseISO, format("PPP"))
  const onClick = () => {
    window.location.assign(
      `${import.meta.env.VITE_APP_PUBLICATION_URL}/${pubmedId}`,
    )
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom className={classes.title}>
          {title}
        </Typography>
        <Typography
          className={
            classes.publication
          }>{`Published in ${journal}, ${formattedDate}`}</Typography>
        <Typography className={classes.identifiers}>
          PMID: {pubmedId}
        </Typography>
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
        <Typography className={classes.abstractHeading}>Abstract</Typography>
        <Typography variant="body2" className={classes.abstract}>
          {abstract}
        </Typography>
        <CardActions className={classes.cardActions} onClick={onClick}>
          <Button className={classes.button} variant="contained">
            Read More
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export { SinglePublication }
