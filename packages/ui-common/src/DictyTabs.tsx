/* eslint-disable dot-notation */
import { Tabs, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  tabBar: {
    backgroundColor: "inherit",
  },
  flexContainer: {
    gap: "15px",
  },
})

/**
 * A customized Tabs component for dictyBase applications.
 */
const DictyTabs: typeof Tabs = ({ ...properties }) => {
  const { tabBar, flexContainer } = useStyles()
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
