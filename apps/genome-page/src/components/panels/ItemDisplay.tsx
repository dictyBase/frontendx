import React from "react"
import Grid from "@mui/material/Grid"

/**
 * Wrapper component for each item inside panel. This is used with the
 * LeftDisplay and RightDisplay as children.
 */

const ItemDisplay = ({ children }: any) => (
  <Grid
    container
    sx={{
      borderBottom: "1px dotted #A3BAE9",
      display: "table",
      height: "48px",
    }}>
    {children}
  </Grid>
)

export { ItemDisplay }
