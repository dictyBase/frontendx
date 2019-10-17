import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    color: "#0059b3",
  },
})

interface Props {
  title: string
  url: string
  content: string
}

/**
 * JournalDataItem displays an item of journal data (i.e. PMID: 123456)
 */

export const JournalDataItem = ({ title, url, content }: Props) => {
  const classes = useStyles()

  return (
    <Grid item xs={12} sm={4}>
      {title}:{" "}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}>
        {content}
      </a>
    </Grid>
  )
}

export default JournalDataItem
