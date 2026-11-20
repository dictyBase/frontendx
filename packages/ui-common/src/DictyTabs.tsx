/* eslint-disable dot-notation */
import { Tabs } from "@mui/material"

/**
 * A customized Tabs component for dictyBase applications.
 */
const DictyTabs: typeof Tabs = ({ ...properties }) => (
  <Tabs
    variant="scrollable"
    TabIndicatorProps={{ style: { display: "none" } }}
    sx={{
      backgroundColor: "inherit",
      "& .MuiTabs-flexContainer": {
        gap: "15px",
        padding: "5px",
      },
    }}
    {...properties}>
    {properties["children"]}
  </Tabs>
)

export { DictyTabs }
