import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
}))

type Props = {
  doi: string | undefined | null
}

/**
 * LeftSidebar is the main component for the left sidebar on an individual publication page.
 */

export const LeftSidebar = ({ doi }: Props) => {
  const classes = useStyles()
  const doiURL = `https://doi.org/${doi}`

  return (
    <div className={classes.section}>
      <a
        href={doiURL}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}>
        Full text &nbsp;
        <FontAwesomeIcon icon="external-link-alt" />
      </a>
      <br />
      {/* <a href="#" className={classes.link}>
        Get Citation
      </a> */}
    </div>
  )
}

export default LeftSidebar
