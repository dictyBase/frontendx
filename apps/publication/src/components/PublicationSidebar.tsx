import React from "react"
import { Box, Theme, Grid } from "@mui/material"
import { blue, grey, orange } from "@mui/material/colors"
import CallMadeIcon from "@mui/icons-material/CallMade"
import EmailIcon from "@mui/icons-material/Email"

const linkStyle = {
  textDecoration: "none",
  color: blue[900],
  "&:hover": {
    color: orange[900],
  },
}

type Properties = {
  doi: string | undefined | null
  title: string
}

/**
 * LeftSidebar is the main component for the left sidebar on an individual publication page.
 */

const PublicationSidebar = ({ doi, title }: Properties) => {
  const doiURL = `https://doi.org/${doi}`
  const url = window.location.href

  return (
    <Grid
      container
      direction="column"
      sx={(theme: Theme) => ({
        height: "100%",
        backgroundColor: blue[50],
        position: "sticky",
        top: 40,
        paddingTop: 3,
        boxShadow: `${grey[500]} 1px 0px 1px`,
        rowGap: 3,
        flexDirection: "column",
        [theme.breakpoints.down("sm")]: {
          boxShadow: `${grey[500]} 0px 1px 1px`,
          alignItems: "baseline",
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: 2,
          paddingBottom: 1,
          flexDirection: "row",
          columnGap: 3,
        },
      })}>
      <Grid item>
        <Box
          component="a"
          href={doiURL}
          target="_blank"
          rel="noopener noreferrer"
          sx={linkStyle}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <CallMadeIcon />
            </Grid>
            <Grid item>Full Text</Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box
          component="a"
          href={`mailto:?subject=${title}&body=I thought you might find this article interesting: ${url}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={linkStyle}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <EmailIcon />
            </Grid>
            <Grid item>Email to</Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

export { PublicationSidebar }
