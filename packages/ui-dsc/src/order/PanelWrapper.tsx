import React from "react"
import { makeStyles } from "tss-react/mui"
import Box from "@mui/material/Box"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"

const useStyles = makeStyles()((theme) => ({
  heading: {
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
  },
  summary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
  details: {
    padding: "0px",
  },
  innerContent: {
    width: "100%",
  },
}))

type PanelWrapperProperties = {
  /** The title to display for the panel */
  title: string
  /** Children passed to component */
  children: React.ReactNode
}

/**
 * PanelWrapper is a basic panel wrapper that uses Material-UI for the design.
 * It is used for all panel/accordion implementations.
 */
const PanelWrapper = ({ title, children }: PanelWrapperProperties) => {
  const { classes } = useStyles()

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary className={classes.summary}>
          <Typography
            variant="h2"
            className={classes.heading}
            data-testid="panel-title">
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          className={classes.details}
          data-testid="panel-details">
          <div className={classes.innerContent}>{children}</div>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export { PanelWrapper }
