import React from "react"
import Box from "@mui/material/Box"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"

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
const PanelWrapper = ({ title, children }: PanelWrapperProperties) => (
  <Box>
    <Accordion
      defaultExpanded
      sx={(t) => ({ background: t.palette.primary.light })}>
      <AccordionSummary
        sx={(theme) => ({
          backgroundColor: theme.palette.secondary.light,
          color: theme.palette.getContrastText(theme.palette.primary.main),
        })}>
        <Typography
          variant="h2"
          sx={{ borderTopLeftRadius: "3px", borderTopRightRadius: "3px" }}
          data-testid="panel-title">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0px" }} data-testid="panel-details">
        <Box sx={{ width: "100%" }}>{children}</Box>
      </AccordionDetails>
    </Accordion>
  </Box>
)

export { PanelWrapper }
