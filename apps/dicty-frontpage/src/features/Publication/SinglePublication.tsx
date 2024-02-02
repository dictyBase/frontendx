import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { type PublicationItem } from "../../common/hooks/useFetchPublications"
import {
  getAuthorsString,
  getPublicationYear,
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
    fontSize: "22px",
  },
})

type SinglePublicationProperties = {
  data: PublicationItem
}

const SinglePublication = ({ data }: SinglePublicationProperties) => {
  const { mainContent, listItem, link } = useStyles()
  const authors = getAuthorsString(data.authors)
  const date = getPublicationYear(data.publishDate)
  const title = formatTitle(data.title).full
  const { journal, pubmedId } = data
  return (
    <li className={listItem}>
      <Box className={mainContent}>
        <Link
          to={`/publication/${
            import.meta.env.VITE_PUBLICATION_URL
          }/${pubmedId}`}>
          <Typography className={link} variant="body1">
            {`${authors}. (${date}). ${title}. `}
            <em>{journal}</em>
          </Typography>
        </Link>
      </Box>
    </li>
  )
}

export { SinglePublication }
