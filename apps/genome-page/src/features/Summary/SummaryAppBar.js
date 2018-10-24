import React from "react"
import { Link } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

const SummaryAppBar = props => {
  const { general, id, generateTabs, handleChange } = props
  return (
    <AppBar position="static">
      <Tabs value={general.currentTab} onChange={handleChange}>
        <Tab
          value="summary"
          label="Gene Summary"
          component={Link}
          to={`/${id}`}
        />
        {general.data && generateTabs(general.data, id)}
      </Tabs>
    </AppBar>
  )
}

export default SummaryAppBar
