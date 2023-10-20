import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import CallMadeIcon from "@material-ui/icons/CallMade"
import { Box } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textDecoration: "none",
    color: "#0059b3",
  },
  section: {
    position: "sticky",
    top: 40,
    paddingTop: theme.spacing(3),

    [theme.breakpoints.down("xs")]: {
      paddingTop: "0px",
    },
  },
  icon: {
    marginLeft: theme.spacing(1),
  },
}))

type Properties = {
  doi: string | undefined | null
}

/**
 * LeftSidebar is the main component for the left sidebar on an individual publication page.
 */

const PublicationSidebar = ({ doi }: Properties) => {
  const classes = useStyles()
  const doiURL = `https://doi.org/${doi}`

  return (
    <div className={classes.section}>
      <Box display="inline-block">
        <a
          href={doiURL}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}>
          <Box display="flex">
            Full text
            <CallMadeIcon
            // sx={{ marginLeft: "10px", width: "0.8em", height: "0.8em" }}
            />
          </Box>
        </a>
      </Box>
    </div>
  )
}

export { PublicationSidebar }
