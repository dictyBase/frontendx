import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"
import {
  getAuthorsString,
  getPublicationYear,
  removeTags,
  limitCharacters,
  formatTitle,
} from "../../common/utils/citation"

const useStyles = makeStyles({
  listItem: {
    listStyle: "none",
    marginBottom: "10px",
  },
  leadText: {
    color: "#0b3861",
    paddingRight: "10px",
  },
  mainContent: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
  sourceContent: {
    color: "#0b3861",
  },
  sourceTitle: {
    paddingTop: "7px",
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
    color: "#428bca",
  },
})

type LatestPaperItemProperties = {
  data: PublicationItem
}

const LatestPaperItem = ({ data }: LatestPaperItemProperties) => {
  const { mainContent, listItem } = useStyles()
  const authors = getAuthorsString(data.authors)
  const date = getPublicationYear(data.publishDate)
  const title = formatTitle(data.title)
  const { journal, pubmedId } = data
  return (
    <li className={listItem}>
      <Box className={mainContent}>
        <Link to={`/publication/${pubmedId}`}>
          <Typography>
            {`${authors}. (${date}). ${title} `}
            <em>{journal}</em>
          </Typography>
        </Link>
      </Box>
    </li>
  )
}

export { LatestPaperItem }
