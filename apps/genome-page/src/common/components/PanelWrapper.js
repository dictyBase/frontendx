// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const styles = (theme: Object) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#fff",
  },
  summary: {
    backgroundColor: "#4C5E81",
    marginTop: "0px",
  },
  icon: {
    color: "#fff",
  },
  details: {
    padding: 0,
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** The title to display for the panel */
  title: string,
  /** Children passed to component */
  children: any,
}

const PanelWrapper = (props: Props) => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon className={classes.icon} />}>
          <Typography className={classes.heading}>{props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          {props.children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default withStyles(styles)(PanelWrapper)
