// @flow
import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import PageHeader from "common/components/PageHeader"

type Props = {
  /** Gene Summary related error message */
  generalError: string,
  /** GO tab related error message */
  goaError: string,
}

const SummaryError = (props: Props) => {
  const { generalError, goaError } = props

  return (
    <div>
      <PageHeader />
      <AppBar position="static">
        <Tabs value="summary">
          <Tab label="Gene Summary" />
        </Tabs>
      </AppBar>
      <center>
        <br />
        <h3>Sorry! There was an error loading the items.</h3>
        <p>{generalError || goaError}</p>
        <br />
        <br />
      </center>
    </div>
  )
}

export default SummaryError
