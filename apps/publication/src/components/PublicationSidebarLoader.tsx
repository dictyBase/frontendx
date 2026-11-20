import React from "react"
import { Theme, Grid } from "@mui/material"
import { blue, grey } from "@mui/material/colors"

/**
 * LeftSidebar is the main component for the left sidebar on an individual publication page.
 */

const PublicationSidebarLoader = () => (
  <Grid
    container
    direction="column"
    sx={(theme: Theme) => ({
      height: "100%",
      backgroundColor: blue[50],
      position: "sticky",
      top: 40,
      paddingTop: 3,
      boxShadow: `${grey[500]} 1px 0px 1px`,
      rowGap: 3,
      flexDirection: "column",
      [theme.breakpoints.down("sm")]: {
        boxShadow: `${grey[500]} 0px 1px 1px`,
        alignItems: "baseline",
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 1,
        flexDirection: "row",
        columnGap: 3,
      },
    })}
  />
)

export { PublicationSidebarLoader }
