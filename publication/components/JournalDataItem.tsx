import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { Maybe } from "dicty-graphql-schema"

type Props = {
  title: string
  url: string
  content?: Maybe<string>
}

/**
 * JournalDataItem displays an item of journal data (i.e. PMID: 123456)
 */

export const JournalDataItem = ({ title, url, content }: Props) => {
  if (!content) return <></>

  return (
    <Box component="span" pr={3}>
      <Typography component="span">{title}: </Typography>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    </Box>
  )
}

export default JournalDataItem
