// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import DisplayTable from "./DisplayTable"
import PanelWrapper from "common/components/PanelWrapper"

type Props = {
  /** GO data from QuickGO API */
  goaData: Object,
}

/**
 * Displays the inside of GO Tab panels
 */

const InnerGoPanel = (props: Props) => {
  const { goaData } = props
  console.log(goaData)

  // set variables that represent filtered arrays for use in each row
  const molecular = goaData.filter(item => item.type === "molecular_function")
  const biological = goaData.filter(item => item.type === "biological_process")
  const cellular = goaData.filter(item => item.type === "cellular_component")

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} xl={12}>
        <PanelWrapper title="Molecular Function">
          <DisplayTable goaData={molecular} />
        </PanelWrapper>
        <PanelWrapper title="Biological Process">
          <DisplayTable goaData={biological} />
        </PanelWrapper>
        <PanelWrapper title="Cellular Composition">
          <DisplayTable goaData={cellular} />
        </PanelWrapper>
      </Grid>
    </Grid>
  )
}

export default InnerGoPanel
