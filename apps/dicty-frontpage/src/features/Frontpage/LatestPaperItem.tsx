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
  const authors = getAuthorsCitationString(data.authors, { limit: 3 })
  const date = getPublicationYear(data.publishDate)
  const title = formatTitle(data.title).withEllipses
  const { journal, pubmedId } = data
  return (
    <li className={listItem}>
      <Box className={mainContent}>
        <Typography className={mainContent}>
          <Link
            className={link}
            to={`${import.meta.env.VITE_APP_PUBLICATION_URL}/${pubmedId}`}>
            {`${authors}. (${date}). `}
          </Link>
          {`${title} `}
          <em>{journal}</em>
        </Typography>
      </Box>
    </li>
  )
}

export { LatestPaperItem }
