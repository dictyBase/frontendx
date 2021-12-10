import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import CallMadeIcon from "@mui/icons-material/CallMade"
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

type Props = {
  doi: string | undefined | null
}

/**
 * LeftSidebar is the main component for the left sidebar on an individual publication page.
 */

export const PublicationSidebar = ({ doi }: Props) => {
  const classes = useStyles()
  const doiURL = `https://doi.org/${doi}`

  return (
    <div className={classes.section}>
      <a
        href={doiURL}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}>
        <Box display="flex">
          Full text
          <CallMadeIcon
            sx={{ marginLeft: "10px", width: "0.8em", height: "0.8em" }}
          />
        </Box>
      </a>
      {/* <a href="#" className={classes.link}>
        Get Citation
      </a> */}
    </div>
  )
}

export default PublicationSidebar
