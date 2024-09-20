import { makeStyles } from "@material-ui/core/styles"
import { grey, green } from "@material-ui/core/colors"
import { Container, Grid, Typography } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { Publication } from "dicty-graphql-schema"
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline"

const useStyles = makeStyles({
  root: {
    backgroundColor: green[50],
    borderRadius: "0.5rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  },
  authors: {
    color: grey[800],
    fontWeight: 600,
  },
})

// get author last names, replace last element with "&"
// example return: "Samereier, Baumann, Meyer & Gräf (2010)"
const listAuthors = (authors: Publication["authors"]) => {
  const lastNames = authors?.map((author) => author?.last_name)
  const finalName = lastNames?.pop()
  return lastNames?.length
    ? `${lastNames?.join(", ")} & ${finalName}`
    : finalName
}

// get the year from a timestamp in format of "2004-06-11T00:00:00.000Z"
const getYearFromTimestamp = (date: string) => {
  const newDate = new Date(date)
  return newDate.getFullYear()
}

// getPubLink returns a doi url if the pubmed id is missing
const getPubLink = (id: string, doi: string) => {
  const emptyID = id === ""

  if (!emptyID) {
    return `/publication/${id}`
  }
  // check if doi exists and already includes domain
  const domainIncluded = doi !== undefined && doi.includes("https://doi.org/")

  return domainIncluded ? doi : `https://doi.org/${doi}`
}

// getJournalInfo displays the volume and pages if that info exists
const getJournalInfo = (volume: string, pages: string) => {
  if (volume !== "" && pages !== "") {
    return `${volume}:${pages}`
  }
  return ""
}

type PublicationDisplayProperties = {
  /** Individual publications */
  publication: Publication
}

/**
 * PublicationDisplay handles the display of publications, primarily for use
 * on the stock details pages.
 */
const PhenotypeReferenceDetailsDisplay = ({
  publication,
}: PublicationDisplayProperties) => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Grid container spacing={1} alignItems="flex-start" wrap="nowrap">
        <Grid item>
          <CheckCircleOutlineIcon />
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            component="span"
            className={classes.authors}>
            {listAuthors(publication.authors)} (
            {getYearFromTimestamp(publication.pub_date)})
          </Typography>
          {` '${publication.title}'`} <em>{publication.journal}</em>{" "}
          {getJournalInfo(
            publication?.volume as string,
            publication?.pages as string,
          )}
          <a
            href={getPubLink(publication.id, publication?.doi as string)}
            title="Visit publication page">
            <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
          </a>
        </Grid>
      </Grid>
    </Container>
  )
}

export { PhenotypeReferenceDetailsDisplay }
