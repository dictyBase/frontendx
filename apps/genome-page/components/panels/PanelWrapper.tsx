/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import Link from "next/link"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: "normal",
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
      color: "#96dfff",
      marginLeft: 40,
      textDecoration: "none",
    },
  }),
)

type Properties = {
  /** Any content to display inside the panel */
  children: any
  /** Route to link the View All button to */
  route?: string
  /** Title of the panel */
  title: string
}

/**
 * This is a basic panel wrapper that uses Material-UI for the design.
 * It is used for every panel on the gene summary page.
 */

const PanelWrapper = ({ title, route, children }: Properties) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon className={classes.icon} />}>
          <Typography component="span" className={classes.heading}>
            {title}
            {route && (
              <Link href={route}>
                <a className={classes.link}>View All</a>
              </Link>
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Box className={classes.innerContent}>{children}</Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export { PanelWrapper }
