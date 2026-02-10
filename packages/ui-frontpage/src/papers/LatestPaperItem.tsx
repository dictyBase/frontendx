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
  publicationAppUrl: string
}

const LatestPaperItem = ({
  data,
  publicationAppUrl,
}: LatestPaperItemProperties) => {
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
      <Box>
        <Typography
          sx={{
            fontSize: "16.5px",
          }}>
          <Link reloadDocument to={`${publicationAppUrl}/${pubmedId}`}>
            <Typography
              component="span"
              sx={{
                fontWeight: 500,
                "&:hover": { textDecoration: "underline" },
              }}>{`${formattedAuthorString}. (${publicationYear}). `}</Typography>
          </Link>
          {`${formattedTitle} `}
          <em>{journal}</em>
        </Typography>
      </Box>
    </li>
  )
}

export { LatestPaperItem, type PublicationItem }
