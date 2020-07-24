import React from "react"
import Grid from "@material-ui/core/Grid"
import DisplayTable from "./Table/DisplayTable"
import PanelWrapper from "common/components/panels/PanelWrapper"

/**
 * Displays the inside of GO Tab panels
 */

const InnerGoPanel = ({ goaData }) => {
  // set variables that represent filtered arrays for use in each row
  const molecular = goaData.filter(
    (item: Object) => item.type === "molecular_function",
  )
  const biological = goaData.filter(
    (item: Object) => item.type === "biological_process",
  )
  const cellular = goaData.filter(
    (item: Object) => item.type === "cellular_component",
  )

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} xl={12}>
        {molecular.length > 0 && (
          <PanelWrapper title="Molecular Function">
            <DisplayTable goaData={molecular} />
          </PanelWrapper>
        )}
        {biological.length > 0 && (
          <PanelWrapper title="Biological Process">
            <DisplayTable goaData={biological} />
          </PanelWrapper>
        )}
        {cellular.length > 0 && (
          <PanelWrapper title="Cellular Composition">
            <DisplayTable goaData={cellular} />
          </PanelWrapper>
        )}
      </Grid>
    </Grid>
  )
}

export default InnerGoPanel
