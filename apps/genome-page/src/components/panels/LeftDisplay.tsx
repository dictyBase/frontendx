import React from "react"
import { Box, Grid, Theme } from "@mui/material"

/**
 * LeftDisplay represents the left side of the inner panel content.
 */

const LeftDisplay = ({ children }: any) => (
  <Grid
    item
    xs={2}
    component="span"
    sx={(theme: Theme) => ({
      backgroundColor: "#e6f2ff",
      fontSize: "1.1em",
      fontWeight: 400,
      display: "table-cell",
      padding: "4px 56px 4px 24px",
      verticalAlign: "middle",
      [theme.breakpoints.down("sm")]: {
        padding: "2px 8px 2px 8px",
        minWidth: 95,
      },
    })}>
    <Box component="span" sx={{ height: "100%", verticalAlign: "middle" }}>
      {children}
    </Box>
  </Grid>
)

export { LeftDisplay }
