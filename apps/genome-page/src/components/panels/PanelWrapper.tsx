import React from "react"
import { Link } from "react-router-dom"
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

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

const PanelWrapper = ({ title, route, children }: Properties) => (
  <Box sx={{ width: "100%" }}>
    <Accordion defaultExpanded>
      <AccordionSummary
        sx={{ backgroundColor: "#004080", marginTop: "0px" }}
        expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}>
        <Typography
          component="span"
          sx={(theme) => ({
            fontSize: theme.typography.pxToRem(15),
            fontWeight: "normal",
            color: "#fff",
          })}>
          {title}
          {route && (
            <Box
              component={Link}
              to={route}
              sx={{
                color: "#96dfff",
                marginLeft: "40px",
                textDecoration: "none",
              }}>
              View All
            </Box>
          )}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <Box sx={{ width: "100%" }}>{children}</Box>
      </AccordionDetails>
    </Accordion>
  </Box>
)

export { PanelWrapper }
