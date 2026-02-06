import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import {
  getAuthorsCitationString,
  getPublicationYear,
  formatTitle,
} from "@dictybase/ui-common"

type PublicationItem = {
  publishDate: string
  title: string
  authors: Array<string>
  abstract: string
  link: string
  journal: string
  identifiers: Array<string>
  pubmedId: string
}

type LatestPaperItemProperties = {
  data: PublicationItem
}

const LatestPaperItem = ({ data }: LatestPaperItemProperties) => {
  const { authors, journal, pubmedId, publishDate, title } = data
  const formattedAuthorString = getAuthorsCitationString(authors, { limit: 3 })
  const formattedTitle = formatTitle(title).full
  const publicationYear = getPublicationYear(publishDate)
  return (
    <li
      style={{
        listStyle: "none",
        marginBottom: "10px",
      }}>
      <Box
        sx={{
          fontSize: "16.5px",
        }}>
        <Typography
          sx={{
            fontSize: "16.5px",
          }}>
          <Link
            reloadDocument
            to={`${import.meta.env.VITE_APP_PUBLICATION_URL}/${pubmedId}`}
            style={{
              textDecoration: "none",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = "underline"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = "none"
            }}>
            {`${formattedAuthorString}. (${publicationYear}). `}
          </Link>
          {`${formattedTitle} `}
          <em>{journal}</em>
        </Typography>
      </Box>
    </li>
  )
}

export { LatestPaperItem, type PublicationItem }
