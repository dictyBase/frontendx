import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"
import {
  getAuthorsCitationString,
  getPublicationYear,
  formatTitle,
} from "../../common/utils/citation"

const useStyles = makeStyles({
  listItem: {
    listStyle: "none",
    marginBottom: "10px",
  },
  mainContent: {
    fontSize: "16.5px",
  },
  link: {
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
    },
  },
})

type LatestPaperItemProperties = {
  data: PublicationItem
}

const LatestPaperItem = ({ data }: LatestPaperItemProperties) => {
  const { mainContent, listItem, link } = useStyles()
  const { authors, journal, pubmedId, publishDate, title } = data
  const formattedAuthorString = getAuthorsCitationString(authors, { limit: 3 })
  const formattedTitle = formatTitle(title).full
  const publicationYear = getPublicationYear(publishDate)
  return (
    <li className={listItem}>
      <Box className={mainContent}>
        <Typography className={mainContent}>
          <Link
            className={link}
            reloadDocument
            to={`${import.meta.env.VITE_APP_PUBLICATION_URL}/${pubmedId}`}>
            {`${formattedAuthorString}. (${publicationYear}). `}
          </Link>
          {`${formattedTitle} `}
          <em>{journal}</em>
        </Typography>
      </Box>
    </li>
  )
}

export { LatestPaperItem }
