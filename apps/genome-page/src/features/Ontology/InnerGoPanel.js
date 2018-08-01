// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import DisplayTable from "./DisplayTable"
import PanelWrapper from "common/components/PanelWrapper"

type Props = {
  goaData: Object,
}

/**
 * Displays the inside of GO Tab panels
 */

const InnerGoPanel = (props: Props) => {
  const { goaData } = props
  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} xl={12}>
        <PanelWrapper title="Molecular Function">
          <DisplayTable goaData={goaData} />
        </PanelWrapper>
        <PanelWrapper title="Biological Process">
          <DisplayTable goaData={goaData} />
        </PanelWrapper>
        <PanelWrapper title="Cellular Composition">
          <DisplayTable goaData={goaData} />
        </PanelWrapper>
      </Grid>
    </Grid>
  )
}

export default InnerGoPanel
