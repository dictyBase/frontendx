import React from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Accordion from "@material-ui/core/Accordion"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import AccordionDetails from "@material-ui/core/AccordionActions"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#fff",
  },
  summary: {
    backgroundColor: "#004080",
    marginTop: "0px",
  },
  icon: {
    color: "#fff",
  },
  details: {
    padding: 0,
  },
  innerContent: {
    width: "100%",
  },
  link: {
    color: "#e1f5fe",
    marginLeft: 40,
    textDecoration: "none",
  },
}))

/**
 * This is a basic panel wrapper that uses Material-UI for the design.
 * It is used for every panel on the gene summary page.
 */

const PanelWrapper = ({ title, route, children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon className={classes.icon} />}>
          <Typography className={classes.heading}>
            {title}
            {route && (
              <Link className={classes.link} to={route}>
                View All
              </Link>
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.innerContent}>{children}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default PanelWrapper
