/* eslint-disable dot-notation */
import { Tabs } from "@mui/material"

import { makeStyles } from "tss-react/mui"

const useStyles = makeStyles()({
  tabBar: {
    backgroundColor: "inherit",
  },
  flexContainer: {
    gap: "15px",
    padding: "5px",
  },
})

/**
 * A customized Tabs component for dictyBase applications.
 */
const DictyTabs: typeof Tabs = ({ ...properties }) => {
  const {
    classes: { tabBar, flexContainer },
  } = useStyles()
  return (
    <Tabs
      variant="scrollable"
      TabIndicatorProps={{ style: { display: "none" } }}
      className={tabBar}
      classes={{ flexContainer }}
      {...properties}>
      {properties["children"]}
    </Tabs>
  )
}

export { DictyTabs }
