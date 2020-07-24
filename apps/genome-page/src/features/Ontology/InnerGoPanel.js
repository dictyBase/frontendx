import React from "react"
import Grid from "@material-ui/core/Grid"
import DisplayTable from "./Table/DisplayTable"
import PanelWrapper from "common/components/panels/PanelWrapper"

/**
 * Displays the inside of GO Tab panels
 */

const InnerGoPanel = ({ data }) => {
  // set variables that represent filtered arrays for use in each row
  const molecular = data.filter(
    (item: Object) => item.type === "molecular_function",
  )
  const biological = data.filter(
    (item: Object) => item.type === "biological_process",
  )
  const cellular = data.filter(
    (item: Object) => item.type === "cellular_component",
  )

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} xl={12}>
        {molecular.length > 0 && (
          <PanelWrapper title="Molecular Function">
            <DisplayTable data={molecular} />
          </PanelWrapper>
        )}
        {biological.length > 0 && (
          <PanelWrapper title="Biological Process">
            <DisplayTable data={biological} />
          </PanelWrapper>
        )}
        {cellular.length > 0 && (
          <PanelWrapper title="Cellular Composition">
            <DisplayTable data={cellular} />
          </PanelWrapper>
        )}
      </Grid>
    </Grid>
  )
}

export default InnerGoPanel
