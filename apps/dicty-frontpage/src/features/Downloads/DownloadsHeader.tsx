import React from "react"
import { Box, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  container: {
    textAlign: "center",
  },
  topHeader: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  bottomHeader: {
    marginBottom: "20px",
  },
})

const DownloadsHeader = () => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Typography className={classes.topHeader} variant="h1">
        dictyBase Downloads
      </Typography>
      <Typography className={classes.bottomHeader} variant="h3">
        The central collection of downloadable material from dictyBase
      </Typography>
    </Box>
  )
}

export { DownloadsHeader }
