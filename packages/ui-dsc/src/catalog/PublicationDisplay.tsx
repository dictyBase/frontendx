import { makeStyles } from "@material-ui/core/styles"
import { grey } from "@material-ui/core/colors"
import Typography from "@material-ui/core/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Publication } from "dicty-graphql-schema"

const useStyles = makeStyles({
  authors: {
    color: grey[800],
    fontWeight: 600,
  },
})

// get author last names, replace last element with "&"
// example return: "Samereier, Baumann, Meyer & Gräf (2010)"
const listAuthors = (authors: Publication["authors"]) => {
  const lastNames = authors?.map((author) => author?.lastName)
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
const PublicationDisplay = ({ publication }: PublicationDisplayProperties) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="body2" data-testid="publication-display">
        <Typography
          variant="body2"
          component="span"
          className={classes.authors}>
          {listAuthors(publication.authors)} (
          {getYearFromTimestamp(publication.pubDate)})
        </Typography>
        {` '${publication.title}'`} <em>{publication.journal}</em>{" "}
        {getJournalInfo(
          publication?.volume as string,
          publication?.pages as string,
        )}
        <a
          href={getPubLink(publication.id, publication?.doi as string)}
          title="Visit publication page">
          <FontAwesomeIcon icon="external-link-alt" size="sm" />
        </a>
      </Typography>
    </>
  )
}

export {
  PublicationDisplay,
  listAuthors,
  getYearFromTimestamp,
  getPubLink,
  getJournalInfo,
}
