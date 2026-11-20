import React from "react"
import { Box, Grid } from "@mui/material"

/**
 * RightDisplay represents the right side of the inner panel content.
 */

const RightDisplay = ({ children }: any) => (
  <Grid
    item
    xs={10}
    component="span"
    sx={{
      width: "80%",
      height: "100%",
      display: "table-cell",
      padding: "4px 56px 4px 24px",
      verticalAlign: "middle",
      whiteSpace: "pre-wrap",
    }}>
    <Box
      component="span"
      sx={{ height: "100%", fontSize: "0.8125rem", fontWeight: 400 }}>
      {children}
    </Box>
  </Grid>
)

export { RightDisplay }
